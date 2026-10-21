import { defineConfig } from 'vitepress'
import base from './config.mts'

// Print-only build — deployed to https://tools.micah.vip/docs
// Reuses the exact same markdown content, but strips the website chrome
// (nav / sidebar / right TOC) so the page is a clean, print-ready manual.
// The QC certificate + warranty card is injected by the shared theme
// (docs/.vitepress/theme/index.ts) on product-manual pages.
export default defineConfig({
  ...base,
  base: '/docs/',
  themeConfig: {
    ...base.themeConfig,
    aside: false,
  },
  locales: {
    zh: {
      ...base.locales.zh,
      themeConfig: {
        ...base.locales.zh.themeConfig,
        nav: [],
        sidebar: false,
      },
    },
    en: {
      ...base.locales.en,
      themeConfig: {
        ...base.locales.en.themeConfig,
        nav: [],
        sidebar: false,
      },
    },
  },
})
