# QMK键值

整理一些VIA改建常用的键值

## Quantum Keycodes 

功能按键


| Key | Aliases | Description |说明|
| --- | ------- | --- |---|
| `QK_BOOTLOADER` | `QK_BOOT` | Put the keyboard into bootloader mode for flashing |进入bootloader/刷机模式|
| `QK_DEBUG_TOGGLE` | `DB_TOGG` | Toggle debug mode |
| `QK_CLEAR_EEPROM` | `EE_CLR` | Reinitializes the keyboard's EEPROM (persistent memory) |清除缓存=恢复出厂设置 |
| `QK_MAKE` | | Sends `qmk compile -kb (keyboard) -km (keymap)`, or `qmk flash` if shift is held. Puts keyboard into bootloader mode if shift & control are held |
| `QK_REBOOT` | `QK_RBT` | Resets the keyboard. Does not load the bootloader |重启键盘，不进入boot|

## Audio Keys

控制蜂鸣器

| Key | Aliases | Description |
| --- | ------- | --- |
| `QK_AUDIO_ON` | `AU_ON` | Turns on Audio Feature |
| `QK_AUDIO_OFF` | `AU_OFF` | Turns off Audio Feature |
| `QK_AUDIO_TOGGLE` | `AU_TOGG` | Toggles Audio state |
| `QK_AUDIO_CLICKY_TOGGLE` | `CK_TOGG` | Toggles Audio clicky mode |
| `QK_AUDIO_CLICKY_ON` | `CK_ON` | Turns on Audio clicky mode |
| `QK_AUDIO_CLICKY_OFF` | `CK_OFF` | Turns on Audio clicky mode |
| `QK_AUDIO_CLICKY_UP` | `CK_UP` | Increases frequency of the clicks |
| `QK_AUDIO_CLICKY_DOWN` | `CK_DOWN` | Decreases frequency of the clicks |
| `QK_AUDIO_CLICKY_RESET` | `CK_RST` | Resets frequency to default |
| `QK_MUSIC_ON` | `MU_ON` | Turns on Music Mode |
| `QK_MUSIC_OFF` | `MU_OFF` | Turns off Music Mode |
| `QK_MUSIC_TOGGLE` | `MU_TOGG` | Toggles Music Mode |
| `QK_MUSIC_MODE_NEXT` | `MU_NEXT` | Cycles through the music modes |
| `QK_AUDIO_VOICE_NEXT` | `AU_NEXT` | Cycles through the audio voices |
| `QK_AUDIO_VOICE_PREVIOUS` | `AU_PREV` | Cycles through the audio voices in reverse |

## Auto Shift

长按自动输出大写功能

| Key | Aliases | Description | 功能说明 |
| --- | ------- | --- | --- |
| `QK_AUTO_SHIFT_DOWN` | `AS_DOWN` | Lower the Auto Shift timeout variable (down) | 降低长按判定时间阈值（更快触发大写） |
| `QK_AUTO_SHIFT_UP` | `AS_UP` | Raise the Auto Shift timeout variable (up) | 提高长按判定时间阈值（需要按更久才能出大写） |
| `QK_AUTO_SHIFT_REPORT` | `AS_RPT` | Report your current Auto Shift timeout value | 报告当前设定的阈值时间（单位：毫秒） |
| `QK_AUTO_SHIFT_ON` | `AS_ON` | Turns on the Auto Shift Function | 开启 Auto Shift 功能 |
| `QK_AUTO_SHIFT_OFF` | `AS_OFF` | Turns off the Auto Shift Function | 关闭 Auto Shift 功能 |
| `QK_AUTO_SHIFT_TOGGLE` | `AS_TOGG` | Toggles the state of the Auto Shift feature | 一键切换 Auto Shift 功能的开/关状态 |


## Autocorrect

**功能说明**

Autocorrect（自动更正）是QMK的一项功能，用于**自动纠正常见的拼写错误**。

例如，如果你经常把 `teh` 误打成 `the`，可以配置自动更正规则。当你输入 `teh` 时，键盘会自动将其替换为 `the`，无需手动修改。

表格中的三个按键用于动态控制这个功能的开关状态，而不需要重新编译固件。

| Key | Aliases | Description | 功能说明 |
| --- | ------- | --- | --- |
| `QK_AUTOCORRECT_ON` | `AC_ON` | Turns on the Autocorrect feature. | 开启自动更正功能 |
| `QK_AUTOCORRECT_OFF` | `AC_OFF` | Turns off the Autocorrect feature. | 关闭自动更正功能 |
| `QK_AUTOCORRECT_TOGGLE` | `AC_TOGG` | Toggles the status of the Autocorrect feature. | 一键切换自动更正功能的开/关状态 |

## Backlighting

**功能说明**

Backlighting（背光）是QMK中用于控制键盘**按键背光照明**的功能。

背光通常指的是键盘按键下方的单色（通常是白色或其他固定颜色）LED照明。与RGB灯效不同，背光通常只有一种颜色，主要控制亮度和呼吸效果。

表格中的按键用于动态调节背光的开关、亮度级别和呼吸模式，无需重新编译固件。

| Key | Aliases | Description | 功能说明 |
| --- | ------- | --- | --- |
| `QK_BACKLIGHT_TOGGLE` | `BL_TOGG` | Turn the backlight on or off | 打开或关闭背光 |
| `QK_BACKLIGHT_STEP` | `BL_STEP` | Cycle through backlight levels | 循环切换背光亮度级别 |
| `QK_BACKLIGHT_ON` | `BL_ON` | Set the backlight to max brightness | 将背光设置为最大亮度 |
| `QK_BACKLIGHT_OFF` | `BL_OFF` | Turn the backlight off | 关闭背光 |
| `QK_BACKLIGHT_UP` | `BL_UP` | Increase the backlight level | 增加背光亮度 |
| `QK_BACKLIGHT_DOWN` | `BL_DOWN` | Decrease the backlight level | 降低背光亮度 |
| `QK_BACKLIGHT_TOGGLE_BREATHING` | `BL_BRTG` | Toggle backlight breathing | 切换背光呼吸效果（亮度渐变循环） |

## Wireless/Bluetooth

**功能说明**

Wireless/Bluetooth（无线/蓝牙）是QMK中用于控制键盘**无线输出模式切换**的功能。

这些按键可以让键盘在USB有线连接、蓝牙连接、2.4GHz无线连接之间切换，或者让键盘自动选择可用的连接方式。适用于支持多模连接的键盘。

**注意**：表格中标记为"not yet implemented"的功能尚未在QMK中完全实现，请以实际固件版本为准。

| Key | Aliases | Description | 功能说明 |
| --- | ------- | --- | --- |
| `QK_OUTPUT_AUTO` | `OU_AUTO` | Automatically switch to USB when plugged in, otherwise use wireless | 自动切换：插入USB时使用有线，否则使用无线 |
| `QK_OUTPUT_NEXT` | `OU_NEXT` | Cycle forwards through USB, Bluetooth, and 2.4GHz (when available) (not yet implemented) | 正向循环切换：USB → 蓝牙 → 2.4GHz（未完全实现） |
| `QK_OUTPUT_PREV` | `OU_PREV` | Cycle backwards through USB, Bluetooth, and 2.4GHz (when available) (not yet implemented) | 反向循环切换：2.4GHz → 蓝牙 → USB（未完全实现） |
| `QK_OUTPUT_NONE` | `OU_NONE` | Disable all output (not yet implemented) | 禁用所有输出（未完全实现） |
| `QK_OUTPUT_USB` | `OU_USB` | Output to USB only | 仅使用USB有线输出 |
| `QK_OUTPUT_2P4GHZ` | `OU_2P4G` | Output to 2.4GHz only (not yet implemented) | 仅使用2.4GHz无线输出（未完全实现） |
| `QK_OUTPUT_BLUETOOTH` | `OU_BT` | Output to Bluetooth only | 仅使用蓝牙输出 |
| `QK_BLUETOOTH_PROFILE_NEXT` | `BT_NEXT` | Move to the next Bluetooth profile (not yet implemented) | 切换到下一个蓝牙配置文件（未完全实现） |
| `QK_BLUETOOTH_PROFILE_PREV` | `BT_PREV` | Move to the previous Bluetooth profile (not yet implemented) | 切换到上一个蓝牙配置文件（未完全实现） |
| `QK_BLUETOOTH_UNPAIR` | `BT_UNPR` | Un-pair the current Bluetooth profile (not yet implemented) | 取消当前蓝牙配置文件的配对（未完全实现） |
| `QK_BLUETOOTH_PROFILE1` | `BT_PRF1` | Swap to Bluetooth profile #1 (not yet implemented) | 切换到蓝牙配置文件 #1（未完全实现） |
| `QK_BLUETOOTH_PROFILE2` | `BT_PRF2` | Swap to Bluetooth profile #2 (not yet implemented) | 切换到蓝牙配置文件 #2（未完全实现） |
| `QK_BLUETOOTH_PROFILE3` | `BT_PRF3` | Swap to Bluetooth profile #3 (not yet implemented) | 切换到蓝牙配置文件 #3（未完全实现） |
| `QK_BLUETOOTH_PROFILE4` | `BT_PRF4` | Swap to Bluetooth profile #4 (not yet implemented) | 切换到蓝牙配置文件 #4（未完全实现） |
| `QK_BLUETOOTH_PROFILE5` | `BT_PRF5` | Swap to Bluetooth profile #5 (not yet implemented) | 切换到蓝牙配置文件 #5（未完全实现） |

## Caps Word

**功能说明**

Caps Word（大写单词）是QMK中一项用于**临时启用大写锁定**的功能，与传统的Caps Lock不同。

传统Caps Lock开启后，所有字母都变成大写，直到手动关闭。而Caps Word的特点是：
- **自动结束**：当你输入空格、回车、标点符号或任何非字母字符时，Caps Word会自动关闭。
- **适用场景**：非常适合输入连续的大写单词或缩写（如 `QWERTY`、`USB`、`QMK`），输入完成后无需手动关闭大写。
- **与Caps Lock的区别**：Caps Word是临时的、自动结束的；Caps Lock是持久的、需要手动关闭的。

表格中的按键用于一键切换Caps Word功能的开/关状态。

| Key | Aliases | Description | 功能说明 |
| --- | ------- | --- | --- |
| `QK_CAPS_WORD_TOGGLE` | `CW_TOGG` | Toggles Caps Word | 一键切换Caps Word功能的开/关状态 |

## Dynamic Macros

**功能说明**

Dynamic Macros（动态宏）是QMK中一项**无需重新编译固件即可录制和回放宏**的功能。

传统宏需要在固件中预先编写好代码，然后重新刷写才能使用。而动态宏允许你在键盘上直接录制按键序列，然后随时回放，类似于某些游戏键盘或宏键盘的实时录制功能。

**使用方法：**
1. **开始录制**：按下 `DM_REC1` 或 `DM_REC2`，开始录制宏
2. **执行操作**：按下你想要录制的按键序列
3. **停止录制**：按下 `DM_RSTP` 停止录制
4. **回放宏**：按下 `DM_PLY1` 或 `DM_PLY2` 回放之前录制的宏

**特点：**
- 支持同时录制两个独立的宏（宏1和宏2）
- 宏内容存储在键盘的内存中，断电后可能丢失（取决于具体实现）
- 无需重新编译或刷写固件即可更改宏内容

| Key | Aliases | Description | 功能说明 |
| --- | ------- | --- | --- |
| `QK_DYNAMIC_MACRO_RECORD_START_1` | `DM_REC1` | Start recording Macro 1 | 开始录制宏1 |
| `QK_DYNAMIC_MACRO_RECORD_START_2` | `DM_REC2` | Start recording Macro 2 | 开始录制宏2 |
| `QK_DYNAMIC_MACRO_PLAY_1` | `DM_PLY1` | Replay Macro 1 | 回放宏1 |
| `QK_DYNAMIC_MACRO_PLAY_2` | `DM_PLY2` | Replay Macro 2 | 回放宏2 |
| `QK_DYNAMIC_MACRO_RECORD_STOP` | `DM_RSTP` | Finish the macro that is currently being recorded. | 停止当前正在录制的宏 |

## Grave Escape

**功能说明**

Grave Escape（重音符转义）是QMK中一项**将单个按键同时用作重音符(\`)和Escape(ESC)** 的功能。

在标准键盘布局中，左上角的按键通常是反引号/波浪号（\` 和 ~）。但在许多键盘（特别是60%或更小的布局）中，Escape键的位置往往被其他键取代，导致ESC需要挪到其他地方。

Grave Escape解决了这个问题：**同一个键按不同方式触发不同功能**。

**工作原理：**
- **按下时**：如果同时按住了Shift或GUI（Windows/Command键），则输出反引号（\`）或波浪号（~）
- **按下时**：如果没有按住任何修饰键，则输出Escape（ESC）

**实际效果：**
| 操作 | 输出 |
| --- | --- |
| 单独按一下 | Escape（ESC） |
| Shift + 按一下 | `~`（波浪号） |
| GUI/Win + 按一下 | \`（反引号） |

**适用场景：**
- 小尺寸键盘（如60%、40%）没有独立ESC键位置时
- 需要保留ESC功能，又不想放弃\`~键的用户
- HHKB布局风格的用户（原本就在那个位置放ESC）

| Key | Aliases | Description | 功能说明 |
| --- | ------- | --- | --- |
| `QK_GRAVE_ESCAPE` | `QK_GESC` | Escape when pressed, ` when Shift or GUI are held | 单独按时输出ESC；按住Shift或GUI时输出反引号(\`)或波浪号(~) |

## Joystick

**功能说明**

Joystick（摇杆）是QMK中用于**控制虚拟游戏摇杆或手柄按键**的功能。

通过启用QMK的摇杆功能，你可以将键盘上的按键映射为游戏手柄的摇杆方向或按钮，从而让键盘模拟一个游戏手柄。

**典型应用场景：**
- 在没有手柄的情况下，用键盘游玩支持手柄的游戏
- 自定义摇杆轴方向和按钮映射
- 配合其他按键实现复杂的游戏控制

**按键范围：**
- 摇杆按钮0-31：共32个可编程的虚拟摇杆按钮
- 摇杆轴方向：通常包括X轴、Y轴（以及可能的RX、RY、Z轴等），需要另外配置

| Key | Aliases | Description | 功能说明 |
| --- | ------- | --- | --- |
| `QK_JOYSTICK_BUTTON_0` | `JS_0` | Button 0 | 虚拟摇杆按钮0 |
| `QK_JOYSTICK_BUTTON_1` | `JS_1` | Button 1 | 虚拟摇杆按钮1 |
| `QK_JOYSTICK_BUTTON_2` | `JS_2` | Button 2 | 虚拟摇杆按钮2 |
| `QK_JOYSTICK_BUTTON_3` | `JS_3` | Button 3 | 虚拟摇杆按钮3 |
| `QK_JOYSTICK_BUTTON_4` | `JS_4` | Button 4 | 虚拟摇杆按钮4 |
| `QK_JOYSTICK_BUTTON_5` | `JS_5` | Button 5 | 虚拟摇杆按钮5 |
| `QK_JOYSTICK_BUTTON_6` | `JS_6` | Button 6 | 虚拟摇杆按钮6 |
| `QK_JOYSTICK_BUTTON_7` | `JS_7` | Button 7 | 虚拟摇杆按钮7 |
| `QK_JOYSTICK_BUTTON_8` | `JS_8` | Button 8 | 虚拟摇杆按钮8 |
| `QK_JOYSTICK_BUTTON_9` | `JS_9` | Button 9 | 虚拟摇杆按钮9 |
| `QK_JOYSTICK_BUTTON_10` | `JS_10` | Button 10 | 虚拟摇杆按钮10 |
| `QK_JOYSTICK_BUTTON_11` | `JS_11` | Button 11 | 虚拟摇杆按钮11 |
| `QK_JOYSTICK_BUTTON_12` | `JS_12` | Button 12 | 虚拟摇杆按钮12 |
| `QK_JOYSTICK_BUTTON_13` | `JS_13` | Button 13 | 虚拟摇杆按钮13 |
| `QK_JOYSTICK_BUTTON_14` | `JS_14` | Button 14 | 虚拟摇杆按钮14 |
| `QK_JOYSTICK_BUTTON_15` | `JS_15` | Button 15 | 虚拟摇杆按钮15 |
| `QK_JOYSTICK_BUTTON_16` | `JS_16` | Button 16 | 虚拟摇杆按钮16 |
| `QK_JOYSTICK_BUTTON_17` | `JS_17` | Button 17 | 虚拟摇杆按钮17 |
| `QK_JOYSTICK_BUTTON_18` | `JS_18` | Button 18 | 虚拟摇杆按钮18 |
| `QK_JOYSTICK_BUTTON_19` | `JS_19` | Button 19 | 虚拟摇杆按钮19 |
| `QK_JOYSTICK_BUTTON_20` | `JS_20` | Button 20 | 虚拟摇杆按钮20 |
| `QK_JOYSTICK_BUTTON_21` | `JS_21` | Button 21 | 虚拟摇杆按钮21 |
| `QK_JOYSTICK_BUTTON_22` | `JS_22` | Button 22 | 虚拟摇杆按钮22 |
| `QK_JOYSTICK_BUTTON_23` | `JS_23` | Button 23 | 虚拟摇杆按钮23 |
| `QK_JOYSTICK_BUTTON_24` | `JS_24` | Button 24 | 虚拟摇杆按钮24 |
| `QK_JOYSTICK_BUTTON_25` | `JS_25` | Button 25 | 虚拟摇杆按钮25 |
| `QK_JOYSTICK_BUTTON_26` | `JS_26` | Button 26 | 虚拟摇杆按钮26 |
| `QK_JOYSTICK_BUTTON_27` | `JS_27` | Button 27 | 虚拟摇杆按钮27 |
| `QK_JOYSTICK_BUTTON_28` | `JS_28` | Button 28 | 虚拟摇杆按钮28 |
| `QK_JOYSTICK_BUTTON_29` | `JS_29` | Button 29 | 虚拟摇杆按钮29 |
| `QK_JOYSTICK_BUTTON_30` | `JS_30` | Button 30 | 虚拟摇杆按钮30 |
| `QK_JOYSTICK_BUTTON_31` | `JS_31` | Button 31 | 虚拟摇杆按钮31 |

## Key Lock

**功能说明**

Key Lock（按键锁定）是QMK中一项**将下一个按下的键锁定为持续按住状态**的功能。

**工作原理：**
1. 按下 `QK_LOCK` 键
2. 然后按下你想要锁定的目标键（比如 `KC_A`）
3. 目标键会被锁定，**如同一直按住该键不松手**
4. 再次按下同一个被锁定的键，即可解除锁定

**典型应用场景：**
- **游戏中的持续移动**：锁定 `W` 键让人物持续前进，无需一直按着
- **演示或展示**：锁定某个修饰键（如Shift）来演示大写输入效果
- **辅助输入**：锁定 `Ctrl` 或 `Alt` 键，然后单手操作鼠标进行多选等操作
- **减少手指疲劳**：需要长时间按住某个键时，用锁定代替持续按压

**注意事项：**
- 一次只能锁定一个键
- 锁定状态下按其他键不受影响
- 再次按下被锁定的键即可解锁
- 切换层或重置键盘也会清除锁定状态

| Key | Description | 功能说明 |
| --- | --- | --- |
| `QK_LOCK` | Hold down the next key pressed, until the key is pressed again | 锁定下一个按下的键，使其保持按住状态，直到再次按下该键解锁 |

## Layer Lock（层锁定）

**功能说明**

Layer Lock（层锁定）是QMK中一项**将当前最高活动层锁定，使其保持激活状态**的功能。

**与普通层切换的区别：**

| 功能 | 行为 | 典型按键 |
| --- | --- | --- |
| `MO(layer)` | 按住时临时切换层，松开即恢复 | 类似Shift键 |
| `TG(layer)` | 点击一次切换层，再点击一次切回 | 类似Caps Lock |
| `Layer Lock` | 锁定当前最高活动层，直到按下同一键或切换层 | 更精确的层锁定 |

**工作原理：**
1. 当某个层处于激活状态（例如通过 `MO` 或 `TG` 切换到的层）
2. 按下 `QK_LAYER_LOCK`（或 `QK_LLCK`）
3. 当前最高活动层被**锁定**，即使松开原本切换层的按键，该层仍然保持激活
4. 再次按下 `QK_LAYER_LOCK`，或主动切换到其他层，即可解锁

**典型应用场景：**
- **临时层的持久化**：原本需要一直按住 `FN` 键才能使用的功能层，用Layer Lock锁定后就可以松开手指，持续使用该层的功能
- **多任务操作**：锁定数字层或符号层，连续输入数字或符号，无需反复按切换键
- **游戏场景**：锁定游戏功能层，使一组游戏专用键持续生效
- **辅助功能**：为残障用户提供无需持续按压的层切换方案

**优势：**
- 比 `TG(layer)` 更灵活：不固定锁定特定层，而是锁定当前正在使用的层
- 与临时层切换键（如 `MO`、`LT`）配合使用效果最佳
- 按一下锁定，再按一下解锁，操作简单直观

| Key | Aliases | Description | 功能说明 |
| --- | ------- | --- | --- |
| `QK_LAYER_LOCK` | `QK_LLCK` | Locks or unlocks the highest layer | 锁定或解锁当前最高活动层 |