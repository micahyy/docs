# 菜籽猫文档

## 什么是菜籽猫？

菜籽猫（czmao）是一个专注于客制化机械键盘的开源社区，涵盖 PCB 设计、固件开发、驱动工具与键盘说明书。所有 PCB 源文件、固件、JSON 等均开源托管于 GitHub 和 Gitee，免费下载，请勿商用。

## 产品矩阵


<div class="czm-matrix-wrap">
<table class="czm-matrix">
  <thead>
    <tr>
      <th>配列</th>
      <th>布局</th>
      <th>方案一</th>
      <th>方案二</th>
      <th>方案三</th>
      <th>方案四</th>
      <th>方案五</th>
      <th>方案六</th>
      <th>方案七</th>
      <th>方案八</th>
    </tr>
  </thead>
  <tbody>
    <tr class="czm-spec">
      <td rowspan="6" class="czm-axis czm-axis-spec">方案参数</td>
      <td>芯片</td>
      <td>CH552T</td>
      <td>APM32F103CBT6</td>
      <td>APM32F103CBT6</td>
      <td>AT32F405RCT7-7</td>
      <td>CH582M</td>
      <td>CH585M</td>
      <td>CH585M</td>
      <td>NRF52840</td>
    </tr>
    <tr class="czm-spec">
      <td>定位</td>
      <td>极致性价比</td>
      <td>满血QMK</td>
      <td>静电容</td>
      <td>电竞8K</td>
      <td>入门三模</td>
      <td>电竞8K</td>
      <td>电竞8K</td>
      <td>低功耗开源蓝牙双模</td>
    </tr>
    <tr class="czm-spec">
      <td>源码</td>
      <td>AI自研</td>
      <td>QMK</td>
      <td>AI自研</td>
      <td>QMK</td>
      <td>AI自研</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td>ZMK</td>
    </tr>
    <tr class="czm-spec">
      <td>模式</td>
      <td>有线单模</td>
      <td>有线单模</td>
      <td>有线单模</td>
      <td>有线单模</td>
      <td>无线三模</td>
      <td>无线三模</td>
      <td>无线三模</td>
      <td class="czm-empty">—</td>
    </tr>
    <tr class="czm-spec">
      <td>轴体</td>
      <td>机械轴</td>
      <td>机械轴</td>
      <td>静电容</td>
      <td>机械轴</td>
      <td>机械轴</td>
      <td>机械轴</td>
      <td>磁轴</td>
      <td>机械轴</td>
    </tr>
    <tr class="czm-spec">
      <td>代码开源</td>
      <td>是</td>
      <td>是</td>
      <td>否</td>
      <td>否</td>
      <td>否</td>
      <td>否</td>
      <td>否</td>
      <td>是</td>
    </tr>
    <tr>
      <td rowspan="3" class="czm-axis">20%</td>
      <td class="czm-layout">17键</td>
      <td class="czm-product czm-status-todo">DS17Lite<br><span class="czm-tag">待开发</span></td>
      <td class="czm-product czm-status-sale">DS17<br><a class="czm-pill" href="/zh/2_wired/DS17">说明书</a> <a class="czm-pill czm-pill-buy czm-pill-mall" href="https://shop.micah.vip/#/kit/KIT-8ML8ACSR" target="_blank" rel="noopener">商城</a> <a class="czm-pill czm-pill-buy czm-pill-taobao" href="https://item.taobao.com/item.htm?ft=t&amp;id=819874589305" target="_blank" rel="noopener">淘宝</a><br><span class="czm-tag czm-tag-sale">在售</span></td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-product czm-status-sale">DZ17<br><a class="czm-pill" href="/zh/3_DZ/DZ17">说明书</a> <a class="czm-pill czm-pill-buy czm-pill-taobao" href="https://item.taobao.com/item.htm?ft=t&amp;id=1086940184127" target="_blank" rel="noopener">淘宝</a><br><span class="czm-tag czm-tag-sale">在售</span></td>
    </tr>
    <tr>
      <td class="czm-layout">21键</td>
      <td class="czm-empty">—</td>
      <td class="czm-product">DS21 四旋钮<br><a class="czm-pill" href="/zh/1_PCB/b70_ds21_encoder">说明书</a></td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
    </tr>
    <tr>
      <td class="czm-layout">22键</td>
      <td class="czm-product czm-status-dev">DS22<br><a class="czm-pill" href="/zh/2_wired/DS22">说明书</a><br>DS22Lite<br><span class="czm-tag czm-tag-wip">开发中</span></td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-product czm-status-dev">DC22<br><a class="czm-pill" href="/zh/4_Tri-mode/4.2_dc22">说明书</a><br><span class="czm-tag czm-tag-wip">开发中</span></td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
    </tr>
    <tr>
      <td rowspan="2" class="czm-axis">40%</td>
      <td class="czm-layout">gamer</td>
      <td class="czm-na">IO数量限制<br>不开发</td>
      <td class="czm-product">gamer<br><a class="czm-pill" href="/zh/2_wired/gamer">说明书</a></td>
      <td class="czm-empty">—</td>
      <td class="czm-product czm-status-todo">RUSH_Gamer<br><span class="czm-tag">待开发</span></td>
      <td class="czm-empty">—</td>
      <td class="czm-product">Gamer</td>
      <td class="czm-product czm-status-dev">HE_Gamer<br><span class="czm-tag czm-tag-wip">开发中</span></td>
      <td class="czm-empty">—</td>
    </tr>
    <tr>
      <td class="czm-layout">DS34</td>
      <td class="czm-na">IO数量限制<br>不开发</td>
      <td class="czm-product">DS34 v2<br><a class="czm-pill" href="/zh/1_PCB/b23_ds34_v2">说明书</a></td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
    </tr>
    <tr>
      <td rowspan="3" class="czm-axis">60%</td>
      <td class="czm-layout">标准60</td>
      <td class="czm-na">IO数量限制<br>不开发</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-product czm-status-sale">RUSH60_8K<br><a class="czm-pill" href="/zh/2_wired/gh60_8K">说明书</a> <a class="czm-pill czm-pill-buy czm-pill-taobao" href="https://item.taobao.com/item.htm?ft=t&amp;id=1093120959484" target="_blank" rel="noopener">淘宝</a><br><span class="czm-tag czm-tag-sale">在售</span></td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
    </tr>
    <tr>
      <td class="czm-layout">SW EAVE</td>
      <td class="czm-na">IO数量限制<br>不开发</td>
      <td class="czm-product czm-status-off">EAVE<br><a class="czm-pill" href="/zh/5_Swagkeys/Eave">说明书</a><br><span class="czm-tag czm-tag-off">停售</span></td>
      <td class="czm-product czm-status-sale">EC65<br><a class="czm-pill" href="/zh/7_EC/EC65">说明书</a> <a class="czm-pill czm-pill-buy czm-pill-taobao" href="https://item.taobao.com/item.htm?ft=t&amp;id=1094389098322" target="_blank" rel="noopener">淘宝</a><br><span class="czm-tag czm-tag-sale">在售</span></td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
    </tr>
    <tr>
      <td class="czm-layout">左移64</td>
      <td class="czm-na">IO数量限制<br>不开发</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
    </tr>
    <tr>
      <td rowspan="2" class="czm-axis">80%</td>
      <td class="czm-layout">TKL</td>
      <td class="czm-na">IO数量限制<br>不开发</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
    </tr>
    <tr>
      <td class="czm-layout">Transition 87</td>
      <td class="czm-na">IO数量限制<br>不开发</td>
      <td class="czm-product czm-status-off">SW Transition Lite 87<br><a class="czm-pill" href="/zh/5_Swagkeys/TransitionLite87">说明书</a><br><span class="czm-tag czm-tag-off">停售</span></td>
      <td class="czm-product czm-status-sale">EC87_TL<br><a class="czm-pill" href="/zh/7_EC/EC87">说明书</a> <a class="czm-pill czm-pill-buy czm-pill-mall" href="https://shop.micah.vip/#/kit/EC87-KIT" target="_blank" rel="noopener">商城</a> <a class="czm-pill czm-pill-buy czm-pill-taobao" href="https://item.taobao.com/item.htm?ft=t&amp;id=1092120748142" target="_blank" rel="noopener">淘宝</a><br><span class="czm-tag czm-tag-sale">在售</span></td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-empty">—</td>
      <td class="czm-product czm-status-sale">DZ87<br><a class="czm-pill" href="/zh/3_DZ/DZ87">说明书</a> <a class="czm-pill czm-pill-buy czm-pill-taobao" href="https://item.taobao.com/item.htm?ft=t&amp;id=962342017714" target="_blank" rel="noopener">淘宝</a><br><span class="czm-tag czm-tag-sale">在售</span></td>
    </tr>
    <tr>
      <td class="czm-axis">待定</td>
      <td class="czm-layout">—</td>
      <td colspan="8" class="czm-product">
        <a class="czm-pill" href="/zh/8_download/">下载中心</a>
      </td>
    </tr>
  </tbody>
</table>
</div>



## 在线工具

- [VIA 在线改键](https://via.micah.vip/) — 国内服务器，实时改键。
- [VIA (GitHub)](https://micahyy.github.io/) — 海外服务器。

## 固件与驱动

所有 PCB 源文件、固件、JSON 等都放在 GitHub 和 Gitee，免费下载。

- GitHub: [micahyy/czmao](https://github.com/micahyy/czmao)
- Gitee 镜像: [micahyy/czmao](https://gitee.com/micahyy/czmao)

## 需要帮助？

- [VIA 使用教程](/zh/6_guide/6.1_VIA)
- [常见问题 FAQ](/zh/6_guide/6.2_QA)
- [QMK 键码速查](/zh/6_guide/qmk_keycode)
- QQ 交流群: `677654482`

## 联系方式

| 渠道 | 地址 |
| :--- | :--- |
| 淘宝店铺 | [maiku.taobao.com](https://maiku.taobao.com/) |
| MakerWorld | [@micahyy](https://makerworld.com.cn/zh/@micahyy) |
| GitHub | [github.com/micahyy](https://github.com/micahyy) |
| Gitee | [gitee.com/micahyy/czmao](https://gitee.com/micahyy/czmao) |
| QQ 交流群 | `677654482` |
