# DS34 v2 Light 数字小键盘（c23_ds34_v2_light）

34 键 + 1 个旋钮 · USB 有线单模 · QMK 固件 · VIA 改键

> c23_ds34_v2_light 是 DS34 v2 的 **Light 版本**，与 `b23_ds34_v2` 是**同一套硬件**（同为 STM32F103CBT6、8 列 × 6 行、1 个旋钮、WS2812 @ B13），区别只有两点：**USB PID 为 `0x4C23`**，以及**固件里多了一层 Ctrl+F1~F12 的快捷层**。基础数字小键盘键位与 b23 完全一致。

## 1. 基本参数

| 规格 | 参数 |
| :------- | :---------------------- |
| PCB 型号 | `c23_ds34_v2_light`（DS34 v2 Light） |
| 按键数量 | 34 键 + 1 个旋钮 |
| 矩阵 | 8 列 × 6 行（COL2ROW） |
| 连接模式 | USB 有线单模 |
| 接口 | Type-C（支持 C2C 线） |
| 主控 | STM32F103CBT6（Blue Pill） |
| 旋钮 | 1 个 EC11 增量编码器（B8 / B9，方向已翻转） |
| USB VID / PID | `0x4C23` / `0x4C23` |
| 灯光 | RGB 轴灯（WS2812 @ B13，下灯位），33 个灯位 |
| 默认灯效 | `cycle_left_right`（左右循环） |
| 层数 | 4 层（0–3） |
| 全键无冲 | 支持（NKRO） |
| 回报率 | 1000 Hz |
| 固件平台 | QMK（开源） |
| 改键工具 | VIA 在线改键 |
| 源代码 | [github.com/micahyy/czm_qmk](https://github.com/micahyy/czm_qmk) |

## 2. 硬件接口与引脚（PCB 设计）

与 `b23_ds34_v2` 完全相同：

| 功能 | 引脚 / 参数 |
| :--- | :--- |
| 矩阵 | 6 行 × 8 列（COL2ROW） |
| 旋钮 A / B 相 | B8 / B9 |
| WS2812 数据脚 | B13 |
| Bootloader | stm32duino |

旋钮的顺 / 逆时针映射到 **row 3 的 col 0 / col 1** 两个虚拟位，这两个位置没有实体轴，可在 VIA 里逐层指定功能；方向默认翻转（`ENCODER_DIRECTION_FLIP`）。

## 3. 灯光说明

- 轴灯为 **WS2812 RGB 下灯位**，共 33 个灯位，默认灯效「左右循环」。
- **NumLock 指示**：NumLock 开启时第 9 号灯位亮白。
- **层指示**：切到第 1 / 2 / 3 层时，对应灯位会亮白，方便确认当前层。

## 4. 快捷键与层

| 操作 | 说明 |
| :--- | :--- |
| 按 `FN`（默认层顶部第 4 个位置，Pause 键位） | 按住进入第 1 层 |
| 第 1 层里按 `PgUp` 位 | **切换**到第 3 层（`TO(3)`，不是临时层，会一直停在第 3 层） |
| 第 1 层里按住 `↓` | 临时进入第 3 层（`MO(3)`） |
| 第 2 层里按右下角 `.` 位 | 恢复出厂设置（`EE_CLR`） |

### 4.1 第 0 层（默认层）

与 b23_ds34_v2 一致：顶部 `PrintScreen` / `ScrollLock` / `FN` / `PgUp` / `PgDn` / `Mute` / `音量-` / `音量+`，下方是完整编辑区（`Insert` `Home` `Del` `End`）、数字小键盘区（`/` `*` `-` `+` `Enter` `.`）与方向键。

### 4.2 第 1 层（按住 `FN`）

| 位置 | 键 |
| :--- | :--- |
| `PgUp` 位 | 切换到第 3 层（`TO(3)`） |
| `Num` 位 | RGB 开关（`RM_TOGG`） |
| `5` 位 | 切换灯效（`RM_NEXT`） |
| `0` 位 | 切换灯效（`RM_NEXT`） |
| `↓` 位 | 按住临时进入第 3 层（`MO(3)`） |

### 4.3 第 3 层（Ctrl+F1~F12 快捷层）

这是 Light 版特有的层，数字键位全部变成 **Ctrl + F1~F12** 组合键，适合给软件快捷键 / 宏用：

| 位置 | 键 |
| :--- | :--- |
| 左上角 `PrintScreen` 位 | **进入 Bootloader**（`QK_BOOT`） |
| 顶部第 8 / 9 位 | `PgUp` / `PgDn` |
| `Num` / `/` / `*` 位 | `Ctrl+F7` / `Ctrl+F8` / `Ctrl+F9` |
| `4` / `5` / `6` 位 | `Ctrl+F4` / `Ctrl+F5` / `Ctrl+F6` |
| `1` / `2` / `3` / `+` 位 | `Ctrl+F1` / `Ctrl+F2` / `Ctrl+F3` / `Ctrl+F12` |
| `0` / `.` 位 | `Ctrl+F10` / `Ctrl+F11` |

> 用 `TO(3)` 切到第 3 层后会停在该层，想回到普通数字键盘，再切回第 0 层即可（可在 VIA 里给第 3 层任意键补一个 `TO(0)`）。

## 5. VIA 改键

1. 用 USB 线接好键盘，打开 VIA：[国内服务器](https://via.micah.vip/) ｜ [海外服务器](https://micahyy.github.io/)
2. 首次使用需在 **Design（设计）** 标签加载本键盘的 JSON 定义文件
3. 加载后切回 **Configure（改键）** 标签即可实时改键，改完立即生效并保存在键盘里
4. 36 个位置都可改，其中 **row 3 的 col 0 / col 1 就是旋钮的顺 / 逆时针**

VIA 使用教程见：[VIA 的使用](/zh/6_guide/6.1_VIA)

## 6. 固件烧录

本 PCB 使用 **stm32duino** bootloader：

1. **进入 Bootloader**（任选一种）：
   - 快捷键：切到第 3 层后按左上角 `PrintScreen` 位（`QK_BOOT`）
   - 或：拔掉 USB 线，**按住左上角第一个键不放**再插线（QMK Bootmagic Lite）
2. **烧录固件**：
   - 用 [QMK Toolbox](https://qmk.fm/toolbox/) 选择编译好的 `.bin` 文件点 Flash；或
   - 命令行：`dfu-util -a 2 -d 1EAF:0003 -D <固件>.bin`
3. 烧录完成后重新插拔 USB 线即可使用。

## 7. 自行编译固件

固件源码开源在 [github.com/micahyy/czm_qmk](https://github.com/micahyy/czm_qmk)，编译命令：

    make czmao/c23_ds34_v2_light:via

仓库的 GitHub Actions 会自动编译，固件可在 Actions 的 Artifact（`firmware-c23_ds34_v2_light`）里下载。

## 8. 常见问题

**Q：它和 b23_ds34_v2 有什么区别？**
A：硬件完全一样，只是出厂 VID/PID 不同（`0x4C23`），固件多了一层 Ctrl+F1~F12 快捷层。烧录固件时注意选对型号。

**Q：切到第 3 层后回不来 / 数字打不出来？**
A：第 1 层的 `PgUp` 位是 `TO(3)`（切换而非长按），会停在第 3 层。再按一次回到第 0 层的键，或在 VIA 里给第 3 层补一个 `TO(0)`。

**Q：旋钮方向反了？**
A：在 VIA 里把旋钮对应的两个位置互换即可；也可以改 `config.h` 的 `ENCODER_DIRECTION_FLIP` 后重新编译。

**Q：改键乱了想恢复？**
A：第 2 层右下角 `.` 位是 `EE_CLR`（恢复出厂设置），清空 EEPROM 回到默认键位。

---

[QQ 交流群]

    677654482

---

## 📥 固件与源码下载

- 固件源码（QMK）：[github.com/micahyy/czm_qmk](https://github.com/micahyy/czm_qmk)（PCB 路径 `keyboards/czmao/c23_ds34_v2_light`）
- 编译好的固件：仓库 GitHub Actions 的 Artifact `firmware-c23_ds34_v2_light`

烧录方法见上文[第 6 节「固件烧录」](#_6-固件烧录)。
