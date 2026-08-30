import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import pkg from './package.json' with { type: 'json' }

// ⚠️ This bundle is NOT deployed to the web. Unlike the path-proxied Universal
// Apps, USB needs native access, so the only shipped artifact is the Electron
// desktop build (`npm run dist`, see .github/workflows/mac-release.yml).
// `opensource.unisim.co.uk/usb` is a STATIC DOWNLOAD PAGE served by the
// `opensource-portal` Worker — it is not this app. The config used to set
// `base: '/usb/'` in production and say so in a comment, which asserted a
// deployment that has never existed.
//
// `base` therefore only has two honest cases: the `desktop` build loads
// index.html over `file://`, so assets must resolve relative to it (`./`);
// everything else (dev, `npm run preview`, any ad-hoc static host) is served
// from a root, so `/`.
export default defineConfig(({ mode }) => ({
  base: mode === 'desktop' ? './' : '/',
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version)
  },
  plugins: [react(), tailwindcss()]
}))
