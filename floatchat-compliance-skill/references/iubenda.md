# FloatChat Iubenda Setup — Reference

How FloatChat's Iubenda configuration works, and how to make changes.

## Account and project

- Iubenda plan: Advanced (paid annually, ~$300/yr).
- Project: floatchat.com
- Project owner of record: My Country Mobile Pte Ltd, Singapore Reg 201535142E.
- Dashboard: https://www.iubenda.com/app/en/flow/4537302
- Privacy Policy editor: https://www.iubenda.com/app/en/privacy-policy-generator/3256416/edit
- Cookie banner configurator: https://www.iubenda.com/app/en/cookie_solutions/1251744/configurator

## What Iubenda hosts (live)

- Privacy Policy: https://www.iubenda.com/privacy-policy/32586379
- Cookie Policy: https://www.iubenda.com/privacy-policy/32586379/cookie-policy

These auto-update whenever the project's service list or settings change.

## Cookie consent banner

- Embed snippet: `<script type="text/javascript" src="https://embeds.iubenda.com/widgets/9487e344-5262-4a14-903e-c455cf6c77e7.js"></script>`
- Must be installed inside `<head>` on every page of floatchat.com, before any
  other scripts. It cannot be loaded via Google Tag Manager.
- It renders the banner, blocks third-party scripts before consent, and
  exposes the preferences panel.
- Auto-configured for: GDPR (all 27 EU countries), LGPD (Brazil), 16 US state
  privacy laws, Switzerland FADP, IAB TCF, and Google Consent Mode v2.
- GDPR "broader protection" is applied to all users globally (strongest
  setting).

## Services declared in the policy (5)

1. DigitalOcean — application hosting, database, storage (NYC3, US)
2. Vercel — marketing website hosting (US)
3. OpenAI API — AI chat inference (US)
4. Stripe — payment processing (US)
5. Google Analytics 4 — marketing-site analytics, consent-gated (US)

Twilio was deliberately removed when FloatChat moved to the BYOC model. Do not
re-add it. Supabase and AWS were also removed (never actually used).

## How to add or remove a service

1. Open the Privacy Policy editor.
2. To add: click "Add service", search for the vendor, click +. Then click the
   pencil icon and set it as a "service provider / processor" (not a
   "third-party service") for correct CCPA classification.
3. To remove: click the trash icon on the service row.
4. The live Privacy Policy updates automatically within minutes.
5. Always pair this with updating the Sub-processor List document and the
   floatchat.com/subprocessors page, and emailing change-notification
   subscribers (see playbooks.md, procedure 1).

## How to put the policies on floatchat.com — recommended approach

Three options exist; the recommended one is the third:

1. **Direct link** — footer links straight to the iubenda.com URLs. Works, but
   the visitor leaves the floatchat.com domain.
2. **Redirect** — floatchat.com/privacy-policy redirects to the iubenda.com
   URL. The visitor still ends up on iubenda.com. Not recommended.
3. **Embed (recommended)** — create real pages at floatchat.com/privacy-policy
   and floatchat.com/cookie-policy and use Iubenda's "Embed the text in the
   body" snippet. The policy content renders on the floatchat.com domain, the
   URL stays on floatchat.com, and Iubenda still auto-maintains the content.

To get the embed code: in the Iubenda dashboard, open the Privacy Policy →
"Embed" → "Embed the text in the body" tab. Do the same for the Cookie Policy.

## Legislation settings (already configured — leave as-is unless reviewing)

- Enable GDPR disclosures: ON
- Apply GDPR broader protection: All users
- Enable disclosures for users in the United States: ON
- FADP (Switzerland), LGPD (Brazil): handled by the cookie banner auto-config

## Common Iubenda tasks

- **Domain shows wrong (e.g., floatchat.ai):** the project name and website
  URL are edited in the project Settings (gear icon).
- **A service shows "needs values":** open the service, mark it as a service
  provider/processor; Iubenda fills sensible defaults.
- **GDPR scope reverts to "EU only" after navigating:** re-select "All users"
  under "Apply GDPR's broader protection standards to".
