# QMK键值

整理一些VIA改建常用的键值

Quantum Keycodes

See also: Quantum Keycodes

|Key|	Aliases	|Description|说明|
|-|-|-|-|
|QK_BOOTLOADER|	QK_BOOT	|Put the keyboard into bootloader mode for flashing|进入bootloader/刷机模式|
|QK_DEBUG_TOGGLE|	DB_TOGG|	Toggle debug mode
|QK_CLEAR_EEPROM|	EE_CLR	|Reinitializes the keyboard's EEPROM (persistent memory)|清除缓存=恢复出厂设置
|QK_MAKE	|	|Sends qmk compile -kb (keyboard) -km (keymap), or qmk flash if shift is held. Puts keyboard into bootloader mode if shift & control are held
|QK_REBOOT|	QK_RBT|	Resets the keyboard. Does not load the bootloader


| Key | Aliases | Description |
| --- | ------- | --- |
| `QK_BOOTLOADER` | `QK_BOOT` | Put the keyboard into bootloader mode for flashing |
| `QK_DEBUG_TOGGLE` | `DB_TOGG` | Toggle debug mode |
| `QK_CLEAR_EEPROM` | `EE_CLR` | Reinitializes the keyboard's EEPROM (persistent memory) |
| `QK_MAKE` | | Sends `qmk compile -kb (keyboard) -km (keymap)`, or `qmk flash` if shift is held. Puts keyboard into bootloader mode if shift & control are held |
| `QK_REBOOT` | `QK_RBT` | Resets the keyboard. Does not load the bootloader |