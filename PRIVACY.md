# What Universal USB Detector does with your devices

This page is written to be checked: every claim below names the file in this
repository that makes it true, and you are welcome to go and read it.

The short version: **the app reads the USB devices plugged into your computer
and shows them to you, on your computer.** Nothing about your devices, your
battery or your files is sent anywhere. There is no account, no analytics and
no advertising.

---

## What the app reads

All of this happens in the app's main process, on your machine, through
[node-usb](https://github.com/node-usb/node-usb) (libusb). The code is
[`electron/main.cjs`](electron/main.cjs).

| What | Where it comes from |
|---|---|
| Vendor and product IDs, USB version, device and interface classes (the "role": storage, keyboard, camera…), the power the device requests | the descriptors every USB device publishes, read without opening it |
| The device's name, maker and serial number | the device's string descriptors, read by briefly opening the device and closing it again. If your system doesn't allow that (common on Windows), these stay blank |
| Whether a USB 3 device can go faster than 5 Gbps | the device's BOS descriptor, read the same way |
| Which bus and port it is on | libusb |
| Charging and power status | Electron's power monitor; on Windows, also the battery status Windows reports through PowerShell (charging, charge rate, voltage, percentage) |

**It only reads.** It doesn't change settings on your devices, write to them,
or look at the files on a drive.

**The window can't reach your hardware.** The part that draws the window runs
sandboxed, with no access to your system. It only receives the finished list of
devices from the main process, through a small bridge
([`electron/preload.cjs`](electron/preload.cjs)).

The **cable data test** ([`src/components/CableTester.tsx`](src/components/CableTester.tsx))
works the same way: it compares the list of devices before and after you plug
something in through the cable. Nothing extra is read.

---

## What stays on your computer

- **The device list.** It is shown in the window and not saved or sent
  anywhere.
- **Which devices you hid, and which built-in devices you chose to show.** The
  app remembers these on this computer so the list looks the same next time
  ([`src/App.tsx`](src/App.tsx)). They are identified by vendor ID, product ID
  and port, not by serial number.
- **Your preferences** (theme, language), kept by the app on this computer.

Uninstalling the app and deleting its data removes all of it.

---

## What the app talks to a server for

If you watch the app's network traffic you will see a few requests, so here is
each one:

- **The list of recent changes.** The menu and the update notice fetch a list
  of releases from `changelog.unisim.co.uk`. This is how the app tells you a
  newer version is out. It doesn't download or install anything by itself.
- **The user count in the menu.** The shared UNI·SIM menu shows how many people
  use the suite's apps, and reads that figure from our server. **This app only
  reads it. It does not report itself to be counted** and keeps no ID for this
  computer ([`src/main.tsx`](src/main.tsx), `presence: false`).

Neither request contains anything about your USB devices, your battery or your
files.

**There is no account.** Nothing in the app offers a sign-in, so there is
nothing of yours on our servers.

**There is no third-party analytics, no tracking and no advertising.**

Links in the app (the website, the source code) open in your own browser.

---

## The browser demo

[`web-demo/webusb-demo.html`](web-demo/webusb-demo.html) is a small page that
identifies one device using your browser's WebUSB. Your browser asks you to pick
the device first, and what it reads is shown on the page and not sent anywhere.

---

## How to check it yourself

1. Unplug from the network (turn off Wi-Fi).
2. Open the app and plug in a device.

It keeps working, because the work never happened anywhere else. Only the
changelog and the user count go missing.

---

## If you find this page is wrong

Please tell us. Open an issue on
[the repository](https://github.com/universal-simulation-ltd/Universal_USB/issues).
