import DefaultTheme from 'vitepress/theme'
import Comments from './Comments.vue'
import { h } from 'vue'
import './download.css'
import './full-width.css'
import './lang-switch.css'
import './micah-nav.css'
import './lightbox.css'
import './print.css'

let lightboxEl = null

function closeLightbox() {
  if (lightboxEl) lightboxEl.classList.remove('open')
  document.body.style.overflow = ''
}

function openLightbox(src, alt) {
  if (!lightboxEl) {
    lightboxEl = document.createElement('div')
    lightboxEl.className = 'vp-lightbox'
    lightboxEl.innerHTML = '<img alt="">'
    lightboxEl.addEventListener('click', (e) => {
      if (e.target === lightboxEl) closeLightbox()
    })
    document.body.appendChild(lightboxEl)
  }
  const img = lightboxEl.querySelector('img')
  img.src = src
  img.alt = alt || ''
  lightboxEl.classList.add('open')
  document.body.style.overflow = 'hidden'
}

// 「打印此页 / 另存为 PDF」按钮：屏幕模式右下角悬浮，点击调 window.print()。
// 样式走 ./print.css 里的 .doc-print-btn；@media print 已自带 display:none。
// v1.1: 改为 A4 横向双 A5 拼版；按钮文案对应提示纸张与双面。
function injectPrintButton() {
  if (document.querySelector('.doc-print-btn')) return
  const btn = document.createElement('button')
  btn.className = 'doc-print-btn'
  btn.type = 'button'
  btn.title = '打印此页 — 纸张 A4 横放 + 双面（每张正反各两页 A5 拼版）'
  btn.setAttribute('aria-label', 'print')
  btn.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<polyline points="6 9 6 2 18 2 18 9"></polyline>' +
    '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>' +
    '<rect x="6" y="14" width="12" height="8"></rect>' +
    '</svg><span>打印 / PDF</span>'
  btn.addEventListener('click', () => {
    // 状态条提示用户怎么打（idempotent，多次点击也只挂一条）
    if (!document.getElementById('doc-print-hint')) {
      const tip = document.createElement('div')
      tip.id = 'doc-print-hint'
      tip.className = 'doc-print-hint'
      tip.innerHTML =
        '<strong>打印设置提示</strong>' +
        '<button type="button" aria-label="close">×</button>' +
        '<ol>' +
        '<li>纸张：<b>A4</b></li>' +
        '<li>方向：<b>横向</b>（每页两个 A5 并排）</li>' +
        '<li>边距：<b>无 / 默认</b></li>' +
        '<li>双面：<b>短边翻</b>（打小册子）</li>' +
        '</ol>'
      document.body.appendChild(tip)
      tip.querySelector('button')!.addEventListener('click', () => tip.remove())
      // 12 秒后自动消失
      setTimeout(() => tip.remove(), 12000)
    }
    window.print()
  })
  document.body.appendChild(btn)
}

// —— micah 全站顶导的打印摘除 ——
// nav.js 用「内联 !important」注入顶导（style="display:block!important;..."）。
// CSS 级联规则：内联 !important > 样式表 !important，所以 print.css 里的
// display:none!important 压不住它。唯一可靠的办法：打印前把节点从 DOM 里
// remove()，打印后（afterprint）原样插回去。Ctrl+P / 菜单打印同样走
// beforeprint，所以不管从哪儿触发打印都生效。
let micahNavDetached: Array<{ el: Element; parent: Node; next: Node | null }> = []
let micahNavHadBodyClass = false
let micahNavSavedBodyPadding = ''

function detachMicahNavForPrint() {
  micahNavDetached = []
  micahNavHadBodyClass = document.body.classList.contains('micah-has-nav')
  // nav.js 给 body 打的 padding-top:64px（给顶导腾位置）也一并摘掉
  micahNavSavedBodyPadding = document.body.style.getPropertyValue('padding-top')
  document.querySelectorAll('#micah-nav-inner').forEach((nav) => {
    // 优先摘外层 fixed 容器（无 id 的 div），否则摘内层 nav 自己
    const outer = nav.parentElement
    const target = outer && outer !== document.body ? outer : nav
    if (target.parentNode) {
      micahNavDetached.push({ el: target, parent: target.parentNode, next: target.nextSibling })
      target.remove()
    }
  })
  document.body.classList.remove('micah-has-nav')
  document.body.style.removeProperty('padding-top')
}

function reattachMicahNavAfterPrint() {
  micahNavDetached.reverse().forEach(({ el, parent, next }) => {
    if (parent && el && !el.parentNode) parent.insertBefore(el, next)
  })
  micahNavDetached = []
  if (micahNavHadBodyClass) document.body.classList.add('micah-has-nav')
  if (micahNavSavedBodyPadding) document.body.style.setProperty('padding-top', micahNavSavedBodyPadding)
}

// —— 手动双栏拼版（A4 横放 = 左右两个 A5）——
// CSS multicol（column-count:2）会被 .vp-doc 里的顶层块级 div 破坏：
// custom-block（QQ 框）、视频 wrapper、图片 grid 这些 div 一旦出现，
// Chrome 就不拆分 flex/多层块，整栏退化成单栏（实测 bisect 定位）。
// 所以打印前用 JS 把 .vp-doc 的顶层子元素逐个测量，装进左右两个
// A5 栏（.print-sheet），打印后拆除。beforeprint 是同步事件，
// 全程同步 DOM 操作。
const PRINT_COL_H = 194      // mm：A4 高 210 − 上下页边 8×2
const MM = 96 / 25.4         // CSS px per mm

let printPagedEl: HTMLElement | null = null

function buildPrintPaged() {
  if (printPagedEl) return
  const doc = document.querySelector('.vp-doc') as HTMLElement | null
  if (!doc || !doc.children.length) return

  const wrap = document.createElement('div')
  wrap.className = 'print-paged'

  // 隐形容器：与打印栏同宽、同排版，用来测每个元素的实际高度
  const measure = document.createElement('div')
  measure.className = 'print-measure'
  document.body.appendChild(measure)

  try {
    const newCol = () => {
      const c = document.createElement('div')
      c.className = 'print-col'
      return c
    }
    let sheet = document.createElement('div')
    sheet.className = 'print-sheet'
    sheet.appendChild(newCol())
    wrap.appendChild(sheet)
    let col = sheet.firstElementChild as HTMLElement
    let used = 0

    const nextColOrPage = () => {
      const right = col.nextElementSibling
      if (right) {
        col = right as HTMLElement
      } else {
        sheet = document.createElement('div')
        sheet.className = 'print-sheet'
        sheet.appendChild(newCol())
        wrap.appendChild(sheet)
        col = sheet.firstElementChild as HTMLElement
      }
      used = 0
    }

    // .vp-doc 的直接子元素里如果只有一个无 class/style/id 的裸 div
    // （某些 VitePress 版本会给 markdown 输出包这么一层），整个页面内容
    // 都藏在里面 —— 不摊平的话它是一个几千 px 的超高块，multicol 和
    // 手动分栏都会失效。摊平无样式的纯容器等价于原渲染。
    const items: HTMLElement[] = []
    const pushItem = (el: Element) => {
      if (el instanceof HTMLElement) items.push(el)
    }
    for (const el of Array.from(doc.children)) {
      if (el.tagName === 'DIV' && !el.className && !el.id && !el.getAttribute('style')) {
        Array.from(el.children).forEach(pushItem)
      } else {
        pushItem(el)
      }
    }

    for (const el of items) {
      if (!(el instanceof HTMLElement)) continue
      // 评论 / 广告直接跳过
      if (el.matches('.comments-wrap, ins.adsbygoogle, .adsbygoogle, .vp-lightbox')) continue

      const clone = el.cloneNode(true) as HTMLElement
      measure.appendChild(clone)
      const h = measure.scrollHeight / MM
      measure.removeChild(clone)

      // 标题不落在栏尾（后面至少跟 30mm 内容）
      const reserve = /^H[1-3]$/.test(el.tagName) ? 30 : 0
      if (used > 0 && used + h + reserve > PRINT_COL_H) {
        nextColOrPage()
      }

      // 超高块：表格按行分片；其余原样放（罕见，接受溢出风险）
      if (h > PRINT_COL_H && clone.tagName === 'TABLE') {
        for (const part of splitTallTable(clone as HTMLTableElement, measure)) {
          measure.appendChild(part)
          const ph = measure.scrollHeight / MM
          measure.removeChild(part)
          if (used > 0 && used + ph > PRINT_COL_H) nextColOrPage()
          col.appendChild(part)
          used += ph
        }
      } else {
        col.appendChild(clone)
        used += h
      }
    }
  } finally {
    measure.remove()
  }

  doc.parentNode!.insertBefore(wrap, doc)
  document.body.classList.add('print-paged-on')
  printPagedEl = wrap
}

// 超高表格 → 按 thead + 行高分组拆成多个小表
function splitTallTable(t: HTMLTableElement, measure: HTMLElement): HTMLElement[] {
  const thead = t.querySelector('thead')
  const tbody = t.querySelector('tbody')
  const rows = Array.from((tbody || t).children).filter((n) => n.tagName === 'TR') as HTMLElement[]
  if (!rows.length) return [t]

  // 行高探测：单行必须包在 table 里测（裸 tr 不是 renderable）
  const probe = t.cloneNode(false) as HTMLTableElement
  if (thead) probe.appendChild(thead.cloneNode(true))
  const probeBody = document.createElement('tbody')
  probe.appendChild(probeBody)
  measure.appendChild(probe)

  const out: HTMLElement[] = []
  let cur: HTMLElement[] = []
  let acc = thead ? probe.scrollHeight / MM : 0

  const flush = () => {
    if (!cur.length) return
    const nt = t.cloneNode(false) as HTMLTableElement
    if (thead) nt.appendChild(thead.cloneNode(true))
    if (tbody) {
      const nb = tbody.cloneNode(false)
      cur.forEach((r) => nb.appendChild(r.cloneNode(true)))
      nt.appendChild(nb)
    } else {
      cur.forEach((r) => nt.appendChild(r.cloneNode(true)))
    }
    out.push(nt)
    cur = []
    acc = thead ? probe.scrollHeight / MM : 0
  }

  for (const r of rows) {
    probeBody.innerHTML = ''
    probeBody.appendChild(r.cloneNode(true))
    const rh = probe.scrollHeight / MM
    if (acc + rh > PRINT_COL_H && cur.length) flush()
    cur.push(r)
    acc += rh
  }
  probeBody.innerHTML = ''
  measure.removeChild(probe)
  flush()
  return out.length ? out : [t]
}

function teardownPrintPaged() {
  printPagedEl?.remove()
  printPagedEl = null
  document.body.classList.remove('print-paged-on')
}

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // Renders at the bottom of every doc page (home page excluded
      // inside the component itself).
      'doc-after': () => h(Comments)
    })
  },
  setup() {
    if (typeof document === 'undefined') return
    document.addEventListener('click', (e) => {
      const t = e.target
      if (!t || t.tagName !== 'IMG') return
      if (t.closest('.VPNavBar') || t.closest('.vp-lightbox')) return
      const a = t.closest('a')
      if (a) e.preventDefault()
      openLightbox(t.currentSrc || t.src, t.alt)
    })
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox()
    })
    injectPrintButton()
    window.addEventListener('beforeprint', () => {
      detachMicahNavForPrint()
      buildPrintPaged()
    })
    window.addEventListener('afterprint', () => {
      teardownPrintPaged()
      reattachMicahNavAfterPrint()
    })
  }
}
