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
      <div v-else-if="b.kind === 'table'" class="dl-table" :class="'cols-' + b.cols.length">
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
  display: grid;
  gap: 12px;
  padding: 6px 10px;
  border-bottom: 1px solid var(--vp-c-divider, #e2e2e3);
  align-items: baseline;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
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
  overflow-wrap: anywhere;
}
/* 4 列下载表：文件 | 说明 | 更新日期 | 大小 */
.dl-table.cols-4 .dl-row {
  grid-template-columns: minmax(0, 1.7fr) minmax(0, 2.3fr) 108px 70px;
}
.dl-table.cols-4 .dl-c:nth-child(3) {
  text-align: center;
}
.dl-table.cols-4 .dl-c:nth-child(4) {
  text-align: right;
}
/* 3 列更新记录：版本 | 日期 | 变更（变更列占满剩余宽度） */
.dl-table.cols-3 .dl-row {
  grid-template-columns: 64px 112px minmax(0, 1fr);
}
.dl-table.cols-3 .dl-c:nth-child(1) {
  text-align: center;
}
@media (max-width: 640px) {
  .dl-table {
    overflow-x: auto;
  }
  .dl-row {
    min-width: 540px;
  }
  .dl-table.cols-3 .dl-row {
    min-width: 460px;
  }
}
</style>
