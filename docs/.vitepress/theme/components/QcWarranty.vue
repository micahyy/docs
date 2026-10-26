<script setup>
import { computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const en = computed(() => route.path.startsWith('/en/'))
</script>

<template>
  <div class="qc-warranty" :class="{ en }">
    <!-- 合格证 -->
    <section class="qc-card qc-pass">
      <h3>{{ en ? 'CERTIFICATE OF CONFORMITY' : '合格证' }}</h3>
      <table class="qc-table">
        <tbody>
          <tr>
            <td class="lbl">{{ en ? 'Product / Model' : '产品名称 / 型号' }}</td>
            <td class="val">____________________</td>
          </tr>
          <tr>
            <td class="lbl">{{ en ? 'Executive Standard' : '执行标准' }}</td>
            <td class="val qc-std">Q/CZM &times;&times;&times;</td>
          </tr>
          <tr>
            <td class="lbl">{{ en ? 'Date' : '生产日期' }}</td>
            <td class="val">{{ en ? '(see stamp)' : '（见质检章）' }}</td>
          </tr>
          <tr>
            <td class="lbl">{{ en ? 'Inspector' : '检验员工号' }}</td>
            <td class="val">____________________</td>
          </tr>
        </tbody>
      </table>
      <p class="qc-stmt">
        {{ en
          ? 'This product has been inspected and conforms to the executive standard above.'
          : '本产品经检验合格，符合上述执行标准。' }}
      </p>
      <div class="qc-stamp-box">{{ en ? 'Stamp QC PASS here' : '此处加盖 QC PASS 质检章' }}</div>
    </section>
  </div>
</template>

<style>
.qc-warranty {
  margin-top: 2.5rem;
  font-size: 14px;
  line-height: 1.7;
}
.qc-card {
  border: 2px solid #333;
  border-radius: 6px;
  padding: 16px 20px;
  break-inside: avoid;
}
.qc-card h3 {
  margin: 0 0 14px;
  text-align: center;
  letter-spacing: 3px;
}
.qc-table {
  width: 100%;
  border-collapse: collapse;
}
.qc-table td {
  border: 1px solid #999;
  padding: 8px 10px;
  vertical-align: middle;
}
.qc-table .lbl {
  width: 32%;
  white-space: nowrap;
  font-weight: 600;
}
.qc-std {
  letter-spacing: 1px;
}
.qc-stmt {
  margin: 14px 0;
}
.qc-stamp-box {
  border: 2px dashed #c0392b;
  color: #c0392b;
  text-align: center;
  padding: 18px 10px;
  border-radius: 8px;
  font-weight: 700;
  letter-spacing: 2px;
}

@media print {
  .qc-warranty {
    page-break-before: auto;
  }
  .qc-card {
    break-inside: avoid;
    border-color: #000;
  }
  .qc-stamp-box {
    border-color: #000;
    color: #000;
  }
}
</style>
