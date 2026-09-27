import type { Article } from './types'

const articles: Article[] = [
  {
    id: 'usb-versions-and-speeds',
    title: 'USB versions and speeds, explained',
    summary: 'Why two USB sticks that look the same can run at very different speeds.',
    group: 'The basics',
    body: `USB has been around since the 1990s, and each new version has raised the top speed while keeping older devices working. That backwards compatibility is convenient, but it also means the shape of a plug tells you very little about how fast a connection is.

## The speed tiers

Each USB version added a new speed tier:

- **Low Speed** — 1.5 Mbps, for simple devices such as keyboards and mice.
- **Full Speed** — 12 Mbps, from USB 1.1.
- **High Speed** — 480 Mbps, from USB 2.0.
- **SuperSpeed** — 5 Gbps, from USB 3.0.
- **SuperSpeed+** — 10 Gbps, and 20 Gbps on some USB 3.2 connections.

Newer standards such as USB4 go faster still.

## Version is not the same as speed

A device reports which USB version it was built for. The speed it actually runs at is agreed when it is plugged in, and it can only be as fast as the slowest part of the chain: the device, the cable, any hub, and the port on your computer. A USB 3 stick in a USB 2 port, or through a USB 2 cable, runs at USB 2 speed.

That is why Universal USB Detector shows both: the version the device declares, and the speed it negotiated with your computer.

## Plug shape is not the same as speed

USB-A, USB-B, micro-USB and USB-C are connector shapes. A USB-C cable can be anything from a slow charging lead to a very fast data cable, and plenty of USB-C devices only talk at USB 2 speeds. The only way to know what you are getting is to look at what the connection actually reports.

## Megabits, not megabytes

Speeds are quoted in bits per second. There are eight bits in a byte, and some of the link is used by the protocol itself, so real file copies are always slower than the headline figure suggests.`,
  },
  {
    id: 'usb-power-explained',
    title: 'How USB power works',
    summary: 'What a device asks for, what a port supplies, and where USB-C Power Delivery fits in.',
    group: 'The basics',
    body: `Every USB port supplies power as well as data. The basic supply is 5 volts, and each device tells the computer how much current it needs.

## What a device asks for

When a device is plugged in, it describes itself to the computer, including the maximum current it expects to draw. A standard USB 2 port is designed to supply up to 500 mA and a USB 3 port up to 900 mA, so a device asking for more than its port offers may not work properly, or may need its own power supply or a powered hub.

The figure a device gives is a request and a ceiling, not a live measurement. A mouse that asks for 100 mA may use far less most of the time.

## Watts, volts and amps

Power in watts is volts multiplied by amps. At 5 volts, 500 mA is 2.5 W and 900 mA is 4.5 W. Universal USB Detector converts each device's request into watts at 5 volts so the numbers are easier to compare.

## USB-C Power Delivery

Fast charging over USB-C works differently. With USB Power Delivery, the charger and the device negotiate a higher voltage and current between themselves, reaching up to 240 W under the latest version of the standard. That negotiation happens in dedicated chips at each end of the cable, not in the normal USB conversation the computer software can see.

This is why no ordinary app can tell you what wattage a USB-C charger has agreed with your laptop. To measure it you need a small hardware tester that sits in line between the charger and the device.

## Chargers are not USB devices

A charger supplies power but does not identify itself as a device on the USB connection, so it never appears in the device list. Universal USB Detector shows charging in a separate panel instead, using what your operating system reports about the power supply and battery.`,
  },
  {
    id: 'charge-only-cables',
    title: 'Why some cables only charge',
    summary: 'How a cable can look perfect and still carry no data.',
    group: 'The basics',
    body: `A USB cable contains separate wires for power and for data. Some cheaper cables, often the ones bundled with small gadgets, include only the power wires. They will charge a phone perfectly well, but a computer will never see anything plugged in through them.

The two kinds usually look identical, and they are rarely labelled. That makes a charge-only cable one of the most common reasons for a device that "isn't recognised".

## Why software cannot simply check a cable

A computer only ever sees devices, never cables. A cable on its own has nothing to report, so no app can look at a cable and read what it is capable of. Some USB-C cables contain a small marker chip describing their current rating and speed, but reading it needs a hardware tester.

## The practical test

The reliable way to find out is to try it: plug a device you know works through the cable and see whether the computer notices it. If the device appears, the cable carries data as well as power. Universal USB Detector has a guided version of this test; see the article on testing a cable.

## Signs of a charge-only cable

- The device charges but the computer does not react when you plug it in.
- The same device is recognised straight away with a different cable.
- The cable came with a product that only needed charging, such as a light, a fan or wireless earbuds.

Once you find one, it is worth labelling it so it does not catch you out again.`,
  },
  {
    id: 'what-the-app-reads',
    title: 'What the app reads, and how',
    summary: 'Where each figure comes from, and the limits of what software can see.',
    group: 'How it works',
    body: `Universal USB Detector is a desktop app for Windows and macOS. When a USB device is plugged in, it describes itself to your computer in a standard format. The app reads that description and turns it into plain English, and it updates the list as soon as something is plugged in or removed.

## What each figure means

- **USB version** — the version the device says it was built for.
- **Speed** — the speed your computer negotiated with the device. On some systems, particularly Windows, the live speed is not available; the app then shows the most the device's USB version allows, marked "up to", rather than pretending it measured it.
- **Role** — what kind of device it is, such as storage, keyboard or mouse, camera, audio or hub, from the standard class codes the device declares. A device can have more than one.
- **Requested power** — the most current the device asks for, shown in milliamps and in watts at 5 volts.
- **Maker, product and serial number** — the device's own name for itself. These are best-effort: on Windows they are often blank for devices the system has already claimed with its own driver.
- **Data** — anything that appears in the list has working data lines, because a device can only appear if it talked to your computer.

## The charging panel

Chargers never appear as USB devices, so charging has its own panel. On Windows it shows whether you are on mains power or battery, the battery level and voltage, and the rate at which power is going into or out of the battery. On other systems only whether the mains adapter is connected is available.

The charge rate is what is flowing into the battery, not what the charger can deliver. A nearly full battery takes only a trickle, even from a powerful charger.

## What it cannot tell you

- The wattage a USB-C charger has negotiated. That needs an in-line hardware tester.
- A cable's current rating or marker chip.
- Anything about the files on a drive. The app reads the device's description, not its contents.

## Organising the list

Devices you plug in while the app is open, and any flash drive or disk, appear in the main area. Built-in devices and hubs sit in a collapsed section; you can reveal any of them, and the app remembers that. You can also hide a device and restore it later.`,
  },
  {
    id: 'testing-a-cable',
    title: 'Testing a cable',
    summary: 'A step-by-step check that proves whether a cable carries data.',
    group: 'How it works',
    body: `Because a computer cannot see a cable directly, the cable test works by watching for a device to appear through it.

## How to run it

1. Open **Test a cable**. The app notes every device that is connected at that moment.
2. Plug the cable into your computer.
3. Plug a device you know works, such as a flash drive, keyboard or phone, into the other end of the cable.
4. Wait. The app watches for a new device for up to 30 seconds.

## Reading the result

- **A device appears** — the cable carries data as well as power. The app shows what it found, and you can test another.
- **Nothing appears** — the cable may be charge-only. It is also possible that the device you used does not present itself as a data device, or needs its own power supply. Try again with a different device you know works before blaming the cable.

## Tips

- Use a simple device for the test. A flash drive or a wired keyboard is ideal because it appears straight away and needs no setup.
- Some phones only show up as a data device once you unlock them or choose to allow the connection on the phone's screen.
- Plug straight into the computer rather than through a hub, so the hub is not the thing you end up testing.
- A passed test proves the cable carries data. It does not tell you the cable's top speed or how much current it is rated for.`,
  },
  {
    id: 'privacy-and-security',
    title: 'What leaves your computer',
    summary: 'Nothing about your devices is uploaded, and there is no account.',
    group: 'Privacy and security',
    body: `Universal USB Detector works entirely on your computer. It reads your USB devices and your power status locally and shows them to you. None of that information is uploaded anywhere.

## No account

There is nothing to sign in to, and the app does not offer a sign-in.

## What the app does send

The shared menu bar at the top of every UNI·SIM app shows how many people use the app. To count you, the app sends a small signal while it is open, made of a random number created for this installation and the kind of device it is running on. It contains nothing about your USB devices, your battery or your files. The menu can also load the list of recent changes to the app.

## What is kept on your computer

The app remembers which devices you have hidden and which built-in devices you have chosen to show, so the list looks the same next time. That is stored by the app on this computer and nowhere else.

## What the app does to your devices

It only reads. To learn a device's name, the app briefly opens it and asks for its name, maker and serial number, then closes it again. It does not change settings on your devices, write to them, or look at the files on a drive.

## How the app is built

The part of the app that talks to USB hardware is kept separate from the part that draws the window. The window itself has no direct access to your system; it only receives the finished list of devices. The app is open source, so anyone can check exactly what it does.`,
  },
]

export default articles
