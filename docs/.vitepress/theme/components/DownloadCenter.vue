<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { zhData, enData, type DlBlock } from '../downloads'

const route = useRoute()
const isEn = computed(() => route.path.startsWith('/en/'))
const blocks = computed<DlBlock[]>(() => (isEn.value ? enData : zhData))

function slug(t: string): string {
  return t
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
</script>

<template>
  <div class="dl-center">
    <template v-for="(b, bi) in blocks" :key="bi">
      <h2 v-if="b.kind === 'h2'" :id="slug(b.text)">{{ b.text }}</h2>
      <h3 v-else-if="b.kind === 'h3'">{{ b.text }}</h3>
      <p v-else-if="b.kind === 'p'" v-html="b.html"></p>
      <ol v-else-if="b.kind === 'ol'">
        <li v-for="(it, i) in b.items" :key="i" v-html="it"></li>
      </ol>
      <div v-else-if="b.kind === 'table'" class="dl-table">
        <div class="dl-row dl-head">
          <span
            v-for="(c, ci) in b.cols"
            :key="'h' + ci"
            class="dl-c"
            :class="'dl-c' + ci"
            >{{ c }}</span
          >
        </div>
        <div v-for="(r, ri) in b.rows" :key="'r' + ri" class="dl-row">
          <span
            v-for="(c, ci) in r.cells"
            :key="'c' + ci"
            class="dl-c"
            :class="'dl-c' + ci"
          >
            <a v-if="ci === 0 && r.href" :href="r.href">{{ c }}</a>
            <template v-else>{{ c }}</template>
          </span>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.dl-center {
  margin: 1.5rem 0;
}
.dl-table {
  margin: 0.5rem 0 1.5rem;
  border: 1px solid var(--vp-c-divider, #e2e2e3);
  border-radius: 6px;
  overflow: hidden;
}
.dl-row {
  display: flex;
  gap: 12px;
  padding: 6px 10px;
  border-bottom: 1px solid var(--vp-c-divider, #e2e2e3);
  align-items: baseline;
  flex-wrap: wrap;
}
.dl-row:last-child {
  border-bottom: none;
}
.dl-head {
  font-weight: 600;
  background: var(--vp-c-bg-soft, #f6f6f7);
}
.dl-c {
  min-width: 0;
  word-break: break-all;
}
.dl-c0 {
  flex: 1 1 200px;
}
.dl-c1 {
  flex: 2 1 200px;
}
.dl-c2 {
  flex: 0 0 100px;
  text-align: center;
}
.dl-c3 {
  flex: 0 0 70px;
  text-align: right;
}
@media (max-width: 600px) {
  .dl-c2,
  .dl-c3 {
    flex-basis: auto;
  }
}
</style>
