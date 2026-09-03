<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import { init, update } from '@waline/client'
import '@waline/client/waline.css'

const route = useRoute()
const container = ref<HTMLElement>()

// Waline comments (nickname + email, no account required).
// Server endpoint: self-hosted Waline on https://comments.micah.vip
const SERVER_URL = 'https://comments.micah.vip'

let walineInstance: ReturnType<typeof init> | null = null

function renderComments() {
  const el = container.value
  if (!el) return
  if (!walineInstance) {
    walineInstance = init({
      el,
      serverURL: SERVER_URL,
      lang: 'zh-CN',
      path: route.path,
      // VitePress adds the .dark class on <html>; Waline watches this
      // selector and follows the site theme automatically.
      dark: 'html.dark',
      // login 'disable' = no accounts at all: visitors post with a
      // nickname (required) and optional email.
      login: 'disable',
      meta: ['nick', 'mail'],
      requiredMeta: ['nick'],
      wordLimit: 1000,
      pageSize: 20,
      imageUploader: false,
      search: false,
      reaction: false,
      texRenderer: false
    })
  } else {
    update({ path: route.path })
  }
}

watch(
  () => route.path,
  async (p) => {
    if (p === '/') return // 首页不显示评论
    await nextTick()
    renderComments()
  }
)

onMounted(() => {
  if (route.path !== '/') renderComments()
})
</script>

<template>
  <div v-if="route.path !== '/'" class="comments-wrap">
    <h3 class="comments-title">
      评论 / 提问
      <span class="comments-hint">（填个昵称就能留言，无需注册；邮箱选填，填了能收到回复通知）</span>
    </h3>
    <div ref="container" class="waline-container" />
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
