/**
 * Post-build prerender step.
 *
 * The site is a client-side React SPA — without this, every route serves the
 * same empty index.html shell, so Google indexes only the homepage.
 *
 * This serves the freshly-built dist/, drives a headless browser to each route
 * (letting React + usePageMeta run), and writes the rendered HTML — with the
 * correct per-route <title>, <meta>, and <link rel="canonical"> — to
 * dist/<route>/index.html. Vercel then serves real HTML to Googlebot.
 *
 * Degrades gracefully: if no browser is available (e.g. a server-side Vercel
 * build), it skips prerendering instead of failing the build.
 */
import http from "node:http"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { chromium } from "playwright"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.resolve(__dirname, "../dist")

const routes = [
  "/", "/pricing", "/demo",
  "/ai-agent", "/live-chat", "/inbox", "/voice", "/sms", "/email",
  "/whatsapp", "/help-center", "/automation", "/integrations",
  "/ai-agents", "/ai-agents/customer-service", "/ai-agents/sales",
  "/ai-agents/booking", "/ai-agents/lead-qualification", "/ai-agents/agent-builder",
  "/agentic-ai", "/products/omnichannel-inbox", "/products/agent-copilot",
  "/products/analytics",
  "/solutions/ecommerce", "/solutions/saas", "/solutions/healthcare",
  "/solutions/real-estate", "/solutions/education", "/solutions/restaurants",
  "/compare",
  "/vs/intercom", "/vs/zendesk", "/vs/tidio", "/vs/freshchat", "/vs/hubspot",
  "/vs/help-scout", "/vs/front", "/vs/drift", "/vs/gorgias", "/vs/crisp",
  "/vs/tawk", "/vs/chatmitra",
  "/customers", "/help", "/docs", "/changelog", "/templates", "/status",
  "/about", "/trust", "/security", "/contact",
  "/privacy", "/terms", "/dpa", "/cookies", "/aup", "/accessibility", "/subprocessors", "/subprocessors/subscribe",
  "/blog",
  "/blog/floatchat-vs-intercom", "/blog/ai-customer-support-bundled",
  "/blog/free-live-chat-widget", "/blog/whatsapp-customer-service",
  "/blog/switch-from-zendesk", "/blog/10dlc-sms-guide",
  "/blog/ai-captain-setup", "/blog/ecommerce-support-playbook",
]

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript",
  ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".gif": "image/gif", ".ico": "image/x-icon",
  ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf",
  ".txt": "text/plain", ".xml": "application/xml", ".map": "application/json",
}

async function main() {
  const shellPath = path.join(DIST, "index.html")
  if (!fs.existsSync(shellPath)) {
    console.error("✗ dist/index.html not found — run `vite build` first.")
    process.exit(1)
  }
  // Keep the clean SPA shell in memory so prerendered output never feeds back in.
  const cleanShell = fs.readFileSync(shellPath, "utf8")

  let browser
  try {
    browser = await chromium.launch()
  } catch (e) {
    console.warn(`\n⚠  Prerender skipped — no headless browser available.\n   (${e.message})\n   The SPA build still works; run \`vercel build\` locally for prerendered output.\n`)
    process.exit(0)
  }

  // Static server: real files win; everything else gets the clean SPA shell.
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0])
    const filePath = path.join(DIST, urlPath)
    if (filePath.startsWith(DIST) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.writeHead(200, { "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream" })
      fs.createReadStream(filePath).pipe(res)
    } else {
      res.writeHead(200, { "Content-Type": "text/html" })
      res.end(cleanShell)
    }
  })
  await new Promise((r) => server.listen(0, r))
  const port = server.address().port
  console.log(`\n🧩 Prerendering ${routes.length} routes…\n`)

  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })

  // Block iubenda's cookie-banner network requests during prerender. The
  // <script src="embeds.iubenda.com/…"> stays in the HTML (it loads live on
  // real visits), but we don't want Playwright to execute it and bake the
  // banner DOM + a stale consent state into the 56 static files.
  await page.route("**/*", (route) => {
    const url = route.request().url()
    // Block iubenda + the FloatChat live-chat widget so their DOM isn't baked
    // into the 58 prerendered files. Both load live on real visits.
    if (/(?:embeds|cdn|cs)\.iubenda\.com/.test(url)) return route.abort()
    if (/app\.floatchat\.com\/packs/.test(url)) return route.abort()
    return route.continue()
  })

  let ok = 0
  let fail = 0

  for (const route of routes) {
    try {
      await page.goto(`http://localhost:${port}${route}`, { waitUntil: "load", timeout: 45000 })
      // Wait for React to mount, then for usePageMeta's effect to set head tags.
      await page
        .waitForFunction(() => document.querySelector("#root")?.children.length > 0, { timeout: 15000 })
        .catch(() => {})
      await page.waitForTimeout(1600)

      const html = "<!doctype html>\n" + (await page.evaluate(() => document.documentElement.outerHTML))
      const outPath = route === "/" ? shellPath : path.join(DIST, route, "index.html")
      fs.mkdirSync(path.dirname(outPath), { recursive: true })
      fs.writeFileSync(outPath, html, "utf8")

      const title = await page.title()
      console.log(`  ✓ ${route.padEnd(34)} ${title.slice(0, 52)}`)
      ok++
    } catch (e) {
      console.log(`  ✗ ${route.padEnd(34)} ${e.message}`)
      fail++
    }
  }

  await browser.close()
  await new Promise((r) => server.close(r))
  console.log(`\n✅ Prerendered ${ok} routes${fail ? ` · ${fail} failed` : ""}.\n`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
