# FloatChat — marketing site

The public marketing website. **Live: https://www.floatchat.com** (Vercel project `floatchat`).

## Stack
- **Vite + React 19 + React Router** — a client-side SPA. NOT Next.js, despite the `app/` folder naming.
- Tailwind CSS v4, shadcn/ui, Framer Motion, lucide-react.
- Entry: `src/App.tsx` (all routes). Pages live in `app/**/page.tsx`.

## ⚠️ Deploy — use `npm run deploy`, never plain `vercel deploy`
```
npm run deploy
```
This runs: `vite build` → `scripts/prerender.mjs` → `vercel deploy --prebuilt --prod`.

- The site is a client-side SPA, so **prerendering is mandatory for SEO** — `scripts/prerender.mjs` uses Playwright to render all 56 routes to static per-route HTML (`dist/<route>/index.html`).
- A plain `vercel deploy` builds on Vercel's servers where there's no browser → prerender silently skips → every page serves the empty homepage shell again → Google de-indexes everything. **Always `npm run deploy`.**

## SEO setup
- `hooks/use-page-meta.ts` — `usePageMeta(metadata)` applies a page's title/description/canonical/OG to the DOM. The `/vs/*`, `/trust`, `/security`, `/privacy`, `/terms` pages call it (they have Next-style `export const metadata` that is otherwise dead code in a Vite app).
- `src/App.tsx` `CanonicalUrl` component — sets `<link rel="canonical">` to `https://www.floatchat.com{path}` on every route.
- `public/sitemap.xml` (48 URLs), `public/robots.txt`.
- Canonical host is `www.floatchat.com`; `floatchat.com` 307-redirects to it.

## Forms & API (Vercel serverless functions in `api/`)
- `api/subscribe.ts` — footer newsletter form → saves email + IP + geo to **Vercel Postgres** (Neon), table `newsletter_signups` (auto-created).
- `api/book-demo.ts` — `/demo` booking wizard → saves to Postgres table `demo_bookings` (auto-created).
- `api/contact.ts` — `/contact` form → saves name/email/subject/message + IP + geo to Postgres table `contact_submissions` (auto-created).
- Env var: `DATABASE_URL` (injected by the Vercel Postgres/Neon integration).
- `vercel.json` rewrite excludes `/api/` from the SPA fallback.
- `lib/supabase.ts` (`insertLead`) still backs the remaining Supabase forms (e.g. signup) — the contact form no longer uses it.

## Notes
- `floatchat.ai` is a SEPARATE WordPress site (not this project) — should 301-redirect to `.com`.
- GA4 is NOT installed on the site (no traffic analytics yet).
