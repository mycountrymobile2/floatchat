/**
 * One-off asset generator: renders the hero's Spline 3D scene in a headless
 * browser and screenshots it to a static poster (public/hero-bot.png).
 *
 * The homepage shows this poster by default and only loads the live ~4.5 MB
 * Spline runtime on hover — so PageSpeed / Lighthouse never pays the 3D cost.
 *
 * Re-run with `npm run capture:bot` if the Spline scene changes.
 */
import { chromium } from "playwright"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(__dirname, "../public/hero-bot.png")
const SCENE = "https://prod.spline.design/NMZWNEaWEPuubtjF/scene.splinecode"
const SIZE = 640 // matches the hero's inner Spline box

const html = `<!doctype html><html><head><style>
  html,body{margin:0;background:transparent}
  spline-viewer{width:${SIZE}px;height:${SIZE}px;display:block}
</style></head><body>
<script type="module" src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js"></script>
<spline-viewer url="${SCENE}" loading-anim-type="none"></spline-viewer>
</body></html>`

const browser = await chromium.launch()
try {
  const page = await browser.newPage({
    viewport: { width: SIZE, height: SIZE },
    deviceScaleFactor: 2,
  })
  await page.setContent(html, { waitUntil: "load" })
  console.log("⏳ Loading Spline scene…")
  await page.waitForSelector("spline-viewer canvas", { timeout: 60000 })
  await page.waitForTimeout(7000) // let the scene settle on its idle frame
  const el = await page.$("spline-viewer")
  await el.screenshot({ path: OUT, omitBackground: true })
  console.log(`✓ Saved poster → ${OUT}`)
} finally {
  await browser.close()
}
