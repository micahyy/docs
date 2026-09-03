<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { useData, useRoute } from 'vitepress'

const { isDark } = useData()
const route = useRoute()
const container = ref<HTMLElement>()

// Giscus = GitHub Discussions backed comments.
// Configured once here: https://github.com/micahyy/docs
function loadComments() {
  const el = container.value
  if (!el) return
  el.innerHTML = ''
  const s = document.createElement('script')
  s.src = 'https://giscus.app/client.js'
  s.setAttribute('data-repo', 'micahyy/docs')
  s.setAttribute('data-repo-id', 'R_kgDOSGE9mw')
  s.setAttribute('data-category', 'Announcements')
  s.setAttribute('data-category-id', 'DIC_kwDOSGE9m84DEyu-')
  s.setAttribute('data-mapping', 'pathname')
  s.setAttribute('data-strict', '1')
  s.setAttribute('data-reactions-enabled', '1')
  s.setAttribute('data-emit-metadata', '0')
  s.setAttribute('data-input-position', 'top')
  s.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  s.setAttribute('data-lang', 'zh-CN')
  s.setAttribute('data-loading', 'lazy')
  s.crossOrigin = 'anonymous'
  s.async = true
  el.appendChild(s)
}

watch(
  () => route.path,
  async (p) => {
    if (p === '/') return // 首页不显示评论
    await nextTick()
    loadComments()
  }
)

onMounted(() => {
  if (route.path !== '/') loadComments()
})

// Follow VitePress dark/light mode
watch(isDark, (dark) => {
  const frame = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
  frame?.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: dark ? 'dark' : 'light' } } },
    'https://giscus.app'
  )
})
</script>

<template>
  <div v-if="route.path !== '/'" class="comments-wrap">
    <h3 class="comments-title">
      评论 / 提问
      <span class="comments-hint">（用 GitHub 账号登录即可留言，也欢迎提交产品问题）</span>
    </h3>
    <div ref="container" class="giscus-container" />
  </div>
</template>

<style scoped>
.comments-wrap {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}
.comments-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
}
.comments-hint {
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--vp-c-text-2);
}
</style>
