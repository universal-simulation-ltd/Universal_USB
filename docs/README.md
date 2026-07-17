# Universal USB Detector — docs

## What this repo is

Universal USB Detector is a **desktop app**: plug in a USB device and
instantly see what it is — USB version, negotiated speed, requested power,
role (HID / storage / hub…) and vendor — with live plug/unplug detection and a
guided "test a cable" flow that empirically proves whether a cable carries
data. Everything runs locally; nothing is uploaded.

- **Download page:** [opensource.unisim.co.uk/usb](https://opensource.unisim.co.uk/usb)
  — a static page served by the `opensource-portal` Worker (unlike the
  path-proxied web apps, USB needs native access so it ships as a desktop
  app). Builds are shipped **unsigned** per suite policy, and the SmartScreen
  warning is disclosed on the download page.
- **Architecture:** an Electron main process (`electron/main.cjs`) is the only
  place with native access — it uses `node-usb` (libusb) to enumerate devices,
  decode descriptors, and listen for attach/detach, pushing snapshots to a
  fully sandboxed React + Vite + Tailwind renderer (`src/`) over the
  `preload.cjs` IPC bridge.
- **`web-demo/webusb-demo.html`** — a standalone browser-only WebUSB "try it"
  widget for the download page; it identifies a device but can't read
  speed/power (that's the desktop app's pitch).
- **Naming:** display name is *Universal USB Detector*; folder/package/repo
  stay `universal-usb` for infra continuity.

MIT licensed — free and open source, like all Universal Apps.

## Suite context

This repo is one part of the **Universal Simulation suite** (the open-source
Universal Apps family). For cross-repo context — how the `@unisim/sdk`, edge
routing, and the suite changelog wire together — see the suite docs repo:
[`universal-simulation-ltd/docs`](https://github.com/universal-simulation-ltd/docs)
(private; checked out at the umbrella root as `Docs_UNI_SIM/` for suite
contributors). Start with `ARCHITECTURE.md` (the cross-repo map).
