import DefaultTheme from 'vitepress/theme'
import Comments from './Comments.vue'
import { h } from 'vue'
import './download.css'
import './full-width.css'
import './lang-switch.css'
import './micah-nav.css'
import './lightbox.css'

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
      openLightbox(t.currentSrc || t.src, t.alt)
    })
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox()
    })
  }
}
