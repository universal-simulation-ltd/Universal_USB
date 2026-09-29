import type { Source } from './types'

// The research, standards and reports behind each article, keyed by article
// id. The same in every language, so kept once here and attached by index.ts.
//
// Standards first, then guidance — and only sources for what the app really
// does (checked against electron/main.cjs on 2026-09-29: node-usb over libusb
// reads each device descriptor's bcdUSB, the negotiated speed enum, the
// interface class codes and the configuration descriptor's bMaxPower in 2 mA
// units, or 8 mA from USB 3; attach/detach events drive the list and the
// cable test; Windows charging comes from WMI's BatteryStatus and
// Win32_Battery via PowerShell; the renderer runs with contextIsolation on
// and nodeIntegration off). USB is an industry specification, not a research
// result, so there is no founding paper to cite; the USB 1.0 (1996) text has
// no official free copy left online, so USB 2.0, which defines Low, Full and
// High Speed, stands in for it.
//
// ⚠️ No `pdf` here: USB-IF specifications are copyrighted and downloaded as
// zip bundles from the USB-IF document library, so every entry links to that
// library page.

const USB_2: Source = {
  kind: 'standard',
  title: 'Universal Serial Bus Specification, Revision 2.0',
  publisher: 'USB Implementers Forum',
  year: 2000,
  href: 'https://www.usb.org/document-library/usb-20-specification',
}

const USB_3_2: Source = {
  kind: 'standard',
  title: 'Universal Serial Bus 3.2 Specification, Revision 1.1',
  publisher: 'USB Implementers Forum',
  year: 2022,
  href: 'https://www.usb.org/document-library/usb-32-revision-11-june-2022',
}

export const SOURCES: Record<string, Source[]> = {
  'usb-versions-and-speeds': [
    USB_2,
    USB_3_2,
    {
      kind: 'standard',
      title: 'USB4 Specification, Version 2.0',
      publisher: 'USB Implementers Forum',
      year: 2022,
      href: 'https://www.usb.org/document-library/usb4r-specification-v20',
    },
  ],
  'usb-power-explained': [
    { ...USB_2, title: 'Universal Serial Bus Specification, Revision 2.0 — §7.2 power distribution and §9.6.3 bMaxPower in the configuration descriptor' },
    USB_3_2,
    {
      kind: 'standard',
      title: 'USB Power Delivery Specification, Revision 3.2',
      publisher: 'USB Implementers Forum',
      href: 'https://www.usb.org/document-library/usb-power-delivery',
    },
    {
      kind: 'standard',
      title: 'Battery Charging Specification, Revision 1.2',
      publisher: 'USB Implementers Forum',
      year: 2010,
      href: 'https://www.usb.org/document-library/battery-charging-v12-spec-and-adopters-agreement',
    },
  ],
  'charge-only-cables': [
    {
      kind: 'standard',
      title: 'USB Type-C Cable and Connector Specification, Release 2.5 (electronically marked cables)',
      publisher: 'USB Implementers Forum',
      href: 'https://www.usb.org/document-library/usb-type-cr-cable-and-connector-specification-release-24',
    },
    { ...USB_2, title: 'Universal Serial Bus Specification, Revision 2.0 — chapter 6, cables and connectors' },
  ],
  'what-the-app-reads': [
    { ...USB_2, title: 'Universal Serial Bus Specification, Revision 2.0 — chapter 9, device framework and descriptors' },
    {
      kind: 'guidance',
      title: 'Defined Class Codes',
      publisher: 'USB Implementers Forum',
      href: 'https://www.usb.org/defined-class-codes',
    },
    {
      kind: 'guidance',
      title: 'libusb-1.0 API reference: device handling and enumeration',
      publisher: 'libusb project',
      href: 'https://libusb.sourceforge.io/api-1.0/group__libusb__dev.html',
    },
    {
      kind: 'guidance',
      title: 'Win32_Battery class',
      publisher: 'Microsoft',
      href: 'https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-battery',
    },
  ],
  'testing-a-cable': [
    { ...USB_2, title: 'Universal Serial Bus Specification, Revision 2.0 — §9.1 device states and bus enumeration' },
    {
      kind: 'guidance',
      title: 'libusb-1.0 API reference: device hotplug event notification',
      publisher: 'libusb project',
      href: 'https://libusb.sourceforge.io/api-1.0/libusb_hotplug.html',
    },
  ],
  'privacy-and-security': [
    {
      kind: 'guidance',
      title: 'Security — Electron documentation',
      publisher: 'OpenJS Foundation',
      href: 'https://www.electronjs.org/docs/latest/tutorial/security',
    },
    {
      kind: 'guidance',
      title: 'Context Isolation — Electron documentation',
      publisher: 'OpenJS Foundation',
      href: 'https://www.electronjs.org/docs/latest/tutorial/context-isolation',
    },
  ],
}
