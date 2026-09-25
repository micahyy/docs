# USB_EN 桌面小控制器（b43_huben）

5 键 + 1 个旋钮的桌面控制器 PCB · USB 有线单模 · QMK 固件 · VIA 改键

> b43_huben（USB_EN）是一块**桌面小控制器** PCB：主控 STM32F103CBT6（Blue Pill），3 列 × 3 行矩阵，实体只有 5 个媒体键 + 1 个 EC11 旋钮，用来做桌面上的音量 / 播放控制盒。旋钮占用 2 个虚拟键位，**顺 / 逆时针都能在 VIA 里单独改键**。固件为 QMK，开源，支持 VIA 在线实时改键。

## 1. 基本参数

| 规格 | 参数 |
| :------- | :---------------------- |
| PCB 型号 | `b43_huben`（USB_EN） |
| 按键数量 | 5 个实体键 + 1 个旋钮 |
| 矩阵 | 3 列 × 3 行（COL2ROW） |
| 连接模式 | USB 有线单模 |
| 接口 | Type-C（支持 C2C 线） |
| 主控 | STM32F103CBT6（Blue Pill） |
| 旋钮 | 1 个 EC11 增量编码器（C13 / C14，步进 4） |
| USB VID / PID | `0x7F89` / `0x4B43` |
| 灯光 | WS2812 轴灯 @ B13（固件定义 8 个灯位） |
| 层数 | 4 层（0–3，另预留第 7 层） |
| 全键无冲 | 支持（NKRO） |
| 回报率 | 1000 Hz |
| 固件平台 | QMK（开源） |
| 改键工具 | VIA 在线改键 |
| 源代码 | [github.com/micahyy/czm_qmk](https://github.com/micahyy/czm_qmk) |

## 2. 硬件接口与引脚（PCB 设计）

| 功能 | 引脚 / 参数 |
| :--- | :--- |
| 矩阵 | 3 行 × 3 列（COL2ROW） |
| 旋钮 A / B 相 | C13 / C14 |
| 旋钮步进 | 4（`ENCODER_RESOLUTION`） |
| WS2812 数据脚 | B13 |
| Bootloader | stm32duino |

### 2.1 旋钮虚拟键位

固件 LAYOUT 共 7 个位置，其中 **row 2 的 ENL / ENR 两个位置没有实体轴**，是留给旋钮的虚拟位：

| 旋钮 | 顺时针（CW） | 逆时针（CCW） |
| :--: | :--- | :--- |
| 旋钮 1 | `ENR` | `ENL` |

> 默认这两个位置是 **音量 + / 音量 -**。在 VIA 里它们就是普通键位，**每一层都能分别指定**，比如可以把某一层的旋钮改成翻页、缩放或调灯光。

## 3. 灯光说明

- WS2812 轴灯接在 **B13**，固件里定义了 8 个灯位。
- 灯效开关、切换、速度、色相都可以在第 1 / 2 层的快捷键里调，也可以在 VIA 的 Lighting 菜单里调。

## 4. 快捷键与层

5 个实体键都是 **轻按 / 长按双功能**（`LT`）：轻按是媒体功能，长按是切层。

### 4.1 第 0 层（默认层）

| 位置 | 轻按 | 长按 |
| :--- | :--- | :--- |
| 键 1 | 打开媒体播放器（`MSEL`） | 进入第 1 层 |
| 键 2 | 播放 / 暂停（`MPLY`） | 进入第 2 层 |
| 键 3 | 静音（`Mute`） | — |
| 键 4 | 上一曲（`MPRV`） | 进入第 3 层 |
| 键 5 | 下一曲（`MNXT`） | 进入第 4 层 |
| 旋钮 | 音量 + / 音量 - | — |

### 4.2 第 1 层（长按「媒体播放器」键，灯光调节）

| 位置 | 键 |
| :--- | :--- |
| 键 2（播放/暂停位） | RGB 开关（`RM_TOGG`） |
| 键 4（上一曲位） | 灯效速度 -（`RM_SPDD`） |
| 键 5（下一曲位） | 灯效速度 +（`RM_SPDU`） |
| 旋钮逆 / 顺 | 色相 -（`RM_HUED`） / 色相 +（`RM_HUEU`） |

### 4.3 第 2 层（长按「播放/暂停」键）

| 位置 | 键 |
| :--- | :--- |
| 键 1（媒体播放器位） | 切换灯效（`RM_NEXT`） |

> 第 7 层预留了 **恢复出厂设置**（`EE_CLR`），默认层没有直接入口，可在 VIA 里把某个键改到第 7 层来用，或重新刷一次固件即可回到默认键位。

## 5. VIA 改键

1. 用 USB 线接好键盘，打开 VIA：[国内服务器](https://via.micah.vip/) ｜ [海外服务器](https://micahyy.github.io/)
2. 首次使用需要在 **Design（设计）** 标签加载本键盘的 JSON 定义文件
3. 加载后切回 **Configure（改键）** 标签即可实时改键，改完立即生效并保存在键盘里
4. 7 个位置都可改，其中 **ENL / ENR 就是旋钮的逆 / 顺时针**

VIA 使用教程见：[VIA 的使用](/zh/6_guide/6.1_VIA)

## 6. 固件烧录

本 PCB 使用 **stm32duino** bootloader：

1. **进入 Bootloader**：拔掉 USB 线，**按住左上角第一个键不放**，再插入 USB 线（QMK 的 Bootmagic Lite），此时进入 DFU 模式。
2. **烧录固件**：
   - 用 [QMK Toolbox](https://qmk.fm/toolbox/) 选择编译好的 `.bin` 文件点 Flash；或
   - 命令行：`dfu-util -a 2 -d 1EAF:0003 -D <固件>.bin`
3. 烧录完成后重新插拔 USB 线即可使用。

> 本 PCB 的出厂键位里没有 `QK_BOOT` 快捷键，进刷机模式请用上面「按住第一个键插线」的方式，或在 VIA 里把某个键改成 `QK_BOOT`。

## 7. 自行编译固件

固件源码开源在 [github.com/micahyy/czm_qmk](https://github.com/micahyy/czm_qmk)，编译命令：

    make czmao/b43_huben:via

仓库的 GitHub Actions 会自动编译，固件可在 Actions 的 Artifact（`firmware-b43_huben`）里下载。

## 8. 常见问题

**Q：VIA 识别不到键盘？**
A：请使用支持 WebHID 的 Chrome / Edge 打开 VIA，并确认已加载本键盘的 JSON 定义。仍不行就换接口或换线。

**Q：旋钮方向反了？**
A：在 VIA 里把 `ENL` / `ENR` 两个位置的功能互换即可。

**Q：媒体键在某些软件里没反应？**
A：媒体键走的是系统标准 Consumer Control，个别软件需要在自己的快捷键设置里开启「全局媒体键」支持。

**Q：想恢复默认键位？**
A：重新刷一次官方固件即可；或在 VIA 里改回默认布局。

---

[QQ 交流群]

    677654482

---

## 📥 固件与源码下载

- 固件源码（QMK）：[github.com/micahyy/czm_qmk](https://github.com/micahyy/czm_qmk)（PCB 路径 `keyboards/czmao/b43_huben`）
- 编译好的固件：仓库 GitHub Actions 的 Artifact `firmware-b43_huben`

烧录方法见上文[第 6 节「固件烧录」](#_6-固件烧录)。
