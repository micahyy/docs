# USB_EN Desktop Controller (b43_huben)

5-key + 1-knob desktop controller PCB · USB wired · QMK firmware · VIA

> b43_huben (USB_EN) is a small **desktop controller** PCB: STM32F103CBT6 (Blue Pill), 3-column × 3-row matrix, only 5 physical media keys plus one EC11 knob — a tiny desktop box for volume and playback. The knob uses two virtual key positions, so **both directions can be remapped independently in VIA**. QMK firmware, open source, VIA-compatible.

## 1. Specifications

| Item | Value |
| :--- | :---- |
| PCB model | `b43_huben` (USB_EN) |
| Keys | 5 physical keys + 1 knob |
| Matrix | 3 columns × 3 rows (COL2ROW) |
| Connection | USB wired (single mode) |
| Port | USB Type-C (C-to-C supported) |
| MCU | STM32F103CBT6 (Blue Pill) |
| Knob | 1 × EC11 encoder (C13 / C14, resolution 4) |
| USB VID / PID | `0x7F89` / `0x4B43` |
| Lighting | WS2812 @ B13 (8 LED positions in firmware) |
| Layers | 4 (0–3, layer 7 reserved) |
| N-key rollover | Yes (NKRO) |
| Polling rate | 1000 Hz |
| Firmware | QMK (open source) |
| Keymap tool | VIA (web) |
| Source code | [github.com/micahyy/czm_qmk](https://github.com/micahyy/czm_qmk) |

## 2. Hardware / pinout (PCB design)

| Function | Pin / value |
| :--- | :--- |
| Matrix | 3 rows × 3 columns (COL2ROW) |
| Knob A / B | C13 / C14 |
| Knob resolution | 4 (`ENCODER_RESOLUTION`) |
| WS2812 data pin | B13 |
| Bootloader | stm32duino |

### 2.1 Knob virtual key positions

The firmware LAYOUT has 7 positions; **row 2's `ENL` / `ENR` have no physical switch** and belong to the knob:

| Knob | CW | CCW |
| :--: | :--- | :--- |
| Knob 1 | `ENR` | `ENL` |

> By default these are **volume + / volume -**. In VIA they are ordinary key positions and can be set **per layer** — e.g. scrolling, zooming or lighting control.

## 3. Lighting

- WS2812 on **B13**, 8 LED positions defined in firmware.
- Toggle, effect, speed and hue are available on layers 1 / 2 shortcuts and in the VIA **Lighting** tab.

## 4. Layers and shortcuts

All 5 keys are **tap / hold** (`LT`): tap = media function, hold = layer.

### 4.1 Layer 0 (default)

| Position | Tap | Hold |
| :--- | :--- | :--- |
| Key 1 | Open media player (`MSEL`) | Layer 1 |
| Key 2 | Play / Pause (`MPLY`) | Layer 2 |
| Key 3 | Mute | — |
| Key 4 | Previous track (`MPRV`) | Layer 3 |
| Key 5 | Next track (`MNXT`) | Layer 4 |
| Knob | Volume + / Volume - | — |

### 4.2 Layer 1 (hold the media-player key — lighting)

| Position | Key |
| :--- | :--- |
| Key 2 (play/pause) | RGB toggle (`RM_TOGG`) |
| Key 4 (previous) | Effect speed - (`RM_SPDD`) |
| Key 5 (next) | Effect speed + (`RM_SPDU`) |
| Knob CCW / CW | Hue - (`RM_HUED`) / Hue + (`RM_HUEU`) |

### 4.3 Layer 2 (hold the play/pause key)

| Position | Key |
| :--- | :--- |
| Key 1 (media player) | Next effect (`RM_NEXT`) |

> Layer 7 reserves **factory reset** (`EE_CLR`); the default layers have no direct entry, so map a key to layer 7 in VIA, or simply reflash the firmware to restore defaults.

## 5. VIA

1. Connect over USB and open VIA: [CN server](https://via.micah.vip/) ｜ [GitHub Pages](https://micahyy.github.io/)
2. Load the keyboard definition JSON in the **Design** tab on first use
3. Switch to **Configure** and remap — changes apply instantly and are stored on the keyboard
4. All 7 positions are editable; **`ENL` / `ENR` are the knob's CCW / CW**

See also: [Using VIA](/en/6_guide/6.1_VIA)

## 6. Flashing

The PCB uses the **stm32duino** bootloader:

1. **Enter bootloader**: unplug USB, **hold the top-left key** and plug back in (QMK Bootmagic Lite) — the board enters DFU.
2. **Flash**:
   - [QMK Toolbox](https://qmk.fm/toolbox/) with the compiled `.bin`; or
   - CLI: `dfu-util -a 2 -d 1EAF:0003 -D <firmware>.bin`
3. Re-plug when done.

> The stock keymap has no `QK_BOOT` key: use the "hold the first key while plugging in" method, or map `QK_BOOT` in VIA.

## 7. Building the firmware

    make czmao/b43_huben:via

Prebuilt binaries: GitHub Actions artifact `firmware-b43_huben`.

## 8. FAQ

**Q: VIA does not detect the board?**
A: Use a WebHID-capable browser (Chrome / Edge) and load the definition JSON. Also try another port or cable.

**Q: The knob turns the wrong way?**
A: Swap the `ENL` and `ENR` functions in VIA.

**Q: Media keys do nothing in some apps?**
A: They use the standard USB Consumer Control page; some apps need "global media keys" enabled in their own settings.

**Q: How do I restore the default keymap?**
A: Reflash the official firmware, or set the layout back in VIA.

---

QQ group: `677654482`

---

## 📥 Firmware & source

- Firmware source (QMK): [github.com/micahyy/czm_qmk](https://github.com/micahyy/czm_qmk) (PCB path `keyboards/czmao/b43_huben`)
- Prebuilt firmware: GitHub Actions artifact `firmware-b43_huben`

See [section 6 "Flashing"](#_6-flashing) for flashing instructions.
