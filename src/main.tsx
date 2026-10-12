import React from 'react'
import ReactDOM from 'react-dom/client'
import { UniversalProvider, type ProductCode } from '@unisim/sdk'
import App from './App'
import './index.css'

// Universal USB Detector has no accounts of its own — everything runs locally.
// We mount UniversalProvider for the shared UniversalAppsNavBar (suite switcher,
// changelog, preferences) and the "There are X total users (Y live)" line at
// the foot of its menu, which reads the suite-wide count.
//
// This bundle only ever ships as the Electron desktop app (see vite.config.ts),
// so the presence beat is OFF (`presence: false`, 2026-10-12): the app keeps no
// install id and never reports itself to the user count. What it still asks a
// server for is the changelog and that count — neither carries anything about
// this computer or the devices this app lists. The anon key is a publishable
// key that ships in every suite web bundle; RLS is the boundary. `noAccounts`
// hides the profile icon's account rows and the sign-in dialog, so nothing here
// offers a sign-in. See PRIVACY.md.
const universalConfig = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://rygfxgalojojppxmhddo.supabase.co',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Z2Z4Z2Fsb2pvanBweG1oZGRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTY4MjUsImV4cCI6MjA5NDMzMjgyNX0.hLy_vt9vY_rdPKF3nL32yAuMCD604E3CH5VM7D7CaNE',
  product: 'usb' as ProductCode,
  // No auth backend for this app, so the navbar drops its account rows and
  // sign-in dialog. See ARCHITECTURE.md.
  noAccounts: true,
  // The desktop app is not counted: no install id, no beat. See above.
  presence: false,
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UniversalProvider config={universalConfig}>
      <App />
    </UniversalProvider>
  </React.StrictMode>
)
