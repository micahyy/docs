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

    <!-- 保修卡 -->
    <section class="qc-card qc-warranty-card">
      <h3>{{ en ? 'WARRANTY CARD' : '保修卡' }}</h3>
      <p><b>{{ en ? 'Warranty:' : '保修期限：' }}</b>{{ en
        ? '12 months from the date of purchase.'
        : '自购买之日起 12 个月。' }}</p>
      <p><b>{{ en ? 'Covered:' : '保修范围：' }}</b>{{ en
        ? 'Functional failures not caused by man-made damage (dead keys, connection issues, lighting faults, etc.), repaired or replaced free of charge.'
        : '非人为损坏的功能故障（按键失灵、连接异常、灯效故障等），免费维修或换新。' }}</p>
      <p><b>{{ en ? 'Not covered:' : '不保情形：' }}</b>{{ en
        ? 'Man-made damage (cracks / liquid / burnt), unauthorized modification or non-official firmware, normal wear (keycap legends, switch feel), or missing purchase proof / incomplete warranty info.'
        : '人为损坏（摔裂 / 进液 / 烧毁）、私自改装或刷非官方固件、正常磨损（键帽字符、轴体手感）、无购买凭证或保修卡信息不全。' }}</p>
      <p><b>{{ en ? 'How to claim:' : '如何申请：' }}</b>{{ en
        ? 'Contact after-sales with this card and purchase proof at '
        : '凭本卡与购买凭证联系售后，网址 ' }}<a href="https://shop.micah.vip">https://shop.micah.vip</a>{{ en ? ', then ship back for inspection.' : '，寄回检测后处理。' }}</p>
      <table class="qc-fill">
        <tbody>
          <tr>
            <td>{{ en ? 'Purchase date: ____________' : '购买日期：____________' }}</td>
            <td>{{ en ? 'Reseller stamp: ____________' : '经销商盖章：____________' }}</td>
          </tr>
          <tr>
            <td>{{ en ? 'User signature: ____________' : '用户签名：____________' }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
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
.qc-warranty-card {
  margin-top: 18px;
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
.qc-fill {
  width: 100%;
  border-collapse: collapse;
}
.qc-fill td {
  padding: 8px 4px;
  width: 50%;
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
