---
title: CZMAO 3000 (Cherry G80-3000 replica)
status: stable
updated: 2026-11-04
---

# CZMAO 3000 (Cherry G80-3000 replica)

108-key full-size mechanical keyboard · USB wired Type-C · QMK + VIA remapping · WS2812 RGB

> The CZMAO 3000 is a full-size (108-key, with numpad) replica of the classic Cherry G80-3000. It uses an STM32F103 controller, on-board WS2812 RGB (per-key / underglow) driven by RGB Matrix, and runs QMK firmware with VIA remapping. This page is the manual for the assembled keyboard; the PCB modding notes live at [G80-3000 mod PCB](/en/1_PCB/g80_3000).

## 1. Overview

| Spec | Value |
| :------- | :---------------------- |
| Keys | 108 keys, full-size (with numpad) |
| Layout | Standard 108-key full-size |
| Connection | USB wired only (Type-C, C2C capable) |
| Controller | STM32F103 |
| Bootloader | stm32duino (app offset 0x2000 = 8KB) |
| Port | Type-C |
| Firmware | QMK (open source) |
| Remapping | VIA (web driver) |
| RGB | WS2812, per-key/underglow, RGB Matrix, default effect "cycle up/down" |
| Indicators | Caps / Num / Scroll Lock shown via per-key RGB; FN-layer active has a layer indicator |
| Matrix | 8 rows × 16 cols |
| Dynamic layers | 3 layers (dynamic keymap, VIA-editable) |
| N-key rollover | Supported (force_nkro) |
| Polling rate | 1K Hz (typical) |
| USB VID/PID | `0x7F89` / `0x4A36` |
| Source | [github.com/micahyy/czmao](https://github.com/micahyy/czmao) |

## 2. Indicators & status

- **Caps Lock**: solid white when ON (its key RGB lights up).
- **Num Lock**: solid white when ON; when OFF the numpad `8/4/2/6` become Up/Left/Down/Right arrows (see §7).
- **Scroll Lock**: solid white when ON.
- **FN-layer indicator**: when you hold the FN key, designated LEDs light up white as a hint.
- These are driven by `rgb_matrix_indicators_advanced_user` for status only; they do not follow the animated RGB effects.

## 3. Shortcuts (FN layer)

The keyboard has a dedicated **FN key** on the right (between Right Win and Right Ctrl; there is also an `FN8` key above Right Shift with the same function). Hold FN and press the corresponding key to trigger:

| Function | Description | Note |
| :-- | :-- | :-- |
| Light on/off | Toggle RGB on / off | Short-press the FN-layer key |
| Effect switch | Cycle through effects (37 total) | Loops |
| NKRO toggle | N-key rollover / 6KRO switch | `NK_TOGG` |
| Enter Bootloader | Enter firmware flash mode | `QK_BOOT` |
| Factory reset | Clear VIA remap, restore default | `EE_CLR` (FN + `Esc` area) |
| Mute / Vol − / Vol + | Multimedia volume | `KC_MUTE` / `KC_VOLD` / `KC_VOLU` |
| Play/pause, Prev, Next | Media control | `KC_MPLY` / `KC_MPRV` / `KC_MNXT` |
| Calculator / My Computer | OS shortcuts | `KC_CALC` / `KC_MYCM` |
| Power | OS power key | `KC_PWR` |
| Caps Lock toggle | Toggle caps lock | `CL_TOGG` |
| Ctrl / GUI swap | Swap Ctrl / Win modifiers | `CG_TOGG` / `GU_TOGG` |

> Exact key positions follow the silkscreen; the table is grouped by function for quick reference.

## 4. RGB effects

- **Default effect**: `cycle_up_down` (up/down gradient loop), on at power-up.
- **Count**: 37 dynamic effects enabled (gradient, breathing, rainbow, raindrops, ripple, reactive, etc.).
- **Brightness**: firmware cap `max_brightness = 160` (~63% duty) to avoid overheating the LEDs.
- **Customize via**:
  - Private online driver (recommended, no JSON): [via.micah.vip](https://via.micah.vip/) (CN) / [micahyy.github.io](https://micahyy.github.io/) (overseas)
  - Official VIA guide: [Using VIA](/en/6_guide/6.1_VIA)
- Effects are driven by `rgb_matrix`; the WS2812 data line is on `B13`.

## 5. Remapping

CZMAO 3000 supports VIA remapping:

1. Open [via.micah.vip](https://via.micah.vip/) (or [micahyy.github.io](https://micahyy.github.io/)) in a browser.
2. Connect the keyboard over Type-C (wired only; VIA does not work over other modes).
3. Once detected, drag keys on the **KEYMAP** tab and tune RGB on the **LIGHTING** tab.
4. Changes are saved to the keyboard EEPROM (persist across power cycles). To revert, use the FN-layer "Factory reset".

Advanced users can edit the open-source firmware and compile it (see §1 Source).

## 6. Firmware upgrade

**Bootloader**: stm32duino. The application starts at `0x08002000` (8KB flash offset); the first 8KB is the bootloader region.

**Full image**: the factory full image (bootloader + app) can be flashed from the flash base address (`0x08000000`).

**Enter Bootloader (flash mode)**:

- Use the FN-layer "Enter Bootloader" combo (`QK_BOOT`) — the keyboard re-enumerates as an STM32 device; or
- Use the reset method printed on the PCB silkscreen (follow the silkscreen).

**Flashing tool**: [QMK Toolbox](https://github.com/qmk/qmk_toolbox/releases) (auto-detects stm32duino), or write the full/app firmware with an STM32 flasher.

> To update the app only, flash to the `0x08002000` offset (app region) — no need to rewrite the bootloader. For a full chip write, use the full image.

## 7. Notes

- **Cable**: use a data-capable Type-C cable; a charge-only cable may prevent detection.
- **Num Lock**: the numpad belongs to the numeric region by default — **Num Lock must be ON** to type digits; when OFF, numpad `8/4/2/6` become arrow keys.
- **Num Lock follows the PC**: the state reflects the PC's current lock state; toggle it with the Num Lock key (or another keyboard).
- **RGB brightness**: the firmware caps max brightness (160/255); do not push it to maximum to avoid LED overheating.
- **VIA vs FN layer**: VIA remapping only affects the default layer (Layer 0); the FN layer (Layer 1) shortcuts are fixed in firmware and are not VIA-editable.

## 8. Troubleshooting

| Symptom | Possible cause | Fix |
| :-- | :-- | :-- |
| Numpad won't type digits | Num Lock OFF, keys mapped to arrows | Turn on Num Lock (press Num Lock, or toggle from another keyboard) |
| Keyboard totally unresponsive | Stuck in bootloader / bad USB contact | Re-plug USB; make sure it's not held in bootloader mode |
| VIA can't detect keyboard | Non-data cable / not wired / page not authorized | Swap cable, confirm wired connection, click "Authorize device" |
| LEDs off | RGB toggled off via FN layer | Re-enable with the FN-layer light on/off combo |
| Want to revert remap | — | FN-layer "Factory reset" clears VIA config |

## 9. Specifications

| Spec | Value |
| :------- | :---------------------- |
| Layout | 108-key full-size (with numpad) |
| Connection | USB wired only |
| Port | Type-C (C2C capable) |
| Controller | STM32F103 |
| Bootloader | stm32duino (app @ 0x08002000) |
| Firmware | QMK |
| Remapping | VIA (web driver) |
| RGB | WS2812, RGB Matrix, 37 effects, default cycle_up_down, max brightness 160 |
| Indicators | Caps / Num / Scroll Lock RGB status + FN-layer indicator |
| Matrix | 8 rows × 16 cols |
| Dynamic layers | 3 |
| N-key rollover | Supported (force_nkro) |
| Polling rate | 1K Hz |
| USB VID/PID | 0x7F89 / 0x4A36 |
| Source open | Yes (github.com/micahyy/czmao) |

---

**QQ group**

677654482

---

## 📥 Firmware download

| File | Version | Date | Note |
| :-- | :-- | :-- | :-- |
| Factory full image (bootloader + app) | factory | — | Flash from flash base address |
| App firmware (app only, @ 0x08002000) | factory | — | For stm32duino bootloader update |

Source and build instructions: [github.com/micahyy/czmao](https://github.com/micahyy/czmao). Remapping and RGB tuning use [via.micah.vip](https://via.micah.vip/). For a specific firmware version or a merged full / HEX file, contact your seller or the QQ group `677654482`.
