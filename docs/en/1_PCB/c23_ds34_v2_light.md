# DS34 v2 Light Numpad (c23_ds34_v2_light)

34-key + 1-knob numpad · USB wired · QMK firmware · VIA

> c23_ds34_v2_light is the **Light** variant of DS34 v2. It is **the same hardware** as `b23_ds34_v2` (STM32F103CBT6, 8 × 6 matrix, one knob, WS2812 @ B13). Two differences only: **USB PID `0x4C23`**, and a firmware **layer 3 filled with Ctrl+F1~F12 shortcuts**. The base numpad layout is identical to b23.

## 1. Specifications

| Item | Value |
| :--- | :---- |
| PCB model | `c23_ds34_v2_light` (DS34 v2 Light) |
| Keys | 34 keys + 1 knob |
| Matrix | 8 columns × 6 rows (COL2ROW) |
| Connection | USB wired (single mode) |
| Port | USB Type-C (C-to-C supported) |
| MCU | STM32F103CBT6 (Blue Pill) |
| Knob | 1 × EC11 encoder (B8 / B9, direction flipped) |
| USB VID / PID | `0x4C23` / `0x4C23` |
| Lighting | WS2812 per-key RGB @ B13, 33 LED positions |
| Default effect | `cycle_left_right` |
| Layers | 4 (0–3) |
| N-key rollover | Yes (NKRO) |
| Polling rate | 1000 Hz |
| Firmware | QMK (open source) |
| Keymap tool | VIA (web) |
| Source code | [github.com/micahyy/czm_qmk](https://github.com/micahyy/czm_qmk) |

## 2. Hardware / pinout (PCB design)

Identical to `b23_ds34_v2`:

| Function | Pin / value |
| :--- | :--- |
| Matrix | 6 rows × 8 columns (COL2ROW) |
| Knob A / B | B8 / B9 |
| WS2812 data pin | B13 |
| Bootloader | stm32duino |

The knob maps to the virtual positions **row 3 / col 0 and col 1**; editable per layer in VIA. Direction flipped (`ENCODER_DIRECTION_FLIP`).

## 3. Lighting

- WS2812 per-key RGB, 33 LED positions, default effect "cycle left/right".
- **NumLock indicator**: LED 9 lights white while NumLock is on.
- **Layer indicator**: the matching LED lights white on layers 1 / 2 / 3.

## 4. Layers and shortcuts

| Action | Result |
| :--- | :--- |
| Hold `FN` (4th key of the top row, the Pause position) | Layer 1 |
| On layer 1, press the `PgUp` position | **Switch** to layer 3 (`TO(3)` — stays there) |
| On layer 1, hold `↓` | Layer 3 temporarily (`MO(3)`) |
| On layer 2, press the bottom-right `.` position | Factory reset (`EE_CLR`) |

### 4.1 Layer 0 (default)

Same as b23_ds34_v2: top row `PrintScreen` / `ScrollLock` / `FN` / `PgUp` / `PgDn` / `Mute` / `Vol-` / `Vol+`, plus full edit cluster (`Insert` `Home` `Del` `End`), numpad (`/` `*` `-` `+` `Enter` `.`) and arrow keys.

### 4.2 Layer 1 (hold `FN`)

| Position | Key |
| :--- | :--- |
| `PgUp` | Switch to layer 3 (`TO(3)`) |
| `Num` | RGB toggle (`RM_TOGG`) |
| `5` | Next effect (`RM_NEXT`) |
| `0` | Next effect (`RM_NEXT`) |
| `↓` | Hold for layer 3 (`MO(3)`) |

### 4.3 Layer 3 (Ctrl+F1~F12 shortcut layer)

Exclusive to the Light variant — every numpad position sends a `Ctrl + F1…F12` combo, handy for app shortcuts:

| Position | Key |
| :--- | :--- |
| Top-left `PrintScreen` | **Bootloader** (`QK_BOOT`) |
| Top row position 8 / 9 | `PgUp` / `PgDn` |
| `Num` / `/` / `*` | `Ctrl+F7` / `Ctrl+F8` / `Ctrl+F9` |
| `4` / `5` / `6` | `Ctrl+F4` / `Ctrl+F5` / `Ctrl+F6` |
| `1` / `2` / `3` / `+` | `Ctrl+F1` / `Ctrl+F2` / `Ctrl+F3` / `Ctrl+F12` |
| `0` / `.` | `Ctrl+F10` / `Ctrl+F11` |

> `TO(3)` switches and stays on layer 3. Add a `TO(0)` key on layer 3 in VIA to jump back to the normal numpad.

## 5. VIA

1. Connect over USB and open VIA: [CN server](https://via.micah.vip/) ｜ [GitHub Pages](https://micahyy.github.io/)
2. Load the keyboard definition JSON in the **Design** tab on first use
3. Switch to **Configure** and remap — changes apply instantly and are stored on the keyboard
4. All 36 positions are editable; **row 3 / col 0 and col 1 are the knob**

See also: [Using VIA](/en/6_guide/6.1_VIA)

## 6. Flashing

The PCB uses the **stm32duino** bootloader:

1. **Enter bootloader** (either way):
   - Shortcut: switch to layer 3 and press the top-left `PrintScreen` position (`QK_BOOT`)
   - Or: unplug USB, **hold the top-left key** and plug back in (QMK Bootmagic Lite)
2. **Flash**:
   - [QMK Toolbox](https://qmk.fm/toolbox/) with the compiled `.bin`; or
   - CLI: `dfu-util -a 2 -d 1EAF:0003 -D <firmware>.bin`
3. Re-plug when done.

## 7. Building the firmware

    make czmao/c23_ds34_v2_light:via

Prebuilt binaries: GitHub Actions artifact `firmware-c23_ds34_v2_light`.

## 8. FAQ

**Q: What is different from b23_ds34_v2?**
A: Same hardware; different PID (`0x4C23`) and an extra Ctrl+F1~F12 layer. Pick the right model when flashing.

**Q: I am stuck on layer 3 / the numpad stopped typing digits?**
A: The `PgUp` position on layer 1 is `TO(3)` (switch, not hold) so it stays on layer 3. Switch back, or map a `TO(0)` key on layer 3 in VIA.

**Q: The knob turns the wrong way?**
A: Swap the two knob positions in VIA, or change `ENCODER_DIRECTION_FLIP` and rebuild.

**Q: How do I reset the keymap?**
A: On layer 2 press the bottom-right `.` position (`EE_CLR`).

---

QQ group: `677654482`

---

## 📥 Firmware & source

- Firmware source (QMK): [github.com/micahyy/czm_qmk](https://github.com/micahyy/czm_qmk) (PCB path `keyboards/czmao/c23_ds34_v2_light`)
- Prebuilt firmware: GitHub Actions artifact `firmware-c23_ds34_v2_light`

See [section 6 "Flashing"](#_6-flashing) for flashing instructions.
