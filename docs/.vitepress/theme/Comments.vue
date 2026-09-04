<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const container = ref<HTMLElement>()

// Waline 评论（昵称 + 邮箱，无需注册账号）
// 服务端：自建 Waline，https://comments.micah.vip
// 注意：@waline/client 必须客户端动态 import。顶层静态 import 会在
// VitePress SSR 构建期加载 waline.js，其内部引用 document/window 导致构建失败
// （08a7c3d 构建红的根因）。CSS 同理动态引入。
const SERVER_URL = 'https://comments.micah.vip'

let walineInstance: any = null
let walineInit: ((opts: any) => any) | null = null
let walineUpdate: ((opts: any) => void) | null = null
let walineLoading: Promise<void> | null = null

function ensureWaline(): Promise<void> {
  if (walineInit) return Promise.resolve()
  if (!walineLoading) {
    walineLoading = (async () => {
      const mod = await import('@waline/client')
      await import('@waline/client/waline.css')
      walineInit = mod.init
      walineUpdate = mod.update
    })()
  }
  return walineLoading
}

function renderComments() {
  const el = container.value
  if (!el || !walineInit) return
  if (!walineInstance) {
    walineInstance = walineInit({
      el,
      serverURL: SERVER_URL,
      lang: 'zh-CN',
      path: route.path,
      // VitePress 在 <html> 上加 .dark；Waline 监听该选择器自动跟随深浅色
      dark: 'html.dark',
      // login 'disable' = 完全不用账号：访客填昵称（必填）即可留言，邮箱选填
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
  } else if (walineUpdate) {
    walineUpdate({ path: route.path })
  }
}

watch(
  () => route.path,
  async (p) => {
    if (p === '/') return // 首页不显示评论
    await ensureWaline()
    await nextTick()
    renderComments()
  }
)

onMounted(async () => {
  if (route.path === '/') return
  await ensureWaline()
  await nextTick()
  renderComments()
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
