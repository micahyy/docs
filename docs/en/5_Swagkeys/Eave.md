# Swagkeys EAVE

<!-- Google ad -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-1219216787967331"
     data-ad-slot="9774262908"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<ClientOnly>
  <template #default>
    <div ref="el"></div>
  </template>
</ClientOnly>

<script setup>
import { ref, onMounted } from 'vue'
const el = ref(null);
onMounted(() => {
  if (!el.value) return;
  const s = document.createElement('script');
  s.text = `
     (adsbygoogle = window.adsbygoogle || []).push({});
`;
  el.value.appendChild(s);
});
</script>

## 1. Purchase link

[Product link](https://trade.taobao.com/trade/detail/tradeSnap.htm?spm=a21dvs.23580594.0.0.ee61645ejtiztc&tradeID=5114554489013073627&snapShot=true)

Bundle contents

| Bundle | Bundle 1 | Bundle 2 |
|---|---|---|
| Description | First generation, no weight | PUS bundle, silicone weight included |
| PCB | 1.2 mm 6.25U hot-swap | 1.2 mm 6.25U hot-swap / upgraded to a 1.6 mm PCB in May 2026 |
| Plate | PC plate | PC plate |
| Sound-damping kit | 3 pieces | 3 pieces |
| Weight | Silicone weight | Silicone weight |
| Stabilizers | No stabilizers in the switchless bundle; the bundle with switches comes assembled with stabilizers | No stabilizers in the switchless bundle; the bundle with switches comes assembled with stabilizers |

[QQ groups]

    677654482 CZMao
    723973019 Swagkeys group 2
    766480935 Swagkeys

## 2. Basic specs

| Spec | Value | Notes |
|:---|:---|:---|
| Layers | 4 | Layers 0–3 |
| Keys | 65 | |
| Polling rate | 1 kHz | |
| Latency | 1 ms | |
| N-Key rollover | Supported | |
| Lighting | RGB backlight | |
| Switch mounting | Hot-swap sockets | |
| Port | Type-C | Detachable cable |
| Mounting style | Gasket | |
| Full keys customizable | Yes | |
| Connection | Wired only | |
| Bluetooth | Not supported | No wireless version yet |
| 2.4G | Not supported | No wireless version yet |
| PCB size | | |
| Keyboard size | | |
| Assembled weight | | |

## 3. Shortcuts

| Shortcut | Keycode | Function | Notes |
|-----|-----|-----|-|
| FN+Alt | MO(2) | Triggers layer-2 keys | |
| FN+ESC | GRV | ~ | |
| FN+1 | | F1 | FN+1~= triggers F1~F12 |
| FN+Z | RGB_TOG | Backlight on / off | |
| FN+X | RGB_MOD | Cycle lighting effect | |
| FN+WIN | GU_TOGG | Lock / unlock Win | |
| FN+P | MPLY | Play / pause | |
| FN+UP | KC_VOLU | Volume + | |
| FN+DOWN | KC_VOLD | Volume - | |
| FN+LEFT | KC_MPRV | Previous track | |
| FN+DOWN | KC_MNXT | Next track | |
| FN+RALT+ESC | EE_CLR | Factory reset | |
| FN+RALT+0 | QK_BOOT | Enter flashing mode | |
| FN+RALT+CLRL | AG_TOGG | Swap Win and Alt | Mac mode; press FN+Alt+Win position to switch back |

## 4. JSON file

Official VIA recognises the keyboard, so no JSON file is needed.

Driver URLs:

[usevia](https://usevia.app/) (official)

[micahyy.github.io](https://micahyy.github.io/) (overseas server)

[via.micah.vip](https://via.micah.vip/) (China server)

## 5. Downloads

[GitHub](https://github.com/micahyy/czmao/tree/main/Swagkeys)

Includes firmware, JSON and plate drawings.

## 6. Accessories

| Name | Spec | Qty | Unit | Notes |
|-----|-----|-----|---|-|
| Screw | M2*11 | | pcs | Case screws, lower half |
| Screw | M2*19 | | pcs | Case screws, upper half |
| Screw | M2*4 | 2 | pcs | Daughterboard screws |
| PCB | 6.25U hot-swap | 1 | pcs | 1.2 mm thick; replaced by 1.6 mm after May 2026 |
| Plate | PC plate | 1 | pcs | Supports PCB-mount stabilizers |
| Case | PC/ABS | 1 | set | |
| Silicone gaskets | | 1 | set | Gasket silicone pods |
