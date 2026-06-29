---
name: floatchat-compliance
description: >-
  FloatChat's complete compliance reference and operating playbook for the USA,
  UK, and EU markets. Use this skill whenever the user asks anything about
  FloatChat compliance — privacy policy, cookie policy, GDPR, CCPA, US state
  privacy laws, the DPA, sub-processors, data subject / DSAR requests, a data
  breach, adding a new vendor or third-party service, the Iubenda setup, the
  Bring-Your-Own-Twilio (BYOC) model, where a legal document should be
  published, onboarding a new customer, or any FloatChat legal/privacy task.
  Also trigger on questions about My Country Mobile Pte Ltd compliance,
  floatchat.com legal pages, the Article 27 EU Representative, Schrems II
  transfer assessments, or what compliance step comes next. This skill carries
  the authoritative facts — use it instead of guessing, because FloatChat's
  setup has specific choices (Singapore entity, BYOC Twilio, no HIPAA BAAs,
  DIY-not-attorney) that are easy to get wrong.
---

# FloatChat Compliance Skill

This skill is the operating manual for FloatChat's privacy and compliance
program in the USA, UK, and EU. FloatChat is a B2B AI chatbot SaaS. The
compliance program was built deliberately lean for a pre-revenue startup, so
it has specific design choices that must not be guessed at — get the facts
from this skill.

## The five facts that are easy to get wrong

1. **Operating entity is My Country Mobile Pte Ltd** — a Singapore company
   (Registration No. 201535142E), NOT a US company. Governing law is Singapore.
   India is a *separate* company (UCaaS Communication Limited) on a different
   domain — never mix the two.
2. **Bring Your Own Twilio (BYOC).** FloatChat does NOT provide voice or SMS.
   Customers who want voice/SMS connect their own Twilio account and are
   themselves responsible for TCPA, 10DLC, FCC AI Voice Ruling, opt-outs, etc.
   Twilio is NOT a FloatChat sub-processor. Never describe FloatChat as an
   SMS/voice provider.
3. **No HIPAA BAAs.** FloatChat is not a HIPAA Business Associate and does not
   sign Business Associate Agreements. The AUP prohibits Protected Health
   Information. If anyone suggests FloatChat will sign a BAA, that is wrong.
4. **DIY, not attorneys.** At pre-revenue, FloatChat self-serves compliance
   with free templates. Do NOT recommend hiring a lawyer for routine work.
   There are only a few hard escalation triggers (see below).
5. **Five sub-processors only:** DigitalOcean (NYC3 — app hosting), Vercel
   (marketing website), OpenAI (AI inference), Stripe (payments), Google
   Analytics 4 (analytics). Not AWS, not Supabase, not Twilio.

## Quick reference — live URLs

- Privacy Policy (live): https://www.iubenda.com/privacy-policy/32586379
- Cookie Policy (live): https://www.iubenda.com/privacy-policy/32586379/cookie-policy
- Iubenda dashboard: https://www.iubenda.com/app/en/flow/4537302
- Master document Sheet: https://docs.google.com/spreadsheets/d/17N_fM79oqPq_Wv6E7M1T6eJJuMvxIQGnVDhSRthePYw/edit
- Compliance Drive folder: https://drive.google.com/drive/folders/13brbG5TT0eGeRg4RaSphqYLZ6V9Fb7zI

## Company details (for filling any form)

- Legal entity (USA/UK/EU): My Country Mobile Pte Ltd
- Registration: Singapore Company Registration No. 201535142E
- Registered office: 8 Temasek Boulevard #32-01 Suntec Tower Three, Singapore 038988
- Domain: floatchat.com
- Governing law: Singapore
- Contacts: privacy@floatchat.com · dpo@floatchat.com · legal@floatchat.com · security@floatchat.com · support@floatchat.com
- India entity (separate, do not mix): UCaaS Communication Limited

## How to use this skill

This skill answers two kinds of request:

1. **Reference questions** — "where does the DPA go?", "what's our cookie
   policy URL?", "are we GDPR compliant?". Answer from this file and the
   reference files below.
2. **Operating tasks** — events that trigger a defined procedure: adding a new
   vendor, a data subject request, a data breach, onboarding a customer. For
   these, follow the matching playbook in `references/playbooks.md`.

When a request needs detail beyond this file, read the relevant reference:

- `references/documents.md` — all 13 compliance documents, their links, and
  exactly where each one is published or used. Read this for any "where does X
  go" or "what documents do we have" question.
- `references/playbooks.md` — step-by-step procedures for compliance events
  (new sub-processor, data subject request, data breach, customer onboarding,
  AI feature change). Read this whenever something *happens* that needs a
  response.
- `references/iubenda.md` — how the Iubenda setup works, how to embed the
  policies on floatchat.com, how to add/remove a service. Read this for any
  Iubenda or cookie-banner question.
- `references/diy-compliance.md` — the founder DIY task list, free resources
  (Perkins Coie, CNIL PIA tool, IAPP, ICO), GDPR self-serve steps, and the
  sub-processor DPA signing links. Read this for "what do I still have to do"
  or any GDPR/US-law DIY question.

## The compliance posture in one paragraph

FloatChat's Privacy Policy and Cookie Policy are generated and hosted by
Iubenda (live now). Five other public documents (Terms of Service, Acceptable
Use Policy, Accessibility Statement, Sub-processor List, Data Processing
Agreement) are published as pages on floatchat.com. Four documents are
customer-contract or internal-sales material (Cross-Border Transfer Addendum,
Customer AUP Attestation, Sales Qualification Questionnaire). Two are internal
playbooks (Incident Response Plan, Records of Processing Activities). The
cookie banner auto-enforces GDPR, 16 US state laws, LGPD, and Switzerland's
FADP. International transfers rely on the 2021 EU SCCs and the UK IDTA B1.0.

## When DIY stops — the only hard escalation triggers

Recommend involving a lawyer ONLY when one of these is actually happening.
Until then, DIY is correct and a lawyer is an unnecessary expense.

- A confirmed data breach of any kind (the GDPR 72-hour clock starts).
- A regulator inquiry — FTC, a US state Attorney General, the FCC, or an EU
  Data Protection Authority.
- An enterprise customer returns a redlined DPA.
- A class-action demand letter (e.g., TCPA or privacy).
- An intellectual-property infringement claim.
- The company crosses roughly $25K ARR or signs its first enterprise customer.

For everything else — new vendors, routine data requests, policy updates,
adding features — follow the playbooks and self-serve.

## Tone and framing

FloatChat is a small pre-revenue startup. Keep advice proportionate: practical,
low-cost, and actionable. Do not over-lawyer routine tasks. Do not invent
obligations that do not apply at this scale (for example, FloatChat is under
every US state privacy-law revenue threshold and does not currently need a
Data Protection Officer). When in doubt about applicability, say so plainly
and point to the threshold rather than assuming the strict reading.

If the user asks about India, note that it is a separate entity and domain
with its own document set, kept deliberately apart from the USA/UK/EU program
this skill covers.
