# QMK Keycodes

Commonly used keycodes for VIA remapping.


## Quantum Keycodes 

System-level keys: reset into bootloader, debug, EEPROM clear and VIA controls.




| Key | Aliases | Description |
| --- | ------- | --- |
| `QK_BOOTLOADER` | `QK_BOOT` | Put the keyboard into bootloader mode for flashing |
| `QK_DEBUG_TOGGLE` | `DB_TOGG` | Toggle debug mode |
| `QK_CLEAR_EEPROM` | `EE_CLR` | Reinitializes the keyboard's EEPROM (persistent memory) |
| `QK_MAKE` | | Sends `qmk compile -kb (keyboard) -km (keymap)`, or `qmk flash` if shift is held. Puts keyboard into bootloader mode if shift & control are held |
| `QK_REBOOT` | `QK_RBT` | Resets the keyboard. Does not load the bootloader |

## Audio Keys

Controls the onboard buzzer or speaker: turn audio output on, off, or toggle it.



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

Type a capital letter by holding the key slightly longer instead of pressing Shift; the keys below turn the feature on or off, toggle it, and adjust the timing.



| Key | Aliases | Description |
| --- | ------- | --- | --- |
| `QK_AUTO_SHIFT_DOWN` | `AS_DOWN` | Lower the Auto Shift timeout variable (down) |
| `QK_AUTO_SHIFT_UP` | `AS_UP` | Raise the Auto Shift timeout variable (up) |
| `QK_AUTO_SHIFT_REPORT` | `AS_RPT` | Report your current Auto Shift timeout value |
| `QK_AUTO_SHIFT_ON` | `AS_ON` | Turns on the Auto Shift Function |
| `QK_AUTO_SHIFT_OFF` | `AS_OFF` | Turns off the Auto Shift Function |
| `QK_AUTO_SHIFT_TOGGLE` | `AS_TOGG` | Toggles the state of the Auto Shift feature |


## Autocorrect

Autocorrect fixes common typos automatically, for example it replaces "teh" with "the" while you type. The keys below switch the feature on, off, or toggle it without recompiling the firmware.






| Key | Aliases | Description |
| --- | ------- | --- | --- |
| `QK_AUTOCORRECT_ON` | `AC_ON` | Turns on the Autocorrect feature. |
| `QK_AUTOCORRECT_OFF` | `AC_OFF` | Turns off the Autocorrect feature. |
| `QK_AUTOCORRECT_TOGGLE` | `AC_TOGG` | Toggles the status of the Autocorrect feature. |

## Backlighting

Controls the single-colour backlight LEDs under the keys: on/off, brightness levels and breathing. Unlike RGB lighting, the backlight is a single colour - only brightness and breathing are adjustable.






| Key | Aliases | Description |
| --- | ------- | --- | --- |
| `QK_BACKLIGHT_TOGGLE` | `BL_TOGG` | Turn the backlight on or off |
| `QK_BACKLIGHT_STEP` | `BL_STEP` | Cycle through backlight levels |
| `QK_BACKLIGHT_ON` | `BL_ON` | Set the backlight to max brightness |
| `QK_BACKLIGHT_OFF` | `BL_OFF` | Turn the backlight off |
| `QK_BACKLIGHT_UP` | `BL_UP` | Increase the backlight level |
| `QK_BACKLIGHT_DOWN` | `BL_DOWN` | Decrease the backlight level |
| `QK_BACKLIGHT_TOGGLE_BREATHING` | `BL_BRTG` | Toggle backlight breathing |

## Wireless/Bluetooth

Switches the output channel on multi-mode keyboards: USB wired, Bluetooth or 2.4 GHz, plus automatic selection and Bluetooth profile handling. Note: keycodes marked "not yet implemented" are not fully implemented in QMK, behaviour depends on your firmware.






| Key | Aliases | Description |
| --- | ------- | --- | --- |
| `QK_OUTPUT_AUTO` | `OU_AUTO` | Automatically switch to USB when plugged in, otherwise use wireless |
| `QK_OUTPUT_NEXT` | `OU_NEXT` | Cycle forwards through USB, Bluetooth, and 2.4GHz (when available) (not yet implemented) |
| `QK_OUTPUT_PREV` | `OU_PREV` | Cycle backwards through USB, Bluetooth, and 2.4GHz (when available) (not yet implemented) |
| `QK_OUTPUT_NONE` | `OU_NONE` | Disable all output (not yet implemented) |
| `QK_OUTPUT_USB` | `OU_USB` | Output to USB only |
| `QK_OUTPUT_2P4GHZ` | `OU_2P4G` | Output to 2.4GHz only (not yet implemented) |
| `QK_OUTPUT_BLUETOOTH` | `OU_BT` | Output to Bluetooth only |
| `QK_BLUETOOTH_PROFILE_NEXT` | `BT_NEXT` | Move to the next Bluetooth profile (not yet implemented) |
| `QK_BLUETOOTH_PROFILE_PREV` | `BT_PREV` | Move to the previous Bluetooth profile (not yet implemented) |
| `QK_BLUETOOTH_UNPAIR` | `BT_UNPR` | Un-pair the current Bluetooth profile (not yet implemented) |
| `QK_BLUETOOTH_PROFILE1` | `BT_PRF1` | Swap to Bluetooth profile #1 (not yet implemented) |
| `QK_BLUETOOTH_PROFILE2` | `BT_PRF2` | Swap to Bluetooth profile #2 (not yet implemented) |
| `QK_BLUETOOTH_PROFILE3` | `BT_PRF3` | Swap to Bluetooth profile #3 (not yet implemented) |
| `QK_BLUETOOTH_PROFILE4` | `BT_PRF4` | Swap to Bluetooth profile #4 (not yet implemented) |
| `QK_BLUETOOTH_PROFILE5` | `BT_PRF5` | Swap to Bluetooth profile #5 (not yet implemented) |

## Caps Word

Caps Word capitalises letters temporarily: it turns itself off as soon as you type a space, Enter or any non-letter character, which makes it ideal for acronyms such as QWERTY, USB or QMK. Unlike Caps Lock it ends automatically and needs no manual switch-off.






| Key | Aliases | Description |
| --- | ------- | --- | --- |
| `QK_CAPS_WORD_TOGGLE` | `CW_TOGG` | Toggles Caps Word |

## Dynamic Macros

Record a macro on the fly, without recompiling or flashing: start and stop the recording, then play back the stored macro slot.







| Key | Aliases | Description |
| --- | ------- | --- | --- |
| `QK_DYNAMIC_MACRO_RECORD_START_1` | `DM_REC1` | Start recording Macro 1 |
| `QK_DYNAMIC_MACRO_RECORD_START_2` | `DM_REC2` | Start recording Macro 2 |
| `QK_DYNAMIC_MACRO_PLAY_1` | `DM_PLY1` | Replay Macro 1 |
| `QK_DYNAMIC_MACRO_PLAY_2` | `DM_PLY2` | Replay Macro 2 |
| `QK_DYNAMIC_MACRO_RECORD_STOP` | `DM_RSTP` | Finish the macro that is currently being recorded. |

## Grave Escape

One key with two roles: it outputs Escape when tapped alone, and the grave/tilde key when combined with a modifier.









| Action | Output |
| --- | --- |
| Tap alone | Escape (ESC) |
| Shift + tap | `~` |
| GUI/Win + tap | `` ` `` |



| Key | Aliases | Description |
| --- | ------- | --- | --- |
| `QK_GRAVE_ESCAPE` | `QK_GESC` | |

## Joystick

Exposes joystick buttons to the host: each key acts as a virtual joystick button press, for boards with the joystick feature enabled.







| Key | Aliases | Description |
| --- | ------- | --- | --- |
| `QK_JOYSTICK_BUTTON_0` | `JS_0` | Button 0 |
| `QK_JOYSTICK_BUTTON_1` | `JS_1` | Button 1 |
| `QK_JOYSTICK_BUTTON_2` | `JS_2` | Button 2 |
| `QK_JOYSTICK_BUTTON_3` | `JS_3` | Button 3 |
| `QK_JOYSTICK_BUTTON_4` | `JS_4` | Button 4 |
| `QK_JOYSTICK_BUTTON_5` | `JS_5` | Button 5 |
| `QK_JOYSTICK_BUTTON_6` | `JS_6` | Button 6 |
| `QK_JOYSTICK_BUTTON_7` | `JS_7` | Button 7 |
| `QK_JOYSTICK_BUTTON_8` | `JS_8` | Button 8 |
| `QK_JOYSTICK_BUTTON_9` | `JS_9` | Button 9 |
| `QK_JOYSTICK_BUTTON_10` | `JS_10` | Button 10 |
| `QK_JOYSTICK_BUTTON_11` | `JS_11` | Button 11 |
| `QK_JOYSTICK_BUTTON_12` | `JS_12` | Button 12 |
| `QK_JOYSTICK_BUTTON_13` | `JS_13` | Button 13 |
| `QK_JOYSTICK_BUTTON_14` | `JS_14` | Button 14 |
| `QK_JOYSTICK_BUTTON_15` | `JS_15` | Button 15 |
| `QK_JOYSTICK_BUTTON_16` | `JS_16` | Button 16 |
| `QK_JOYSTICK_BUTTON_17` | `JS_17` | Button 17 |
| `QK_JOYSTICK_BUTTON_18` | `JS_18` | Button 18 |
| `QK_JOYSTICK_BUTTON_19` | `JS_19` | Button 19 |
| `QK_JOYSTICK_BUTTON_20` | `JS_20` | Button 20 |
| `QK_JOYSTICK_BUTTON_21` | `JS_21` | Button 21 |
| `QK_JOYSTICK_BUTTON_22` | `JS_22` | Button 22 |
| `QK_JOYSTICK_BUTTON_23` | `JS_23` | Button 23 |
| `QK_JOYSTICK_BUTTON_24` | `JS_24` | Button 24 |
| `QK_JOYSTICK_BUTTON_25` | `JS_25` | Button 25 |
| `QK_JOYSTICK_BUTTON_26` | `JS_26` | Button 26 |
| `QK_JOYSTICK_BUTTON_27` | `JS_27` | Button 27 |
| `QK_JOYSTICK_BUTTON_28` | `JS_28` | Button 28 |
| `QK_JOYSTICK_BUTTON_29` | `JS_29` | Button 29 |
| `QK_JOYSTICK_BUTTON_30` | `JS_30` | Button 30 |
| `QK_JOYSTICK_BUTTON_31` | `JS_31` | Button 31 |

## Key Lock

Locks the next key you press so it stays logically held until you press it again - a one-key lock, handy for holding Ctrl or Shift with one hand.







| Key | Description |
| --- | --- | --- |
| `QK_LOCK` | Hold down the next key pressed, until the key is pressed again |

## Layer Lock

Locks the highest currently active layer until you press the same key again or switch layers, so you can keep working on a layer without holding a key down.





| Function | Behavior |
| --- | --- | --- |
| `MO(layer)` | Momentary: active while held, released on key-up |
| `TG(layer)` | Toggle: tap to turn on, tap again to turn off |
| `Layer Lock` | Locks the highest active layer until the same key is pressed again or the layer changes |




| Key | Aliases | Description |
| --- | ------- | --- | --- |
| `QK_LAYER_LOCK` | `QK_LLCK` | Locks or unlocks the highest layer |

## Layer Switching

Keys that change layers: momentary while held, toggle, one-shot, tap-hold (layer plus regular key) and default-layer variants.






| Key | Behavior |
| --- | --- | --- |
| `MO(layer)` | Momentary: active while held, released on key-up |
| `LT(layer, kc)` | Layer tap: hold for the layer, tap for the regular key |
| `TG(layer)` | Toggle: tap to turn on, tap again to turn off |
| `TO(layer)` | Turn on the given layer and turn off all other non-default layers |
| `TT(layer)` | Like `MO`, but tapping it repeatedly toggles the layer on |
| `DF(layer)` | Set the default layer |
| `PDF(layer)` | Set the default layer (persisted) |
| `LM(layer, mod)` | Momentary layer with the given modifier held |

| Key | Description |
| --- | --- | --- |
| `DF(layer)` | Set the base (default) layer until the keyboard loses power |
| `PDF(layer)` | Set the base (default) layer in EEPROM |
| `MO(layer)` | Momentarily turn on layer when pressed (requires KC_TRNS on destination layer) |
| `LM(layer, mod)` | Momentarily turn on layer (like MO) with mod active as well |
| `LT(layer, kc)` | Turn on layer when held, kc when tapped |
| `TG(layer)` | Toggle layer on or off |
| `TO(layer)` | Turns on layer and turns off all other layers, except the default layer |
| `TT(layer)` | Normally acts like MO unless it's tapped multiple times, which toggles layer on |

## Leader Key

A leader key triggers an action from a sequence of keys pressed one after another, instead of holding several keys at once. Press the leader key first, then the sequence.







| Feature | Key input |
| --- | --- | --- |
| Regular shortcut | Hold several keys at the same time |
| Leader Key | Press several keys one after another |




```c
LEADER_EXTERNS();
void matrix_scan_user(void) {
    LEADER_DICTIONARY() {
        leading = false;
        leader_end();
        SEQ_ONE_KEY(KC_F) {   // LEAD + F
            SEND_STRING("QMK Firmware");
        }
        SEQ_TWO_KEYS(KC_A, KC_B) {   // LEAD + A + B
            tap_code(KC_F13);
        }
    }
}
```

## LED Matrix

Individually addressable per-key LEDs: brightness, effect, effect speed, hue and saturation, plus on/off - each LED is controlled separately.






| Feature | Control |
| --- | --- | --- |
| Backlighting | Controls all backlight LEDs as one group |
| RGB Lighting | Controls the RGB strip or underglow as one group |
| LED Matrix | Controls each key's LED independently |


| Key | Aliases | Description |
| --- | ------- | --- | --- |
| `QK_LED_MATRIX_ON` | `LM_ON` | Turn on LED Matrix |
| `QK_LED_MATRIX_OFF` | `LM_OFF` | Turn off LED Matrix |
| `QK_LED_MATRIX_TOGGLE` | `LM_TOGG` | Toggle LED Matrix on or off |
| `QK_LED_MATRIX_MODE_NEXT` | `LM_NEXT` | Cycle through animations |
| `QK_LED_MATRIX_MODE_PREVIOUS` | `LM_PREV` | Cycle through animations in reverse |
| `QK_LED_MATRIX_BRIGHTNESS_UP` | `LM_BRIU` | Increase the brightness level |
| `QK_LED_MATRIX_BRIGHTNESS_DOWN` | `LM_BRID` | Decrease the brightness level |
| `QK_LED_MATRIX_SPEED_UP` | `LM_SPDU` | Increase the animation speed |
| `QK_LED_MATRIX_SPEED_DOWN` | `LM_SPDD` | Decrease the animation speed |
| `QK_LED_MATRIX_FLAG_NEXT` | `LM_FLGN` | Cycle through flags |
| `QK_LED_MATRIX_FLAG_PREVIOUS` | `LM_FLGP` | Cycle through flags in reverse |




