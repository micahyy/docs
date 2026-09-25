# 左手游戏键盘（08gamerst）

35 键左手游戏小键盘 + 1 个旋钮 · USB 有线单模 · QMK 固件 · VIA 改键

> 08gamerst 是菜籽猫的**左手游戏键盘** PCB：主控 STM32F103CBT6（Blue Pill），6 行 × 7 列矩阵，只保留左手常用区（ESC / F1–F4、`~`–`6`、QWERT 区），右下角带 1 个 EC11 旋钮。有**两个版本**：一个带 2 个 USB 2.0 HUB（可插主键盘和鼠标的接收器，配合支架把板子立起来），一个不带 HUB。旋钮走虚拟键位映射，**顺 / 逆时针都能在 VIA 里单独改键**。固件为 QMK，开源，支持 VIA 在线实时改键。

## 1. 基本参数

| 规格 | 参数 |
| :------- | :---------------------- |
| PCB 型号 | `08gamerst`（左手游戏键盘） |
| 按键数量 | 35 键 + 1 个旋钮 |
| 矩阵 | 6 行 × 7 列（COL2ROW） |
| 连接模式 | USB 有线单模 |
| 接口 | Type-C（支持 C2C 线） |
| 主控 | STM32F103CBT6（Blue Pill） |
| 旋钮 | 1 个 EC11 增量编码器（A5 / A6，步进 4） |
| USB HUB | 可选版本带 2 个 USB 2.0 HUB（接接收器用） |
| USB VID / PID | `0x4E08` / `0x4E08` |
| 灯光 | RGB 轴灯（WS2812 @ B13，下灯位），34 个灯位 |
| 默认灯效 | `cycle_left_right`（左右循环） |
| 层数 | 3 层（0–2） |
| 全键无冲 | 支持，默认开启（`NK_TOGG` 可切） |
| 回报率 | 1000 Hz |
| 固件平台 | QMK（开源） |
| 改键工具 | VIA 在线改键 |
| 源代码 | [github.com/micahyy/czm_qmk](https://github.com/micahyy/czm_qmk) |

## 2. 硬件接口与引脚（PCB 设计）

| 功能 | 引脚 / 参数 |
| :--- | :--- |
| 矩阵行（rows） | B4、A7、B0、B1、B10、B11 |
| 矩阵列（cols） | B15、A8、A9、A10、A15、B3、A4 |
| 二极管方向 | COL2ROW（列→行） |
| 旋钮 A / B 相 | A5 / A6（步进 4） |
| WS2812 数据脚 | B13 |
| Bootloader | stm32duino |

### 2.1 旋钮虚拟键位

旋钮的顺 / 逆时针映射到 **row 5 的 `VOLU` / `VOLD`** 两个虚拟位（`ENCODERS_MATRIX_MAP`），这两个位置在键位图的最下一排右侧，没有实体轴，**每一层都能在 VIA 里分别指定功能**（默认就是音量加 / 减）。

## 3. 灯光说明

- 轴灯为 **WS2812 RGB 下灯位**，共 34 个灯位，默认灯效「左右循环」，最大亮度 180。
- **CapsLock 指示**：CapsLock 开启时第 18 号灯位亮白。
- **层指示**：切层时整板灯会变色提示 —— 第 1 层红、第 2 层绿、第 3 层蓝、第 4 层粉、第 5 层黄、第 6 层紫、第 7 层白。
- 灯效开关、切换、色相 / 饱和度 / 亮度 / 速度都可以用 `FN + ALT + 键` 直接调（见下节），也可以在 VIA 的 Lighting 菜单里调。

## 4. 快捷键与层

键盘有 3 层（0–2）：

| 操作 | 说明 |
| :--- | :--- |
| 按住 `FN`（最下一排左起第 2 个键） | 进入第 1 层 |
| 按住 `FN` 不放，再按住 `ALT` | 进入第 2 层（`FN + ALT + 键` 触发第 2 层功能） |

### 4.1 第 0 层（默认层）

| 区域 | 键 |
| :--- | :--- |
| 第一排 | `ESC`、`F1`、`F2`、`F3`、`F4`、`Mute` |
| 第二排 | `` ` ``、`1`、`2`、`3`、`4`、`5`、`6` |
| 第三排 | `Tab`、`Q`、`W`、`E`、`R`、`T` |
| 第四排 | `Caps`、`A`、`S`、`D`、`F`、`G` |
| 第五排 | `LShift`、`Z`、`X`、`C`、`V`、`B` |
| 第六排 | `LCtrl`、`FN`、`LAlt`、`Space`、旋钮（`音量+` / `音量-`） |

### 4.2 第 2 层（`FN + ALT` 层，灯光与维护）

| 快捷键 | 功能 |
| :--- | :--- |
| `FN + ALT + LShift` | RGB 开关（`RM_TOGG`） |
| `FN + ALT + Z` | 切换灯效（`RM_NEXT`） |
| `FN + ALT + W` / `FN + ALT + S` | 色相 +（`RM_HUEU`） |
| `FN + ALT + X` / `FN + ALT + C` | 色相 -（`RM_HUED`）／饱和度 -（`RM_SATD`） |
| `FN + ALT + E` / `FN + ALT + D` | 饱和度 +（`RM_SATU`） |
| `FN + ALT + Q` / `FN + ALT + F` | 亮度 +（`RM_VALU`） |
| `FN + ALT + V` | 亮度 -（`RM_VALD`） |
| `FN + ALT + G` | 灯效速度 +（`RM_SPDU`） |
| `FN + ALT + B` | 灯效速度 -（`RM_SPDD`） |
| `FN + ALT + Tab` | 全键无冲开关（`NK_TOGG`，默认开启） |
| `FN + ALT + ESC` | **恢复出厂设置**（`EE_CLR`，清空 VIA 改键） |
| `FN + ALT + Mute` | **进入 Bootloader**（`QK_BOOT`，刷机模式） |

> `Mute` 为旋钮位或者 F5，视具体焊接的配列而定。

## 5. VIA 改键

1. 用 USB 线接好键盘，打开 VIA：[国内服务器](https://via.micah.vip/) ｜ [海外服务器](https://micahyy.github.io/)
2. 首次使用需要在 **Design（设计）** 标签加载本键盘的 JSON 定义文件
3. 加载后切回 **Configure（改键）** 标签即可实时改键，改完立即生效并保存在键盘里
4. 37 个位置都可改，其中 **最下一排的 `VOLU` / `VOLD` 就是旋钮的顺 / 逆时针**

VIA 使用教程见：[VIA 的使用](/zh/6_guide/6.1_VIA)

## 6. 固件烧录

本 PCB 使用 **stm32duino** bootloader：

1. **进入 Bootloader**（任选一种）：
   - 快捷键：按 `FN + ALT + Mute`（`QK_BOOT`）
   - 或：拔掉 USB 线，**按住左上角第一个键（ESC）不放**再插线（QMK Bootmagic Lite）
2. **烧录固件**：
   - 用 [QMK Toolbox](https://qmk.fm/toolbox/) 选择编译好的 `.bin` 文件点 Flash；或
   - 命令行：`dfu-util -a 2 -d 1EAF:0003 -D <固件>.bin`
3. 烧录完成后重新插拔 USB 线即可使用。

## 7. 自行编译固件

固件源码开源在 [github.com/micahyy/czm_qmk](https://github.com/micahyy/czm_qmk)，编译命令：

    make czmao/08gamerst:via

仓库的 GitHub Actions 会自动编译，固件可在 Actions 的 Artifact（`firmware-08gamerst`）里下载。

## 8. 常见问题

**Q：VIA 识别不到键盘？**
A：请使用支持 WebHID 的 Chrome / Edge 打开 VIA，并确认已加载本键盘的 JSON 定义。仍不行就换接口或换线。

**Q：带 HUB 的版本，接收器插上去没反应？**
A：HUB 是纯 USB 2.0 扩展，需要主板先识别到键盘本身的 USB 复合设备；请先确认键盘已正常连接，再把接收器插到 HUB 口上。

**Q：旋钮方向反了？**
A：在 VIA 里把 `VOLU` / `VOLD` 两个位置的功能互换即可。

**Q：改键乱了想恢复？**
A：按 `FN + ALT + ESC`（`EE_CLR`），清空 EEPROM 回到默认键位。

**Q：全键无冲在某些机器上不识别？**
A：按 `FN + ALT + Tab` 关掉 NKRO（默认开启），部分老主板 / BIOS 只支持 6KRO。

---

[QQ 交流群]

    677654482

---

## 📥 固件与源码下载

- 固件源码（QMK）：[github.com/micahyy/czm_qmk](https://github.com/micahyy/czm_qmk)（PCB 路径 `keyboards/czmao/08gamerst`）
- 编译好的固件：仓库 GitHub Actions 的 Artifact `firmware-08gamerst`

烧录方法见上文[第 6 节「固件烧录」](#_6-固件烧录)。
