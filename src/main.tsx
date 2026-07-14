import React from 'react'
import ReactDOM from 'react-dom/client'
import { UniversalProvider, type ProductCode } from '@unisim/sdk'
import App from './App'
import './index.css'

// Universal USB Detector has no accounts of its own — everything runs locally.
// We still mount UniversalProvider so the shared UniversalAppsNavBar (suite
// switcher, changelog) works, but in offline mock-auth mode: no real Supabase
// project, no network. `mockAuth` only activates when `cookieDomain` is unset
// (see the SDK provider), so this can never touch production auth.
//
// `product` is typed as ProductCode (the usage/entitlement code), which doesn't
// include 'usb' yet — we cast it. This is safe here: the only place the SDK
// reads `product` is a cookie-storage decision gated behind `cookieDomain`,
// which we never set, and we mount no UsageTracker. Add 'usb' to ProductCode
// (and the DB enum) if/when this app ever emits usage telemetry.
const universalConfig = {
  supabaseUrl: '',
  supabaseAnonKey: '',
  product: 'usb' as ProductCode,
  mockAuth: true,
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UniversalProvider config={universalConfig}>
      <App />
    </UniversalProvider>
  </React.StrictMode>
)
