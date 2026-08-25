#!/usr/bin/env bash
# Launch a local preview of Universal USB Detector.
# Runs in the foreground — press Ctrl-C to stop.
# macOS/Linux equivalent of preview.ps1.
#
#   Usage:  ./scripts/preview.sh [port]      browser preview (default 5195)
#           ./scripts/preview.sh --electron  real desktop app, with USB access
#
# 5195 is this app's port in the registry (Docs_UNI_SIM/dev-preview.md).
# --strictPort means a port clash fails loudly instead of silently serving
# this app on another app's port.
#
# ⚠️ The BROWSER preview shows the "desktop USB bridge isn't available" banner
# and lists no devices — USB access lives in the Electron main process, so that
# is expected, not a fault. Use it for chrome and layout; use --electron for
# anything touching device detection.
#
# --electron is pinned to 5173 because package.json's electron:dev hardcodes
# ELECTRON_START_URL=http://localhost:5173. Change both together or neither.
# First run installs deps if node_modules is missing.

set -euo pipefail
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

if [[ ! -d node_modules ]]; then
  echo "Installing dependencies (first run)…"
  npm install
fi

if [[ "${1:-}" == "--electron" ]]; then
  echo "Starting Vite on 5173 for the Electron shell…"
  npm run dev -- --port 5173 --strictPort &
  VITE_PID=$!
  trap 'kill "$VITE_PID" 2>/dev/null || true' EXIT

  # Wait for Vite to answer before Electron loads the URL, otherwise the window
  # opens on a blank ERR_CONNECTION_REFUSED page.
  for _ in $(seq 1 40); do
    sleep 0.5
    if curl -fsS -o /dev/null http://localhost:5173; then break; fi
  done

  echo "Universal USB Detector (Electron, real USB access)"
  npm run electron:dev
else
  PORT="${1:-5195}"
  echo "Universal USB Detector → http://localhost:$PORT"
  echo "(browser preview: no USB bridge — run with --electron for devices)"
  exec npm run dev -- --port "$PORT" --strictPort
fi
