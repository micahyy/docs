# DS21 四旋钮版（b70_ds21_encoder）

17 键 + 4 个旋钮的数字小键盘 PCB · USB 有线单模 · QMK 固件 · VIA 改键

> b70_ds21_encoder 是菜籽猫 DS21 数字小键盘的**四旋钮版本**：主控 STM32F103CBT6（Blue Pill），4 列 × 8 行矩阵，4 个 EC11 编码器全部走虚拟键位映射，因此**每个旋钮的顺时针 / 逆时针都能在 VIA 里单独改键**。轴灯为 WS2812 下灯位 RGB。固件为 QMK，开源，支持 VIA 在线实时改键。

## 1. 基本参数

| 规格 | 参数 |
| :------- | :---------------------- |
| PCB 型号 | `b70_ds21_encoder`（DS21 编码器版） |
| 按键数量 | 17 键 + 4 个旋钮 |
| 矩阵 | 4 列 × 8 行（COL2ROW） |
| 连接模式 | USB 有线单模 |
| 接口 | Type-C（支持 C2C 线） |
| 主控 | STM32F103CBT6（Blue Pill） |
| 旋钮 | 4 个 EC11 增量编码器 |
| USB VID / PID | `0x4A07` / `0x4A07` |
| VIA 设备名 | `mao_ds21_R1` |
| 灯光 | RGB 轴灯（WS2812 @ B13，下灯位），22 个灯位 |
| 默认灯效 | `cycle_left_right`（左右循环） |
| 层数 | 4 层（0–3，VIA 可直接改） |
| 全键无冲 | 支持（NKRO，可切换） |
| 回报率 | 1000 Hz |
| 固件平台 | QMK（开源） |
| 改键工具 | VIA 在线改键（支持加载本地 JSON） |
| 源代码 | [github.com/micahyy/czm_qmk](https://github.com/micahyy/czm_qmk) |

## 2. 硬件接口与引脚（PCB 设计）

| 功能 | 引脚 / 参数 |
| :--- | :--- |
| 矩阵行（rows） | B11、B10、B12、B1、C15、A0、B9、B8 |
| 矩阵列（cols） | B7、B6、B5、B4 |
| 二极管方向 | COL2ROW（列→行） |
| WS2812 数据脚 | B13 |
| Bootloader | stm32duino |

### 2.1 旋钮引脚与虚拟键位

| 旋钮 | pin_a | pin_b | 顺时针（CW） | 逆时针（CCW） |
| :--: | :---: | :---: | :--- | :--- |
| 旋钮 1 | A1 | A2 | row 6 / col 0 | row 6 / col 1 |
| 旋钮 2 | A3 | A4 | row 6 / col 2 | row 6 / col 3 |
| 旋钮 3 | A5 | A6 | row 7 / col 0 | row 7 / col 1 |
| 旋钮 4 | A7 | B0 | row 7 / col 2 | row 7 / col 3 |

> row 6 / row 7 这 8 个位置**没有实体轴**，是专门留给 4 个旋钮的虚拟位（固件 LAYOUT 共 30 个位置：22 个按键位 + 8 个旋钮虚拟位）。
> 所以在 VIA 里改键时，这 8 个位置就是旋钮的「顺 / 逆时针」动作，**每一层都能分别指定**，例如 0 层音量加减、1 层翻页、2 层调灯。

旋钮方向整体翻转（`ENCODER_DIRECTION_FLIP`），每格步进 4（`ENCODER_RESOLUTION`）。

## 3. 灯光说明

- 轴灯为 **WS2812 RGB 下灯位**，共 22 个灯位，默认灯效「左右循环」，最大亮度 180。
- **NumLock 指示**：NumLock 开启时第 5 号灯位亮白。
- **层指示**：进入层 1 / 2 / 3 / 4 时，第 16 / 17 / 18 号灯位分别亮白，方便确认当前所在层。
- 灯效、亮度、速度、颜色全部可以在 VIA 的 **Lighting** 菜单里调，也可以用下方快捷键调。

## 4. 快捷键与层

键盘有 4 层（0–3）。默认层 0 是数字小键盘，其余三层通过**长按数字键盘左上角的运算符键**进入（轻按是运算符本身，长按是切层）。

| 操作 | 说明 |
| :--- | :--- |
| 长按 `Num` | 临时进入第 1 层（轻按为 NumLock） |
| 长按 `/`（PSLS） | 临时进入第 2 层（灯光 / 维护层） |
| 长按 `*`（PAST） | 临时进入第 3 层 |
| 长按 `-`（PMNS） | 临时进入第 4 层 |

### 4.1 第 0 层（默认层）

| 位置 | 键 |
| :--- | :--- |
| 顶部功能排 | `ESC`、`Calc`（计算器）、`Play`（播放/暂停）、`Backspace`、`Mute` |
| 运算排 | `Num`、`/`、`*`、`-` |
| 数字区 | `7` `8` `9` / `4` `5` `6` `+` / `1` `2` `3` `Enter` / `0`（2u） `.` |
| 旋钮默认动作 | 旋钮 1：`Del` / `Backspace`；旋钮 2：`PgUp` / `PgDn`；旋钮 3：`上一曲` / `下一曲`；旋钮 4：`音量-` / `音量+` |

### 4.2 第 1 层（长按 `Num`）

| 位置 | 键 |
| :--- | :--- |
| `/` 位 | `Num`（重复 NumLock） |
| `*` 位 | 切到第 2 层（`MO(2)`） |
| `-` 位 | `Calc`（计算器） |
| `8` 位 | 音量 + |
| `4` / `5` / `6` 位 | 上一曲 / 播放暂停 / 下一曲 |
| `2` 位 | 音量 - |
| `0` 位 | `Mute` |

### 4.3 第 2 层（长按 `/`，灯光与维护）

| 位置 | 键 |
| :--- | :--- |
| `-` 位 | 亮度 +（`RM_VALU`） |
| `7` 位 | RGB 开关（`RM_TOGG`） |
| `8` 位 | 饱和度 +（`RM_SATU`） |
| `4` 位 | 色相 -（`RM_HUED`） |
| `5` 位 | **恢复出厂设置**（`EE_CLR`，清空 VIA 改键） |
| `6` 位 | 色相 +（`RM_HUEU`） |
| `9` 位 | 亮度 -（`RM_VALD`） |
| `2` 位 | 饱和度 -（`RM_SATD`） |
| `0` 位 | 切换灯效（`RM_NEXT`） |

### 4.4 第 3 层（长按 `*`）

| 位置 | 键 |
| :--- | :--- |
| `0` 位 | 切换全键无冲开关（`NK_TOGG`） |

> 全键无冲默认开启；部分老主板 / BIOS 下识别异常时，可以用这个键关掉 6KRO 之外的 NKRO。

## 5. VIA 改键

1. 用 USB 线接好键盘，打开 VIA：[国内服务器](https://via.micah.vip/) ｜ [海外服务器](https://micahyy.github.io/)
2. 首次使用需要在 VIA 的 **Design（设计）** 标签页加载本键盘的 JSON 定义文件：
   `czmao_ds21R1.json`（在固件仓库 `keyboards/czmao/b70_ds21_encoder/keymaps/via/` 目录下）
3. 加载后切回 **Configure（改键）** 标签即可实时改键，改完立即生效并保存在键盘里
4. VIA 里 30 个位置都可改，其中 **row 6 / row 7 的 8 个位置就是 4 个旋钮的顺 / 逆时针**

VIA 使用教程见：[VIA 的使用](/zh/6_guide/6.1_VIA)

## 6. 固件烧录

本 PCB 使用 **stm32duino** bootloader，烧录方式：

1. **进入 Bootloader**：拔掉 USB 线，**按住左上角第一个键（ESC）不放**，再插入 USB 线（QMK 的 Bootmagic Lite）。此时键盘进入 DFU 模式，不会输出按键。
2. **烧录固件**：
   - 用 [QMK Toolbox](https://qmk.fm/toolbox/) 选择编译好的 `.bin` 文件，点 Flash；或
   - 命令行：`dfu-util -a 2 -d 1EAF:0003 -D <固件>.bin`
3. 烧录完成后重新插拔 USB 线即可正常使用。

> 如果按住 ESC 插线没有进 DFU，说明当前固件里 Bootmagic 被关掉了，请先用能进 Bootloader 的固件，或短接主控的 BOOT0 再上电。

## 7. 自行编译固件

固件源码开源在 [github.com/micahyy/czm_qmk](https://github.com/micahyy/czm_qmk)，编译命令：

    make czmao/b70_ds21_encoder:via

编译产物为 `.bin`，按上一节方法烧录。仓库的 GitHub Actions 也会自动编译，固件可在 Actions 的 Artifact（`firmware-b70_ds21_encoder`）里下载。

## 8. 常见问题

**Q：VIA 识别不到键盘？**
A：先确认 VIA 是网页版（支持 WebHID 的 Chrome / Edge），且在 **Design** 标签加载了 `czmao_ds21R1.json`。仍不行就换接口或换线，确认键盘没有被其他软件独占。

**Q：旋钮方向反了？**
A：固件里旋钮方向是整体翻转的。可以在 VIA 里把对应旋钮的顺 / 逆时针位置互换，也可以改 `config.h` 里的 `ENCODER_DIRECTION_FLIP` 后重新编译。

**Q：在 VIA 里看不到旋钮的位置？**
A：旋钮占用的是 row 6 / row 7 的 8 个虚拟位，VIA 键位图的最下面两排就是它们，滚动到最下方即可看到。

**Q：改键乱了想恢复？**
A：长按 `/` 进入第 2 层，再按 `5` 号位（恢复出厂设置 `EE_CLR`），清空 EEPROM 后回到默认键位。

**Q：灯不亮？**
A：先按第 2 层的 RGB 开关（长按 `/` 后按 `7`）；仍不亮检查亮度是否被调到 0（亮度 + 在同一层的 `-` 位）。

---

[QQ 交流群]

    677654482

---

## 📥 固件与源码下载

- 固件源码（QMK）：[github.com/micahyy/czm_qmk](https://github.com/micahyy/czm_qmk)（PCB 路径 `keyboards/czmao/b70_ds21_encoder`）
- VIA 键位定义：`czmao_ds21R1.json`（仓库 `keyboards/czmao/b70_ds21_encoder/keymaps/via/`）
- 编译好的固件：仓库 GitHub Actions 的 Artifact `firmware-b70_ds21_encoder`

烧录方法见上文[第 6 节「固件烧录」](#_6-固件烧录)。
