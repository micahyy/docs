# DS21 4-Knob (b70_ds21_encoder)

17-key + 4-knob numpad PCB · USB wired · QMK firmware · VIA

> b70_ds21_encoder is the **four-knob version** of the CZMao DS21 numpad: STM32F103CBT6 (Blue Pill), 4-column × 8-row matrix, four EC11 encoders mapped to virtual key positions, so **every knob's CW / CCW turn can be remapped independently in VIA**. Per-key WS2812 RGB (south-facing). QMK firmware, open source, VIA-compatible.

## 1. Specifications

| Item | Value |
| :--- | :---- |
| PCB model | `b70_ds21_encoder` (DS21 encoder edition) |
| Keys | 17 keys + 4 knobs |
| Matrix | 4 columns × 8 rows (COL2ROW) |
| Connection | USB wired (single mode) |
| Port | USB Type-C (C-to-C supported) |
| MCU | STM32F103CBT6 (Blue Pill) |
| Knobs | 4 × EC11 incremental encoder |
| USB VID / PID | `0x4A07` / `0x4A07` |
| VIA device name | `mao_ds21_R1` |
| Lighting | WS2812 per-key RGB @ B13 (south-facing), 22 LED positions |
| Default effect | `cycle_left_right` |
| Layers | 4 (0–3, editable in VIA) |
| N-key rollover | Yes (NKRO, toggleable) |
| Polling rate | 1000 Hz |
| Firmware | QMK (open source) |
| Keymap tool | VIA (web) |
| Source code | [github.com/micahyy/czm_qmk](https://github.com/micahyy/czm_qmk) |

## 2. Hardware / pinout (PCB design)

| Function | Pin / value |
| :--- | :--- |
| Matrix rows | B11, B10, B12, B1, C15, A0, B9, B8 |
| Matrix cols | B7, B6, B5, B4 |
| Diode direction | COL2ROW |
| WS2812 data pin | B13 |
| Bootloader | stm32duino |

### 2.1 Knob pins and virtual key positions

| Knob | pin_a | pin_b | CW | CCW |
| :--: | :---: | :---: | :--- | :--- |
| Knob 1 | A1 | A2 | row 6 / col 0 | row 6 / col 1 |
| Knob 2 | A3 | A4 | row 6 / col 2 | row 6 / col 3 |
| Knob 3 | A5 | A6 | row 7 / col 0 | row 7 / col 1 |
| Knob 4 | A7 | B0 | row 7 / col 2 | row 7 / col 3 |

> Rows 6 and 7 are **virtual positions with no physical switch** — they exist for the 4 knobs (the firmware LAYOUT has 30 positions: 22 key positions + 8 knob positions).
> In VIA these 8 positions are the knob actions and can be set **per layer**, e.g. volume on layer 0, page up/down on layer 1.

Knob direction is flipped globally (`ENCODER_DIRECTION_FLIP`), 4 steps per detent (`ENCODER_RESOLUTION`).

## 3. Lighting

- WS2812 per-key RGB, 22 LED positions, default effect "cycle left/right", max brightness 180.
- **NumLock indicator**: LED 5 lights white while NumLock is on.
- **Layer indicator**: LEDs 16 / 17 / 18 light white on layers 1 / 2 / 3.
- Effect, brightness, speed and color can be changed from the VIA **Lighting** tab or with the shortcuts below.

## 4. Layers and shortcuts

4 layers (0–3). Extra layers are reached by **holding** the operator keys in the top-left of the numpad (tap = the operator itself, hold = layer).

| Action | Result |
| :--- | :--- |
| Hold `Num` | Layer 1 (tap = NumLock) |
| Hold `/` (PSLS) | Layer 2 (lighting / maintenance) |
| Hold `*` (PAST) | Layer 3 |
| Hold `-` (PMNS) | Layer 4 |

### 4.1 Layer 0 (default)

| Area | Keys |
| :--- | :--- |
| Top row | `ESC`, `Calc`, `Play/Pause`, `Backspace`, `Mute` |
| Operator row | `Num`, `/`, `*`, `-` |
| Numpad | `7` `8` `9` / `4` `5` `6` `+` / `1` `2` `3` `Enter` / `0` (2u) `.` |
| Knobs (default) | Knob 1: `Del` / `Backspace`; Knob 2: `PgUp` / `PgDn`; Knob 3: prev / next track; Knob 4: volume - / + |

### 4.2 Layer 1 (hold `Num`)

| Position | Key |
| :--- | :--- |
| `/` | `Num` |
| `*` | Layer 2 (`MO(2)`) |
| `-` | `Calc` |
| `8` | Volume + |
| `4` / `5` / `6` | Prev / Play-Pause / Next |
| `2` | Volume - |
| `0` | `Mute` |

### 4.3 Layer 2 (hold `/` — lighting & maintenance)

| Position | Key |
| :--- | :--- |
| `-` | Brightness + (`RM_VALU`) |
| `7` | RGB toggle (`RM_TOGG`) |
| `8` | Saturation + (`RM_SATU`) |
| `4` | Hue - (`RM_HUED`) |
| `5` | **Factory reset** (`EE_CLR`) |
| `6` | Hue + (`RM_HUEU`) |
| `9` | Brightness - (`RM_VALD`) |
| `2` | Saturation - (`RM_SATD`) |
| `0` | Next effect (`RM_NEXT`) |

### 4.4 Layer 3 (hold `*`)

| Position | Key |
| :--- | :--- |
| `0` | NKRO toggle (`NK_TOGG`) |

## 5. VIA

1. Connect the board over USB and open VIA: [CN server](https://via.micah.vip/) ｜ [GitHub Pages](https://micahyy.github.io/)
2. On first use, load the keyboard definition in the **Design** tab: `czmao_ds21R1.json` (in `keyboards/czmao/b70_ds21_encoder/keymaps/via/` of the firmware repo)
3. Switch back to **Configure** and remap — changes apply instantly and are stored on the keyboard
4. All 30 positions are editable; **rows 6 and 7 are the 4 knobs**

See also: [Using VIA](/en/6_guide/6.1_VIA)

## 6. Flashing

The PCB uses the **stm32duino** bootloader:

1. **Enter bootloader**: unplug USB, **hold the top-left key (ESC)** and plug back in (QMK Bootmagic Lite). The board enters DFU and stops sending keys.
2. **Flash**:
   - [QMK Toolbox](https://qmk.fm/toolbox/): pick the compiled `.bin` and press Flash; or
   - CLI: `dfu-util -a 2 -d 1EAF:0003 -D <firmware>.bin`
3. Re-plug the USB cable when done.

## 7. Building the firmware

Source: [github.com/micahyy/czm_qmk](https://github.com/micahyy/czm_qmk)

    make czmao/b70_ds21_encoder:via

GitHub Actions builds it automatically; download from the `firmware-b70_ds21_encoder` artifact.

## 8. FAQ

**Q: VIA does not detect the board?**
A: Use a WebHID-capable browser (Chrome / Edge) and load `czmao_ds21R1.json` in the Design tab. Also try another port or cable.

**Q: The knob turns the wrong way?**
A: Swap the two knob positions in VIA, or change `ENCODER_DIRECTION_FLIP` in `config.h` and rebuild.

**Q: I cannot find the knob positions in VIA?**
A: They are rows 6 and 7 — the bottom two rows of the VIA keymap view.

**Q: My keymap is a mess, how do I reset?**
A: Hold `/` (layer 2) and press the `5` position (`EE_CLR`) to clear the EEPROM.

**Q: No light?**
A: Press the RGB toggle (hold `/`, then `7`); if it is already on, raise brightness (`-` position on the same layer).

---

QQ group: `677654482`

---

## 📥 Firmware & source

- Firmware source (QMK): [github.com/micahyy/czm_qmk](https://github.com/micahyy/czm_qmk) (PCB path `keyboards/czmao/b70_ds21_encoder`)
- VIA definition: `czmao_ds21R1.json`
- Prebuilt firmware: GitHub Actions artifact `firmware-b70_ds21_encoder`

See [section 6 "Flashing"](#_6-flashing) for flashing instructions.
