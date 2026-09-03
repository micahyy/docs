import DefaultTheme from 'vitepress/theme'
import Comments from './Comments.vue'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // Renders at the bottom of every doc page (home page excluded
      // inside the component itself).
      'doc-after': () => h(Comments)
    })
  }
}
