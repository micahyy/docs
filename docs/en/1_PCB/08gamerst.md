# Left-Handed Gaming Keypad (08gamerst)

35-key left-hand gaming keypad + 1 knob · USB wired · QMK firmware · VIA

> 08gamerst is the CZMao **left-hand gaming keypad** PCB: STM32F103CBT6 (Blue Pill), 6-row × 7-column matrix keeping the left-hand block (`ESC` / `F1`–`F4`, `` ` ``–`6`, the QWERT block) plus one EC11 knob at the bottom right. It comes in **two versions**: with two USB 2.0 HUB ports (plug in the receivers of your main keyboard and mouse and stand the pad up on a bracket) or without HUB. The knob uses virtual key positions, so **both directions can be remapped independently in VIA**. QMK firmware, open source, VIA-compatible.

## 1. Specifications

| Item | Value |
| :--- | :---- |
| PCB model | `08gamerst` (left-hand gaming keypad) |
| Keys | 35 keys + 1 knob |
| Matrix | 6 rows × 7 columns (COL2ROW) |
| Connection | USB wired (single mode) |
| Port | USB Type-C (C-to-C supported) |
| MCU | STM32F103CBT6 (Blue Pill) |
| Knob | 1 × EC11 encoder (A5 / A6, resolution 4) |
| USB HUB | Optional version with 2 × USB 2.0 HUB ports |
| USB VID / PID | `0x4E08` / `0x4E08` |
| Lighting | WS2812 per-key RGB @ B13, 34 LED positions |
| Default effect | `cycle_left_right` |
| Layers | 3 (0–2) |
| N-key rollover | Yes, on by default (`NK_TOGG` toggles it) |
| Polling rate | 1000 Hz |
| Firmware | QMK (open source) |
| Keymap tool | VIA (web) |
| Source code | [github.com/micahyy/czm_qmk](https://github.com/micahyy/czm_qmk) |

## 2. Hardware / pinout (PCB design)

| Function | Pin / value |
| :--- | :--- |
| Matrix rows | B4, A7, B0, B1, B10, B11 |
| Matrix cols | B15, A8, A9, A10, A15, B3, A4 |
| Diode direction | COL2ROW |
| Knob A / B | A5 / A6 (resolution 4) |
| WS2812 data pin | B13 |
| Bootloader | stm32duino |

### 2.1 Knob virtual key positions

The knob's CW / CCW map to the virtual positions **`VOLU` / `VOLD` on row 5** (`ENCODERS_MATRIX_MAP`) — the two right-most positions of the bottom row. They have no physical switch and are editable **per layer** in VIA (default: volume up / down).

## 3. Lighting

- WS2812 per-key RGB, 34 LED positions, default effect "cycle left/right", max brightness 180.
- **CapsLock indicator**: LED 18 lights white while CapsLock is on.
- **Layer indicator**: the whole board changes color per layer — layer 1 red, 2 green, 3 blue, 4 pink, 5 yellow, 6 purple, 7 white.
- Everything can be adjusted with `FN + ALT + key` (below) or in the VIA **Lighting** tab.

## 4. Layers and shortcuts

3 layers (0–2):

| Action | Result |
| :--- | :--- |
| Hold `FN` (2nd key from the left on the bottom row) | Layer 1 |
| Hold `FN` and then hold `ALT` | Layer 2 (`FN + ALT + key`) |

### 4.1 Layer 0 (default)

| Row | Keys |
| :--- | :--- |
| 1st | `ESC`, `F1`, `F2`, `F3`, `F4`, `Mute` |
| 2nd | `` ` ``, `1`, `2`, `3`, `4`, `5`, `6` |
| 3rd | `Tab`, `Q`, `W`, `E`, `R`, `T` |
| 4th | `Caps`, `A`, `S`, `D`, `F`, `G` |
| 5th | `LShift`, `Z`, `X`, `C`, `V`, `B` |
| 6th | `LCtrl`, `FN`, `LAlt`, `Space`, knob (`Vol+` / `Vol-`) |

### 4.2 Layer 2 (`FN + ALT` — lighting & maintenance)

| Shortcut | Function |
| :--- | :--- |
| `FN + ALT + LShift` | RGB toggle (`RM_TOGG`) |
| `FN + ALT + Z` | Next effect (`RM_NEXT`) |
| `FN + ALT + W` / `FN + ALT + S` | Hue + (`RM_HUEU`) |
| `FN + ALT + X` | Hue - (`RM_HUED`) |
| `FN + ALT + E` / `FN + ALT + D` | Saturation + (`RM_SATU`) |
| `FN + ALT + C` | Saturation - (`RM_SATD`) |
| `FN + ALT + Q` / `FN + ALT + F` | Brightness + (`RM_VALU`) |
| `FN + ALT + V` | Brightness - (`RM_VALD`) |
| `FN + ALT + G` | Effect speed + (`RM_SPDU`) |
| `FN + ALT + B` | Effect speed - (`RM_SPDD`) |
| `FN + ALT + Tab` | NKRO toggle (on by default) |
| `FN + ALT + ESC` | **Factory reset** (`EE_CLR`) |
| `FN + ALT + Mute` | **Bootloader** (`QK_BOOT`) |

> `Mute` is the knob position or F5 depending on the soldered layout.

## 5. VIA

1. Connect over USB and open VIA: [CN server](https://via.micah.vip/) ｜ [GitHub Pages](https://micahyy.github.io/)
2. Load the keyboard definition JSON in the **Design** tab on first use
3. Switch to **Configure** and remap — changes apply instantly and are stored on the keyboard
4. All 37 positions are editable; **`VOLU` / `VOLD` on the bottom row are the knob**

See also: [Using VIA](/en/6_guide/6.1_VIA)

## 6. Flashing

The PCB uses the **stm32duino** bootloader:

1. **Enter bootloader** (either way):
   - Shortcut: `FN + ALT + Mute` (`QK_BOOT`)
   - Or: unplug USB, **hold the top-left key (ESC)** and plug back in (QMK Bootmagic Lite)
2. **Flash**:
   - [QMK Toolbox](https://qmk.fm/toolbox/) with the compiled `.bin`; or
   - CLI: `dfu-util -a 2 -d 1EAF:0003 -D <firmware>.bin`
3. Re-plug when done.

## 7. Building the firmware

    make czmao/08gamerst:via

Prebuilt binaries: GitHub Actions artifact `firmware-08gamerst`.

## 8. FAQ

**Q: VIA does not detect the board?**
A: Use a WebHID-capable browser (Chrome / Edge) and load the definition JSON. Also try another port or cable.

**Q: The receiver plugged into the HUB does not work?**
A: The HUB is a plain USB 2.0 expansion and needs the keyboard's own USB composite device to be enumerated first; connect the keypad, then plug the receiver into the HUB port.

**Q: The knob turns the wrong way?**
A: Swap the `VOLU` and `VOLD` functions in VIA.

**Q: How do I reset the keymap?**
A: `FN + ALT + ESC` (`EE_CLR`) clears the EEPROM back to defaults.

**Q: NKRO is not recognized on some machines?**
A: Press `FN + ALT + Tab` to turn NKRO off (it is on by default); some old mainboards / BIOS only support 6KRO.

---

QQ group: `677654482`

---

## 📥 Firmware & source

- Firmware source (QMK): [github.com/micahyy/czm_qmk](https://github.com/micahyy/czm_qmk) (PCB path `keyboards/czmao/08gamerst`)
- Prebuilt firmware: GitHub Actions artifact `firmware-08gamerst`

See [section 6 "Flashing"](#_6-flashing) for flashing instructions.
