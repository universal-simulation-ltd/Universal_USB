# Universal USB Detector

Plug in a USB device and instantly see what it is — **USB version, negotiated
speed, requested power, role and vendor** — with live plug/unplug detection.
Everything runs locally; nothing is uploaded.

Part of the [UNI·SIM Universal Apps](https://opensource.unisim.co.uk) — free and
open source (MIT).

## What it can and can't read

| Field | Source | Notes |
| --- | --- | --- |
| USB 2 vs 3 / version | device descriptor `bcdUSB` | reliable |
| Negotiated speed | libusb link speed | Low/Full/High = USB 2, SuperSpeed(+) = USB 3 |
| Role (HID / storage / hub…) | interface class codes | per-interface |
| Requested power | config descriptor `bMaxPower` | what the device **asks for** (mA → W @ 5 V) |
| Data vs power-only | enumeration | anything that appears has working data lines; a charge-only cable never enumerates |
| Vendor / product / serial | string descriptors | best-effort — may be blank on Windows for class-driver devices |
| Charging / AC connected | OS power API (WMI + Electron `powerMonitor`) | shown in a separate **Charging & Power** panel — a charger never enumerates on the USB bus |
| Charge rate (W into battery) | WMI `root/wmi BatteryStatus` | Windows-only; **not** the charger's PD wattage |
| **USB-C PD wattage (up to 240 W)** | ❌ not in software | negotiated in the port controller / UCSI; needs an inline PD tester |

## Organising devices

- **Main area** — things you plugged in since launch, plus any flash drive / disk (always), plus anything you've revealed.
- **Built-in & already-connected** (collapsed) — internal devices (Bluetooth, webcam…) and hubs. Each has a **＋ reveal** button to promote it to the main area; that choice persists across launches.
- **Hidden** (collapsed) — devices you've **✕**-ed out of the main area, restorable with **↺**.
- ✕ on a *revealed* device just sends it back to the background; ✕ on a genuinely-plugged-in device hides it.

## Cable data test

"🔌 Test a cable" runs a guided, empirical check: it snapshots what's connected, asks you to plug a known device through the cable, and watches for a new enumeration. A device appearing proves the cable carries **data + power**; nothing appearing means it's charge-only, not a data device, or needs its own power. (Current rating / e-marker still needs a hardware tester.)

## Architecture

- **Renderer** (`src/`) — React + Vite + Tailwind, fully sandboxed, no Node access.
- **Main process** (`electron/main.cjs`) — the only place with native access.
  Uses [`node-usb`](https://github.com/node-usb/node-usb) (libusb) to enumerate
  devices, decode descriptors, and listen for `attach`/`detach`. Pushes plain
  device snapshots to the renderer over the `preload.cjs` IPC bridge.
- **`web-demo/webusb-demo.html`** — a standalone WebUSB "try it" widget for the
  marketing/download page. Browser-only, per-device permission, identifies a
  device but can't read speed/power (that's the desktop app's pitch).

## Develop

```bash
cd D:/Github/UNISIM/Universal_Apps/Universal_USB
npm install
# node-usb is a native module — build it against Electron's ABI if needed:
npm run rebuild

# Two terminals:
npm run dev            # Vite dev server on http://localhost:5173
npm run electron:dev   # Electron window pointed at the dev server
```

> Running `npm run dev` alone opens the app in a browser tab, where there is no
> USB bridge — you'll see the "desktop bridge isn't available" banner. USB access
> only exists inside the Electron window.

## Build a Windows installer

```bash
npm run dist:win   # → release/
```

## Naming

Display name is **Universal USB Detector**; the folder / package / repo stay
`universal-usb` (`uk.co.unisim.usb`) for infra continuity.
