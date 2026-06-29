# FloatChat DIY Compliance — Reference

FloatChat self-serves compliance at pre-revenue stage. This file lists the
founder tasks, the free resources, and the GDPR / US-law DIY steps. No
attorney is needed for any of this — see SKILL.md for the few hard escalation
triggers where a lawyer IS needed.

## Year-1 cost

~$850-$1,400 total: Iubenda Advanced (~$300/yr) + EU Article 27 Representative
(~€500-1,000/yr). Everything else is free. Compare to ~$15-30K for a BigLaw
turnkey engagement.

## Founder task list

| # | Task | Time | Cost |
|---|---|---|---|
| 1 | Set up support@floatchat.com mailbox + privacy@, dpo@, legal@, security@ aliases | 30 min | $0 |
| 2 | Forward the FINAL package to the developer to publish the pages | 15 min | $0 |
| 3 | Sign 5 self-service sub-processor DPAs (see links below) | 30 min | $0 |
| 4 | Sign up for an EU Article 27 Representative (Prighter or DataRep) | 30 min | ~€500-1,000/yr |
| 5 | Build a "Compliance Evidence" Drive folder (see below) | 30 min | $0 |
| 6 | Produce a DPIA for the AI chatbot using the free CNIL PIA tool | 1 hour | $0 |
| 7 | Fill out 5 Schrems II Transfer Impact Assessments (IAPP template) | 1 hour | $0 |

## Sub-processor DPAs to sign (self-service, ~5 min each)

- DigitalOcean: digitalocean.com/legal/data-processing-agreement
- Vercel: vercel.com/legal/dpa
- OpenAI: openai.com/policies/data-processing-addendum
- Stripe: stripe.com/legal/dpa
- Google (covers GA4): cloud.google.com/terms/data-processing-addendum

Save each countersigned PDF in the Compliance Evidence folder.

## Free resources

| Need | Resource |
|---|---|
| US 50-state breach notification matrix | Perkins Coie — "Security Breach Notification Chart" (perkinscoie.com) |
| Free DPIA software | CNIL PIA tool (cnil.fr/en/pia-tool) |
| DPIA template | UK ICO (ico.org.uk) |
| Schrems II Transfer Impact Assessment template | IAPP (iapp.org) |
| GDPR self-assessment | UK ICO SME hub (ico.org.uk/for-organisations/sme-web-hub) |
| EU SCCs 2021 | European Commission |
| UK IDTA B1.0 | UK ICO |
| EU Article 27 Representative | Prighter (prighter.com) or DataRep (datarep.com) |

## US privacy law — DIY status

- **CCPA + 15 other state laws:** FloatChat is below every applicability
  threshold at $0 ARR / 0 consumers. No legal obligation yet. Keep a one-page
  threshold memo as evidence and re-check quarterly. The Privacy Policy
  voluntarily extends data rights to all US residents anyway.
- **TCPA / FCC AI Voice Ruling / 10DLC:** Not applicable to FloatChat — the
  BYOC model puts these obligations on the customer who connects their own
  Twilio.
- **HIPAA:** FloatChat is not a Business Associate and does not sign BAAs. The
  AUP prohibits PHI; the Customer AUP Attestation enforces it.
- **FTC Section 5:** Keep marketing copy honest — no "indistinguishable from a
  human" or unsubstantiated accuracy claims. The AI disclosure handles the
  rest.
- **California SB-942:** Not in scope — FloatChat generates text only, not
  images/audio/video.

## GDPR — DIY status

- Privacy Policy, DPA, RoPA, Cross-Border Addendum: drafted (v2 BYOC).
- EU SCCs Module 2/3 and UK IDTA B1.0: incorporated in the DPA / Addendum.
- DPIA for the AI chatbot: produce via the free CNIL PIA tool.
- Transfer Impact Assessments: one per sub-processor, via the free IAPP
  template (5 total: DigitalOcean, Vercel, OpenAI, Stripe, Google).
- EU Article 27 Representative + UK Representative: appoint via Prighter or
  DataRep (self-service, no lawyer).
- DPO: not required at FloatChat's scale — document that conclusion.
- Cookie consent: handled by the Iubenda banner.

## Compliance Evidence Drive folder — what to keep

Build a Drive folder named "FloatChat Compliance Evidence" holding: the US
state threshold memo, the BYOC Twilio policy memo, the HIPAA refusal log, the
marketing copy audit memo, the SB-942 applicability memo, the annual Perkins
Coie matrix PDF, the ToS small-claims carve-out note, the DSR register, signed
Customer AUP Attestations, the 5 signed sub-processor DPAs, the DPIA, the 5
Transfer Impact Assessments, the EU Representative contract, and the Iubenda
subscription invoice. This folder IS the privacy program when a regulator or
enterprise buyer asks to see it.
