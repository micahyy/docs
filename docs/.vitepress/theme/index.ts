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
    window.addEventListener('beforeprint', detachMicahNavForPrint)
    window.addEventListener('afterprint', reattachMicahNavAfterPrint)
  }
}
