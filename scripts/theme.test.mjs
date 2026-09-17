// The theme key is written down TWICE, and this is what stops the two drifting.
//
// `src/stores/themeStore.ts` names it for the SDK's store; `index.html` names it
// again in the inline script that puts `.dark` on `<html>` before the first
// paint, which is the only place early enough to matter (the store applies the
// same class, but not until the module bundle has parsed). There is no way to
// share one constant between a bundled module and a script that must run during
// head parsing — so instead, renaming either without the other fails here.
//
// It is not a style rule. The key IS every user's saved choice: change it and
// everybody who chose dark is silently back on light.
//
// Run: npm run test:theme  (plain node:test, no dependencies)
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import assert from 'node:assert/strict'

const read = (rel) => readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8')

/** The key as the store declares it: `createThemeStore('…')`. */
function storeKey() {
  const match = /createThemeStore\('([^']+)'\)/.exec(read('src/stores/themeStore.ts'))
  if (!match) throw new Error('themeStore.ts no longer calls createThemeStore with a literal key')
  return match[1]
}

/** The `<head>` script, i.e. everything before the module bundle can run. */
function headScript() {
  const html = read('index.html')
  return html.slice(0, html.indexOf('</head>'))
}

test('the pre-paint script reads the same localStorage key as the theme store', () => {
  assert.ok(headScript().includes(`localStorage.getItem('${storeKey()}')`))
})

// Since SDK 0.143 the app's key is an override: absent, the global choice
// applies, and the pre-paint script has to know that as well as the store does.
test("the pre-paint script falls back to Global preferences' universal:color-scheme when the app has no override", () => {
  assert.ok(headScript().includes("localStorage.getItem('universal:color-scheme')"))
})

test('the pre-paint script puts the dark class on <html> before anything is painted', () => {
  const head = headScript()
  assert.ok(head.includes("classList.add('dark')"))
  // 'system' has to be honoured here too, or somebody on the OS setting gets
  // the light ground first and the dark one once the bundle catches up.
  assert.ok(head.includes('prefers-color-scheme: dark'))
})

test('the pre-paint script never removes the class — light is the default, so it only ever adds', () => {
  assert.ok(!headScript().includes("classList.remove('dark')"))
})
