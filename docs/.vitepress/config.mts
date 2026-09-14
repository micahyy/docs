import { defineConfig } from 'vitepress'

// VitePress config — UI aligned with https://docs.qmk.fm/ (VitePress default theme)
// Site (zh-CN): https://docs.micah.vip
// Site (en):   https://micahyy.github.io/docs
// Repo: https://github.com/micahyy/docs
//
// Bilingual structure:
//   - zh-CN (default, root path) — Chinese content for docs.micah.vip
//   - en (under /en/)            — English content for GitHub Pages
//   - File layout: docs/<path>.md = zh-CN, docs/en/<path>.md = en

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
    logo: sharedLogo,
    siteTitle: '菜籽猫',

    nav: [
      { text: '首页',    link: '/' },
      { text: 'PCB',     link: '/1_PCB/g80_3000' },
      { text: '有线',    link: '/2_wired/DS17' },
      { text: '多模',    link: '/4_Tri-mode/4.1_dm17' },
      { text: 'DZ系列',  link: '/3_DZ/DZ17' },
      { text: 'EC系列',  link: '/7_EC/EC87' },
      { text: 'Swagkeys',link: '/5_Swagkeys/Eave' },
      { text: '使用指南',link: '/6_guide/6.1_VIA' }
    ],

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

    editLink: {
      pattern: 'https://github.com/micahyy/docs/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    docFooter: { prev: '上一篇', next: '下一篇' },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright \u00A9 2024-present 菜籽猫 / Micah'
    },

    sidebar: [
      {
        text: 'PCB 设计',
        collapsed: false,
        items: [
          { text: 'G80-3000',    link: '/1_PCB/g80_3000' },
          { text: 'Ow_vento 8K', link: '/1_PCB/Ow_vento_8K' }
        ]
      },
      {
        text: '有线键盘',
        collapsed: false,
        items: [
          { text: 'DS17',     link: '/2_wired/DS17' },
          { text: 'DS21',     link: '/2_wired/ds21' },
          { text: 'DS22',     link: '/2_wired/DS22' },
          { text: 'Gamer', link: '/2_wired/gamer' },
          { text: 'GH60 8K',  link: '/2_wired/gh60_8K' }
        ]
      },
      {
        text: 'EC 系列（静电容）',
        collapsed: false,
        items: [
          { text: 'EC87 静电容', link: '/7_EC/EC87' }
        ]
      },
      {
        text: 'DZ 系列',
        collapsed: false,
        items: [
          { text: 'DZ17', link: '/3_DZ/DZ17' },
          { text: 'DZ87', link: '/3_DZ/DZ87' }
        ]
      },
      {
        text: '多模键盘',
        collapsed: false,
        items: [
          { text: 'DM17', link: '/4_Tri-mode/4.1_dm17' },
          { text: 'DC22（开发中）', link: '/4_Tri-mode/4.2_dc22' }
        ]
      },
      {
        text: 'Swagkeys',
        collapsed: false,
        items: [
          { text: 'EAVE',         link: '/5_Swagkeys/Eave' },
          { text: 'Transition Lite 87',link: '/5_Swagkeys/TransitionLite87' }
        ]
      },
      {
        text: '使用指南',
        collapsed: false,
        items: [
          { text: 'VIA 的使用',   link: '/6_guide/6.1_VIA' },
          { text: '常见问题 QA',  link: '/6_guide/6.2_QA' },
          { text: 'QMK 键码速查', link: '/6_guide/qmk_keycode' }
        ]
      }
    ],

    outline: { label: '本页目录', level: [2, 4] },

    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    langMenuLabel: '语言',
    aside: 'deep'
  },

  // Locales: zh-CN is the default (root), English lives under /en/.
  // VitePress routes files at docs/en/<path>.md → URL /en/<path>.
  locales: {
    root: {
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
          { text: '首页',    link: '/' },
          { text: 'PCB',     link: '/1_PCB/g80_3000' },
          { text: '有线',    link: '/2_wired/DS17' },
          { text: '多模',    link: '/4_Tri-mode/4.1_dm17' },
          { text: 'DZ系列',  link: '/3_DZ/DZ17' },
          { text: 'EC系列',  link: '/7_EC/EC87' },
          { text: 'Swagkeys',link: '/5_Swagkeys/Eave' },
          { text: '使用指南',link: '/6_guide/6.1_VIA' }
        ],

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

        editLink: {
          pattern: 'https://github.com/micahyy/docs/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页'
        },

        docFooter: { prev: '上一篇', next: '下一篇' },

        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright \u00A9 2024-present 菜籽猫 / Micah'
        },

        sidebar: [
          {
            text: 'PCB 设计',
            collapsed: false,
            items: [
              { text: 'G80-3000',    link: '/1_PCB/g80_3000' },
              { text: 'Ow_vento 8K', link: '/1_PCB/Ow_vento_8K' }
            ]
          },
          {
            text: '有线键盘',
            collapsed: false,
            items: [
              { text: 'DS17',     link: '/2_wired/DS17' },
              { text: 'DS21',     link: '/2_wired/ds21' },
              { text: 'DS22',     link: '/2_wired/DS22' },
              { text: 'Gamer', link: '/2_wired/gamer' },
              { text: 'GH60 8K',  link: '/2_wired/gh60_8K' }
            ]
          },
          {
            text: 'EC 系列（静电容）',
            collapsed: false,
            items: [
              { text: 'EC87 静电容', link: '/7_EC/EC87' }
            ]
          },
          {
            text: 'DZ 系列',
            collapsed: false,
            items: [
              { text: 'DZ17', link: '/3_DZ/DZ17' },
              { text: 'DZ87', link: '/3_DZ/DZ87' }
            ]
          },
          {
            text: '多模键盘',
            collapsed: false,
            items: [
              { text: 'DM17', link: '/4_Tri-mode/4.1_dm17' }
            ]
          },
          {
            text: 'Swagkeys',
            collapsed: false,
            items: [
              { text: 'EAVE',         link: '/5_Swagkeys/Eave' },
              { text: 'Transition Lite 87',link: '/5_Swagkeys/TransitionLite87' }
            ]
          },
          {
            text: '使用指南',
            collapsed: false,
            items: [
              { text: 'VIA 的使用',   link: '/6_guide/6.1_VIA' },
              { text: '常见问题 QA',  link: '/6_guide/6.2_QA' },
              { text: 'QMK 键码速查', link: '/6_guide/qmk_keycode' }
            ]
          }
        ],

        outline: { label: '本页目录', level: [2, 4] },

        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',

        sidebarMenuLabel: '菜单',
        returnToTopLabel: '回到顶部',
        langMenuLabel: '语言',
        aside: 'deep'
      }
    },

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
          { text: 'Home', link: '/en/' },
          { text: 'EC',  link: '/en/7_EC/EC87' }
        ],

        socialLinks: [
          { icon: 'github', link: 'https://github.com/micahyy/docs' }
        ],

        search: {
          provider: 'local',
          options: {
            placeholder: 'Search docs...',
            translations: {
              button: { buttonText: 'Search', buttonAriaLabel: 'Search docs' },
              modal: {
                displayDetails: 'Show details',
                resetButtonTitle: 'Reset',
                backButtonTitle: 'Close',
                noResultsText: 'No results',
                footer: {
                  selectText: 'Select',
                  selectKeyAriaLabel: 'Enter',
                  navigateText: 'Navigate',
                  navigateUpKeyAriaLabel: 'Up',
                  navigateDownKeyAriaLabel: 'Down',
                  closeText: 'Close',
                  closeKeyAriaLabel: 'Esc'
                }
              }
            },
            detailedView: true
          }
        },

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
                // the full catalog in the meantime.
                sidebar: [
                  {
                    text: 'Keyboards',
                    collapsed: false,
                    items: [
                      { text: 'EC87 (Electrostatic Capacitive)', link: '/en/7_EC/EC87' }
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