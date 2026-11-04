---
title: CZMAO 3000 (Cherry G80-3000 复刻)
status: stable
updated: 2026-11-04
---

# CZMAO 3000（Cherry G80-3000 复刻）

108 键全尺寸机械键盘 · USB 有线 Type-C · QMK + VIA 在线改键 · WS2812 RGB 轴灯

> CZMAO 3000 是基于经典 Cherry G80-3000 外形的全尺寸（108 键，含数字小键盘）机械键盘复刻方案，主控采用 STM32F103，板载 WS2812 单色/彩色 RGB 轴灯，支持 QMK 固件与 VIA 在线改键。本页为成品键盘使用说明书；PCB 改装相关的内容见 [G80-3000 改装 PCB](/zh/1_PCB/g80_3000)。

## 1. 产品速览

| 规格 | 参数 |
| :------- | :---------------------- |
| 按键数 | 108 键，全尺寸（含数字小键盘） |
| 配列 | 标准 108 全尺寸配列 |
| 连接模式 | USB 有线单模（Type-C，支持 C2C 线） |
| 主控 | STM32F103 |
| Bootloader | stm32duino（应用偏移 0x2000，即 8KB） |
| 接口 | Type-C |
| 固件平台 | QMK（开源） |
| 改键驱动 | VIA（在线驱动网页版） |
| RGB | WS2812，轴灯 / 下灯位，RGB Matrix，默认灯效「上下渐变循环」 |
| 指示灯 | Caps Lock / Num Lock / Scroll Lock 由对应键位 RGB 反映；FN 层激活有层指示 |
| 矩阵 | 8 行 × 16 列 |
| 动态层 | 3 层（dynamic keymap，VIA 可改） |
| 全键无冲 | 支持（force_nkro） |
| 回报率 | 1K Hz（典型） |
| USB VID/PID | `0x7F89` / `0x4A36` |
| 源代码 | [github.com/micahyy/czmao](https://github.com/micahyy/czmao) |

## 2. 指示灯与状态

- **Caps Lock**：开启时常亮白光（对应键位 RGB 点亮）。
- **Num Lock**：开启时常亮白光；关闭时小键盘区 8/4/2/6 变为方向键（见第 7 节）。
- **Scroll Lock**：开启时常亮白光。
- **FN 层指示**：按住 FN 键进入 FN 层时，指定灯位点亮白光作为提示。
- 以上灯效由固件 `rgb_matrix_indicators_advanced_user` 控制，仅做状态提示，不随灯效动画变化。

## 3. 快捷键（FN 层）

键盘右侧有一个**专用 FN 键**（位于右 Win 与右 Ctrl 之间；右 Shift 上方另有一个 `FN8` 键，功能相同）。按住 FN 键不放，再按下列对应键即可触发对应功能：

| 功能 | 说明 | 备注 |
| :-- | :-- | :-- |
| 灯光开关 | 开 / 关 RGB 轴灯 | 短按 FN 层对应键 |
| 灯效切换 | 切换灯效模式（共 37 种） | 循环切换 |
| 全键无冲切换 | NKRO（全键无冲）/ 6 键无冲 切换 | `NK_TOGG` |
| 进入 Bootloader | 进入固件烧录模式 | `QK_BOOT`，用于刷机 |
| 恢复出厂设置 | 清空 VIA 改键，恢复默认配列 | `EE_CLR`（FN + `Esc` 区） |
| 静音 / 音量 − / 音量 + | 多媒体音量控制 | `KC_MUTE` / `KC_VOLD` / `KC_VOLU` |
| 播放/暂停、上一曲、下一曲 | 媒体控制 | `KC_MPLY` / `KC_MPRV` / `KC_MNXT` |
| 计算器 / 我的电脑 | 系统快捷键 | `KC_CALC` / `KC_MYCM` |
| 电源 | 系统电源键 | `KC_PWR` |
| Caps Lock 切换 | 切换大写锁定 | `CL_TOGG` |
| 控制键 / GUI 切换 | 切换 Ctrl / Win 修饰键 | `CG_TOGG` / `GU_TOGG` |

> 具体按键位置以键盘丝印为准；上表按功能归类，方便快速查阅 FN 层能力。

## 4. RGB 灯效

- **默认灯效**：`cycle_up_down`（上下渐变循环），上电即亮。
- **灯效数量**：共启用 37 种动态灯效（渐变、呼吸、彩虹、雨滴、涟漪、反应式等）。
- **亮度**：固件上限 `max_brightness = 160`（约 63% 占空比），避免灯珠过亮发热。
- **自定义入口**：
  - 在线私有驱动（推荐，无需 JSON）：[via.micah.vip](https://via.micah.vip/)（国内） / [micahyy.github.io](https://micahyy.github.io/)（海外）
  - 官方 VIA 教程见 [VIA 使用方法](/zh/6_guide/6.1_VIA)
- 灯效动画由 `rgb_matrix` 驱动，WS2812 数据线接在 `B13`。

## 5. 改键

CZMAO 3000 支持 VIA 在线改键：

1. 用浏览器打开 [via.micah.vip](https://via.micah.vip/)（或 [micahyy.github.io](https://micahyy.github.io/)）。
2. 用 Type-C 线连接键盘（必须有线，蓝牙/其他模式不支持 VIA）。
3. 网页识别到键盘后，在「KEYMAP」页拖拽改键，**「LIGHTING」页调节 RGB 灯效与颜色**。
4. 改键自动保存在键盘 EEPROM 中，断电不丢；如需还原，按 FN 层「恢复出厂设置」即可。

高级用户可修改开源固件自行编译（仓库见第 1 节「源代码」）。

## 6. 固件升级

**Bootloader 类型**：stm32duino。应用（app）起始地址为 `0x08002000`（flash 偏移 8KB），前面 8KB 为 bootloader 区域。

**整包固件**：出厂提供的整包镜像（bootloader + 应用）可直接从 flash 起始地址（`0x08000000`）整片烧录。

**进入 Bootloader（烧录模式）**：

- 在 FN 层按「进入 Bootloader」组合键（`QK_BOOT`）后键盘重新枚举为 STM32 设备；或
- 按 PCB 丝印标注的复位操作进入（具体以 PCB 丝印为准）。

**烧录工具**：[QMK Toolbox](https://github.com/qmk/qmk_toolbox/releases)（自动识别 stm32duino 设备），或直接用 STM32 烧录工具写入整包 / app 固件。

> 仅升级应用时，烧录到 `0x08002000` 偏移（app 区域）即可，无需重写 bootloader；整片烧录请用整包镜像。

## 7. 注意事项

- **数据线**：请使用可传输数据的 Type-C 线；纯充电线可能导致无法识别。
- **Num Lock 状态**：数字小键盘默认归属小键盘区，**Num Lock 必须打开**才能输入数字；Num Lock 关闭时，小键盘 `8/4/2/6` 变为 上/左/下/右 方向键。
- **Num Lock 跟随电脑**：Num Lock 状态读取电脑当前锁定状态，可用其他键盘或本键盘的 Num Lock 键切换。
- **RGB 亮度**：固件已限制最大亮度（160/255），不建议自行拉满以免灯珠发热。
- **VIA 与 FN 层**：VIA 改键仅作用于默认层（Layer 0）；FN 层（Layer 1）的快捷键在固件内固定，不在 VIA 可改范围内。

## 8. 故障排查

| 症状 | 可能原因 | 处理 |
| :-- | :-- | :-- |
| 数字小键盘打不出数字 | Num Lock 关闭，按键被映射为方向键 | 打开电脑 Num Lock（按本键盘 Num Lock 键，或换其他键盘切换） |
| 键盘完全无反应 | 未进 Bootloader 却误触烧录 / USB 接触不良 | 重新插拔 USB 线；确认未停留在 Bootloader 模式 |
| VIA 识别不到键盘 | 用了不支持数据的线 / 未走有线 / 页面未授权 | 换数据线、确认有线连接、点击页面「授权设备」 |
| 灯不亮 | RGB 被 FN 层「灯光开关」关掉 | 在 FN 层按「灯光开关」组合键重新开启 |
| 改键后想还原 | — | FN 层按「恢复出厂设置」清空 VIA 配置 |

## 9. 规格表

| 规格 | 参数 |
| :------- | :---------------------- |
| 配列 | 108 键全尺寸（含数字小键盘） |
| 连接模式 | USB 有线单模 |
| 接口 | Type-C（支持 C2C） |
| 主控 | STM32F103 |
| Bootloader | stm32duino（app @ 0x08002000） |
| 固件平台 | QMK |
| 改键驱动 | VIA（在线驱动网页版） |
| RGB | WS2812，RGB Matrix，37 种灯效，默认 cycle_up_down，最大亮度 160 |
| 指示灯 | Caps / Num / Scroll Lock RGB 状态指示 + FN 层指示 |
| 矩阵 | 8 行 × 16 列 |
| 动态层 | 3 层 |
| 全键无冲 | 支持（force_nkro） |
| 回报率 | 1K Hz |
| USB VID/PID | 0x7F89 / 0x4A36 |
| 源代码开源 | 是（github.com/micahyy/czmao） |

---

**QQ 交流群**

677654482

---

## 📥 固件下载

| 固件文件 | 版本 | 发布日期 | 说明 |
| :-- | :-- | :-- | :-- |
| 随产品提供的整包固件（bootloader + app） | 出厂版本 | — | 从 flash 起始地址整片烧录 |
| app 固件（仅应用，@ 0x08002000） | 出厂版本 | — | 走 stm32duino bootloader 升级时用 |

固件源码与可自行编译说明见 [github.com/micahyy/czmao](https://github.com/micahyy/czmao)；在线改键与灯效调节使用 [via.micah.vip](https://via.micah.vip/)。需要特定版本固件或合并后的整包 / HEX 文件，请联系购买渠道或 QQ 群 `677654482`。
