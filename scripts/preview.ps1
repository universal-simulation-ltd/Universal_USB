# Launch a local preview of Universal USB Detector.
# Runs in the foreground — press Ctrl-C to stop.
# Windows equivalent of preview.sh.
#
#   Usage:  .\scripts\preview.ps1 [port]      browser preview (default 5195)
#           .\scripts\preview.ps1 -Electron   real desktop app, with USB access
#
# 5195 is this app's port in the registry (Docs_UNI_SIM/dev-preview.md).
# --strictPort means a port clash fails loudly instead of silently serving
# this app on another app's port.
#
# ⚠️ The BROWSER preview shows the "desktop USB bridge isn't available" banner
# and lists no devices — USB access lives in the Electron main process, so that
# is expected, not a fault. Use it for chrome and layout; use -Electron for
# anything touching device detection.
#
# -Electron is pinned to 5173 because package.json's electron:dev hardcodes
# ELECTRON_START_URL=http://localhost:5173. Change both together or neither.
# First run installs deps if node_modules is missing.

param(
    [switch]$Electron,
    [string]$Port = '5195'
)

$ErrorActionPreference = 'Stop'
Push-Location (Join-Path $PSScriptRoot '..')
try {
    if (-not (Test-Path 'node_modules')) {
        Write-Host "Installing dependencies (first run)..." -ForegroundColor Cyan
        npm install
        if ($LASTEXITCODE -ne 0) { throw "npm install failed" }
    }

    if ($Electron) {
        Write-Host "Starting Vite on 5173 for the Electron shell..." -ForegroundColor Cyan
        $vite = Start-Process -PassThru -NoNewWindow npm `
            -ArgumentList 'run', 'dev', '--', '--port', '5173', '--strictPort'
        try {
            # Wait for Vite to answer before Electron loads the URL, otherwise
            # the window opens on a blank ERR_CONNECTION_REFUSED page.
            $ready = $false
            foreach ($i in 1..40) {
                Start-Sleep -Milliseconds 500
                try {
                    Invoke-WebRequest -Uri 'http://localhost:5173' -UseBasicParsing -TimeoutSec 2 | Out-Null
                    $ready = $true; break
                } catch { }
            }
            if (-not $ready) { throw "Vite did not come up on 5173 within 20s" }

            Write-Host "Universal USB Detector (Electron, real USB access)" -ForegroundColor Green
            npm run electron:dev
        } finally {
            if ($vite -and -not $vite.HasExited) { Stop-Process -Id $vite.Id -Force }
        }
    } else {
        Write-Host "Universal USB Detector -> http://localhost:$Port" -ForegroundColor Green
        Write-Host "(browser preview: no USB bridge - run with -Electron for devices)" -ForegroundColor DarkYellow
        npm run dev -- --port $Port --strictPort
    }
} finally {
    Pop-Location
}
