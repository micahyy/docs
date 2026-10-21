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
// 用 SPA 安全策略（已有则不重复挂）。首页（route.path==='/'）也允许打 —
// 用户可能把首页当产品目录封面。
function injectPrintButton() {
  if (document.querySelector('.doc-print-btn')) return
  const btn = document.createElement('button')
  btn.className = 'doc-print-btn'
  btn.type = 'button'
  btn.title = '打印此页 / 另存为 PDF（A4）'
  btn.setAttribute('aria-label', 'print')
  btn.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<polyline points="6 9 6 2 18 2 18 9"></polyline>' +
    '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>' +
    '<rect x="6" y="14" width="12" height="8"></rect>' +
    '</svg><span>打印 / PDF</span>'
  btn.addEventListener('click', () => window.print())
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
