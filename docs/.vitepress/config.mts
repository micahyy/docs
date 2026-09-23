import { defineConfig } from 'vitepress'

// VitePress config — UI aligned with https://docs.qmk.fm/ (VitePress default theme)
// Site (zh-CN): https://docs.micah.vip
// Site (en):   https://micahyy.github.io/docs
// Repo: https://github.com/micahyy/docs
//
// Bilingual structure (since 2026-09-15 — subdirectory-parallel):
//   - /zh/  — Chinese content under docs/zh/<path>.md
//   - /en/  — English content under docs/en/<path>.md
//   - /     — minimal landing page (docs/index.md) that redirects to /zh/

const sharedHead = [
  ['link', { rel: 'icon', type: 'image/png', href: '/images/logo.png' }],
  ['meta', { name: 'theme-color', content: '#7c6fef' }],
  ['meta', { name: 'author', content: 'Micah' }]
]

const sharedLogo = {
  light: '/images/logo.png',
  dark:  '/images/logo.png'
}

export default defineConfig({
  lang: 'zh-CN',
  title: '菜籽猫文档',
  description: '菜籽猫的键盘说明书汇总 - 固件、驱动、PCB、多模使用指南',
  base: '/',
  cleanUrls: false,

  head: [
    ...sharedHead,
    ['meta', { property: 'og:title', content: '菜籽猫文档' }],
    ['meta', { property: 'og:description', content: '菜籽猫的键盘说明书汇总' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://docs.micah.vip' }],
    ['meta', { property: 'og:image', content: 'https://docs.micah.vip/images/logo.png' }]
  ],

  themeConfig: {
    // Common theme settings shared across locales.
    // nav/sidebar live under each locale so paths can carry the right prefix.
    logo: sharedLogo,
    siteTitle: '菜籽猫',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/micahyy/docs' }
    ],

    search: {
      provider: 'local',
      options: {
        placeholder: '搜索文档...',
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索文档' },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '清空',
            backButtonTitle: '关闭',
            noResultsText: '无匹配结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: 'Enter',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '上',
              navigateDownKeyAriaLabel: '下',
              closeText: '关闭',
              closeKeyAriaLabel: 'Esc'
            }
          }
        },
        detailedView: true
      }
    },

    docFooter: { prev: '上一篇', next: '下一篇' },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright \u00A9 2024-present 菜籽猫 / Micah'
    },

    outline: { label: '本页目录', level: [2, 4] },

    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    langMenuLabel: '语言',
    aside: 'deep'
  },

  // Legacy URL rewrites (post-2026-09-15 A-migration):
  //   Old Chinese URLs at root (e.g. /2_wired/DS17) → new /zh/...
  //   VitePress serves these so old bookmarks keep working.
  rewrites: {
    '2_wired/DS17':               '/zh/2_wired/DS17',
    '2_wired/ds21':               '/zh/2_wired/ds21',
    '2_wired/DS22':               '/zh/2_wired/DS22',
    '2_wired/gamer':              '/zh/2_wired/gamer',
    '2_wired/gh60_8K':            '/zh/2_wired/gh60_8K',
    '1_PCB/g80_3000':             '/zh/1_PCB/g80_3000',
    '1_PCB/Ow_vento_8K':          '/zh/1_PCB/Ow_vento_8K',
    '3_DZ/DZ17':                  '/zh/3_DZ/DZ17',
    '3_DZ/DZ87':                  '/zh/3_DZ/DZ87',
    '4_Tri-mode/4.1_dm17':        '/zh/4_Tri-mode/4.1_dm17',
    '4_Tri-mode/4.2_dc22':        '/zh/4_Tri-mode/4.2_dc22',
    '5_Swagkeys/Eave':            '/zh/5_Swagkeys/Eave',
    '5_Swagkeys/TransitionLite87':'/zh/5_Swagkeys/TransitionLite87',
    '6_guide/6.1_VIA':            '/zh/6_guide/6.1_VIA',
    '6_guide/6.2_QA':             '/zh/6_guide/6.2_QA',
    '6_guide/qmk_keycode':        '/zh/6_guide/qmk_keycode',
    '7_EC/EC87':                  '/zh/7_EC/EC87'
  },

  locales: {
    // Root (/) is intentionally NOT declared as a `root` locale: docs/index.md
    // is only a 0-second meta-refresh redirect to /zh/. Declaring it with the
    // label "简体中文" made the language menu show TWO Chinese entries
    // ("简体中文" -> / and "简体中文" -> /zh/), and picking the root one from an
    // /en/ page produced prefix-less URLs that mostly 404. Omitting it leaves
    // the menu with exactly two items: 简体中文 (/zh/) and English (/en/).

    // Chinese content — served at /zh/<path>
    zh: {
      lang: 'zh-CN',
      label: '简体中文',
      title: '菜籽猫文档',
      description: '菜籽猫的键盘说明书汇总 - 固件、驱动、PCB、多模使用指南',

      head: [
        ...sharedHead,
        ['meta', { property: 'og:title', content: '菜籽猫文档' }],
        ['meta', { property: 'og:description', content: '菜籽猫的键盘说明书汇总' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:url', content: 'https://docs.micah.vip' }],
        ['meta', { property: 'og:image', content: 'https://docs.micah.vip/images/logo.png' }]
      ],

      themeConfig: {
        logo: sharedLogo,
        siteTitle: '菜籽猫',

        nav: [
          { text: '首页',     link: '/zh/' },
          { text: 'PCB',      link: '/zh/1_PCB/g80_3000' },
          { text: '有线',     link: '/zh/2_wired/DS17' },
          { text: '多模',     link: '/zh/4_Tri-mode/4.1_dm17' },
          { text: 'DZ系列',   link: '/zh/3_DZ/DZ17' },
          { text: 'EC系列',   link: '/zh/7_EC/EC87' },
          { text: 'Swagkeys', link: '/zh/5_Swagkeys/Eave' },
          { text: '使用指南', link: '/zh/6_guide/6.1_VIA' },
          { text: '下载',     link: '/zh/8_download/' },
          { text: 'ZMK',     link: 'https://key.micah.vip', target: '_blank', rel: 'noopener' }
        ],

        editLink: {
          pattern: 'https://github.com/micahyy/docs/edit/main/docs/zh/:path',
          text: '在 GitHub 上编辑此页'
        },

        sidebar: [
          {
            text: 'PCB 设计',
            collapsed: false,
            items: [
              { text: 'G80-3000',    link: '/zh/1_PCB/g80_3000' },
              { text: 'Ow_vento 8K', link: '/zh/1_PCB/Ow_vento_8K' }
            ]
          },
          {
            text: '有线键盘',
            collapsed: false,
            items: [
              { text: 'DS17',     link: '/zh/2_wired/DS17' },
              { text: 'DS21',     link: '/zh/2_wired/ds21' },
              { text: 'DS22',     link: '/zh/2_wired/DS22' },
              { text: 'Gamer',    link: '/zh/2_wired/gamer' },
              { text: 'GH60 8K',  link: '/zh/2_wired/gh60_8K' }
            ]
          },
          {
            text: 'EC 系列（静电容）',
            collapsed: false,
            items: [
              { text: 'EC87 静电容', link: '/zh/7_EC/EC87' }
            ]
          },
          {
            text: 'DZ 系列',
            collapsed: false,
            items: [
              { text: 'DZ17', link: '/zh/3_DZ/DZ17' },
              { text: 'DZ87', link: '/zh/3_DZ/DZ87' }
            ]
          },
          {
            text: '多模键盘',
            collapsed: false,
            items: [
              { text: 'DM17',            link: '/zh/4_Tri-mode/4.1_dm17' },
              { text: 'DC22（开发中）',   link: '/zh/4_Tri-mode/4.2_dc22' }
            ]
          },
          {
            text: 'Swagkeys',
            collapsed: false,
            items: [
              { text: 'EAVE',                link: '/zh/5_Swagkeys/Eave' },
              { text: 'Transition Lite 87',  link: '/zh/5_Swagkeys/TransitionLite87' }
            ]
          },
          {
            text: '使用指南',
            collapsed: false,
            items: [
              { text: 'VIA 的使用',   link: '/zh/6_guide/6.1_VIA' },
              { text: '常见问题 QA',  link: '/zh/6_guide/6.2_QA' },
              { text: 'QMK 键码速查', link: '/zh/6_guide/qmk_keycode' }
            ]
          },
          {
            text: '资料下载',
            collapsed: false,
            items: [
              { text: '全部文件', link: '/zh/8_download/' }
            ]
          }
        ]
      }
    },

    // English content — served at /en/<path>
    en: {
      lang: 'en-US',
      label: 'English',
      title: 'CZMao Documentation',
      description: 'CZMao keyboard manuals — firmware, drivers, PCB, multi-mode usage guides',

      head: [
        ...sharedHead,
        ['meta', { property: 'og:title', content: 'CZMao Documentation' }],
        ['meta', { property: 'og:description', content: 'CZMao keyboard manuals' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:url', content: 'https://micahyy.github.io/docs/' }],
        ['meta', { property: 'og:image', content: 'https://micahyy.github.io/docs/images/logo.png' }]
      ],

      themeConfig: {
        logo: sharedLogo,
        siteTitle: 'CZMao',

        nav: [
          { text: 'Home',    link: '/en/' },
          { text: 'Wired',   link: '/en/2_wired/DS17' },
          { text: 'EC',      link: '/en/7_EC/EC87' },
          { text: 'DZ',   link: '/en/3_DZ/DZ17' },
          { text: 'ZMK',  link: 'https://key.micah.vip', target: '_blank', rel: 'noopener' }
        ],

        editLink: {
          pattern: 'https://github.com/micahyy/docs/edit/main/docs/en/:path',
          text: 'Edit this page on GitHub'
        },

        docFooter: { prev: 'Previous', next: 'Next' },

        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright \u00A9 2024-present CZMao / Micah'
        },

        // EN sidebar only lists products that have an English manual on disk.
        // Anything not yet translated is omitted (would 404); it'll be re-added
        // when its en/X/Y.md mirror lands. The Chinese site (docs.micah.vip) has
        // the full catalog at /zh/ in the meantime.
        sidebar: [
          {
            text: 'Wired keyboards',
            collapsed: false,
            items: [
              { text: 'DS17', link: '/en/2_wired/DS17' }
            ]
          },
          {
            text: 'Keyboards',
            collapsed: false,
            items: [
              { text: 'EC87 (Electrostatic Capacitive)', link: '/en/7_EC/EC87' }
            ]
          },
          {
            text: 'DZ Series (Wireless)',
            collapsed: false,
            items: [
              { text: 'DZ17', link: '/en/3_DZ/DZ17' }
            ]
          }
        ],

        outline: { label: 'On this page', level: [2, 4] },

        darkModeSwitchLabel: 'Theme',
        lightModeSwitchTitle: 'Switch to light mode',
        darkModeSwitchTitle: 'Switch to dark mode',

        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Back to top',
        langMenuLabel: 'Language',
        aside: 'deep'
      }
    }
  },

  vite: { server: { port: 5173, host: true } },

  markdown: {
    lineNumbers: true,
    anchor: {}
  }
})