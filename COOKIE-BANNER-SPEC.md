# FloatChat Cookie Banner — Implementation & Compliance Spec

**Owner:** My Country Mobile Pte Ltd (Singapore Company Reg No. 201535142E)
**Domain:** floatchat.com
**Banner provider:** Iubenda (Cookie Solution, Advanced plan)
**Iubenda banner ID:** `9487e344-5262-4a14-903e-c455cf6c77e7`
**Dashboard:** https://www.iubenda.com/app/en/flow/4537302
**Last updated:** 2026-05-20

This document is the single source of truth for what FloatChat's cookie banner must contain, how it should behave, and how to verify it. Use it as a checklist before going live and during quarterly compliance reviews.

---

## 1. Installation status

The Iubenda Cookie Solution embed script is installed in `index.html` inside `<head>`, before all SEO and font tags:

```html
<link rel="preconnect" href="https://embeds.iubenda.com" crossorigin />
<link rel="preconnect" href="https://cdn.iubenda.com" crossorigin />
<script type="text/javascript" src="https://embeds.iubenda.com/widgets/9487e344-5262-4a14-903e-c455cf6c77e7.js"></script>
```

Because this is a Vite SPA, `index.html` is the single shell served on every route, so the banner loads on every page automatically. The script must NOT be loaded via Google Tag Manager — Iubenda's auto-blocking relies on running before any third-party script attaches.

---

## 2. What the banner MUST contain (legal floor)

These items are required by GDPR, CCPA/CPRA, LGPD, or FADP. Iubenda auto-fills most of them, but verify each is actually visible on the live banner.

| # | Requirement | Source |
|---|---|---|
| 1 | Identity of the data controller — "FloatChat is operated by My Country Mobile Pte Ltd, Singapore" | GDPR Art. 13 |
| 2 | Plain-language purpose of the trackers (no legalese) | GDPR Art. 12 transparency |
| 3 | Three equally prominent buttons on the first layer: Accept all / Reject all / Manage preferences | EDPB 03/2022; CNIL fines |
| 4 | Link to Cookie Policy (`/cookies` on floatchat.com or the Iubenda URL) | GDPR Art. 13(1)(c); ePrivacy |
| 5 | Link to Privacy Policy (`/privacy` on floatchat.com) | GDPR Art. 13 |
| 6 | "Do Not Sell or Share My Personal Information" / "Your Privacy Choices" link, visible in banner or site footer | CCPA/CPRA + 6 other US state laws |
| 7 | Granular category toggles in the preferences panel | GDPR Art. 7(2); CJEU Planet49 |
| 8 | Floating reopen icon, always visible after acceptance | CCPA "as easy to opt out as opt in" |
| 9 | No pre-ticked checkboxes for non-essential categories | CJEU Planet49 (2019) |
| 10 | No cookie walls (user can refuse without losing site access) | EDPB Guidelines 05/2020 |

---

## 3. Recommended banner copy

Configure in Iubenda dashboard → Cookie Solution → Configurator → Text settings:

**Headline**

> We use cookies and similar trackers

**Body** (keep under 3 lines)

> FloatChat (operated by My Country Mobile Pte Ltd) uses trackers for site functionality, payment processing, AI features, and analytics. We do not sell your personal data. See our [Cookie Policy](https://www.floatchat.com/cookies) and [Privacy Policy](https://www.floatchat.com/privacy).

**Buttons** (left to right, all same size and contrast)

- Accept all
- Reject all
- Manage preferences

**Why this copy:**
- Names the legal entity (Article 13 compliance)
- States "we do not sell" — avoids triggering the heavier CCPA "right to opt out of sale" pathway
- Lists what trackers actually do, not abstract categories

---

## 4. Categories to declare

Map FloatChat's five sub-processors onto Iubenda's category taxonomy. Do not enable categories for which no service is active.

| Category | State | Services in category | Lawful basis |
|---|---|---|---|
| Strictly Necessary | Always on, cannot disable | Stripe (payments), OpenAI (auth & session) | Contract performance — Art. 6(1)(b) |
| Functional | On unless rejected | DigitalOcean and Vercel infrastructure cookies | Legitimate interest — Art. 6(1)(f) |
| Measurement / Analytics | Off by default, opt-in | Google Analytics 4 | Consent — Art. 6(1)(a) |
| Marketing | Disable (not currently used) | — | — |
| Profiling | Disable (not currently used) | — | — |

Empty categories confuse users and look like hidden tracking. Only show what's active.

---

## 5. Behavior requirements (UX)

- Banner appears within **1 second** of first page load
- Banner covers no more than **30% of viewport** (above the fold or as a bottom bar)
- "Reject all" is a **single click**, same prominence as Accept
- Choice **closes the banner** — no second confirmation
- Choice is **remembered for 6–12 months** (Iubenda default: 12 months)
- Floating **"Privacy choices"** icon stays bottom-left on every page after dismissal
- Honors **Global Privacy Control (`Sec-GPC: 1`)** as automatic Reject (Colorado, Connecticut, California requirement)
- **Keyboard-navigable** — Tab/Enter work, ESC closes
- **Screen-reader accessible** — buttons must have proper ARIA labels (Iubenda handles this)
- **No cookie walls** — closing with X defaults to Reject, not Accept
- **No auto-loading** of GA4, Meta Pixel, or any analytics before consent

---

## 6. Iubenda dashboard configuration checklist

Sign in at https://www.iubenda.com/app/en/flow/4537302 → Cookie Solution → Configurator. Confirm each setting:

- [ ] **Domain settings** — both `floatchat.com` AND `www.floatchat.com` listed (otherwise consent doesn't persist across the apex/subdomain)
- [ ] **Legislations enabled** — GDPR ✓, LGPD ✓, US state laws ✓, Switzerland FADP ✓
- [ ] **GDPR scope** — "Apply broader protection to all users" (strongest setting; gives every visitor GDPR rights regardless of location)
- [ ] **Per-category cookie blocking** — ON (this is what actually stops GA4 from firing pre-consent)
- [ ] **Google Consent Mode v2** — ON
- [ ] **Reject button on first layer** — ON (not buried under Manage preferences)
- [ ] **Privacy preferences widget** — Position bottom-left, always visible
- [ ] **Auto-blocking** — ON for `<script>` tags with `type="text/plain"` and known third-party domains
- [ ] **IAB TCF v2.2** — ON if you ever add programmatic advertising; OFF is fine for now
- [ ] **Cookie expiration** — 12 months

---

## 7. Common audit traps (banner must NOT do these)

- ❌ Show Accept in green and Reject in grey (asymmetric prominence — EDPB 03/2022 violation)
- ❌ Force users into a second screen to refuse
- ❌ Auto-load GA4, Meta Pixel, or any analytics before consent
- ❌ Set non-essential cookies before consent
- ❌ Require an account to read the privacy or cookie policy
- ❌ Show different text in different languages but only ask consent once
- ❌ Treat "closed the banner" as implicit consent
- ❌ Add Marketing or Profiling categories with no services in them
- ❌ Load the script via Google Tag Manager (breaks pre-consent blocking)

---

## 8. Build and deploy

### Local production preview (recommended first test)

```powershell
cd C:\Users\Admin\Documents\floatchat\floatchat
npm install
npm run build:spa
npm run preview
```

Then open **http://localhost:4173/** in an **incognito window** (incognito is critical — your normal browser will have your existing consent state).

### Deploy to production

Per `CLAUDE.md`, always use:

```powershell
npm run deploy
```

This runs `vite build` → Playwright prerender (so Google sees static HTML for SEO) → `vercel deploy --prebuilt --prod`. Do NOT use plain `vercel deploy` — that skips the prerender step and de-indexes the site.

---

## 9. Acceptance test — the 7-point sanity check

The banner is properly configured when an EU visitor in a fresh incognito window can:

1. See a banner that names "My Country Mobile Pte Ltd"
2. Click **Reject all** in one action
3. Reload the page and NOT see the banner again
4. Verify in DevTools → Network that no `google-analytics.com` / `analytics.google.com` request fired
5. Verify in DevTools → Application → Cookies that no `_ga` or `_ga_*` cookies exist
6. Click the floating Privacy Choices icon to reopen the panel and change their mind
7. See three categories (Necessary, Functional, Analytics) with toggles, plus links to the full Cookie Policy and Privacy Policy

If all 7 pass, the banner is GDPR + CCPA + LGPD + FADP compliant. If anything fails, fix it in the Iubenda dashboard — no code change required, the script reads its config live from Iubenda's CDN.

---

## 10. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Banner never shows | Browser extension blocking Iubenda (uBlock, Privacy Badger, Brave Shields) | Disable extensions in incognito, or test in a different browser |
| Banner never shows + DevTools Console shows `Failed to load embeds.iubenda.com` | Network or firewall blocking iubenda.com | Try a different network or VPN |
| Banner never shows + no errors | Iubenda dashboard not configured for the current domain | Check Iubenda → Cookie Solution → Configurator → "URL of the website" lists both `floatchat.com` and `localhost` for testing |
| Banner shows once, never again, but cookies were cleared | Existing accept in this browser profile | Use a fresh incognito window |
| Banner shows but GA4 still fires before accept | Auto-blocking didn't catch GA4 | Dashboard → Configurator → confirm "Per-category cookie blocking" is ON |
| Consent state lost when navigating apex → www | Domain not whitelisted for both | Add both `floatchat.com` AND `www.floatchat.com` in project Settings |
| Banner copy or button labels still in Italian | Default language not set | Dashboard → Project settings → Default language: English |

---

## 11. Quarterly review (every 90 days)

- [ ] Run the 7-point acceptance test
- [ ] Confirm no new third-party scripts added to the site without a matching Iubenda category
- [ ] Check the Cookie Policy lists every cookie the site actually sets (Iubenda's auto-scan in dashboard)
- [ ] Verify the floating Privacy Choices icon still appears on every page
- [ ] If a new sub-processor was added, ensure it appears in the Iubenda category map AND in `floatchat.com/subprocessors`

---

## 12. References

- Iubenda Cookie Solution docs: https://www.iubenda.com/en/help/680-cookie-solution
- EDPB Guidelines 03/2022 on dark patterns: https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-032022-dark-patterns-social-media-platform_en
- CCPA / CPRA "Your Privacy Choices" icon requirements: https://oag.ca.gov/privacy/ccpa
- Global Privacy Control specification: https://globalprivacycontrol.org/
- floatchat-compliance skill — references/iubenda.md
- Project `CLAUDE.md` — deploy command
