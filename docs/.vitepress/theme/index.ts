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
  }
}
