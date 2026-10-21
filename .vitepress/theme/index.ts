import DefaultTheme from 'vitepress/theme'
import { h, computed } from 'vue'
import { useRoute } from 'vitepress'
import QcWarranty from './components/QcWarranty.vue'

// 产品说明书所在目录：这些分类下的每一篇都会自动附带合格证 + 保修卡
const MANUAL_PREFIXES = ['1_PCB', '2_wired', '3_DZ', '4_Tri-mode', '5_Swagkeys', '7_EC']

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('QcWarranty', QcWarranty)
  },
  Layout: () => {
    const route = useRoute()
    const isManual = computed(() =>
      MANUAL_PREFIXES.some((p) => route.path.includes('/' + p + '/'))
    )
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => (isManual.value ? h(QcWarranty) : null),
    })
  },
}
