# FloatChat Compliance Documents — Full Reference

All 13 USA/UK/EU compliance documents, their links, and exactly where each one
is published or used. The documents are owned by My Country Mobile Pte Ltd.

## TIER 1 — Public-facing (7 documents)

| Document | Where it goes | Google Doc |
|---|---|---|
| Privacy Policy (v2 BYOC) | Hosted live by Iubenda — link/embed it | https://docs.google.com/document/d/15FX18binzaIwscOHKngWhMeiz9naJhy0e3bAwDpHB2w/edit |
| Cookie Policy | Hosted live by Iubenda — link/embed it | https://docs.google.com/document/d/1t3c9A5Taa-tvcJUHjUGdolHYLcxjxW87_GGmAkpZ4gg/edit |
| Terms of Service (v2 BYOC) | Publish at floatchat.com/terms | https://docs.google.com/document/d/1Edi65Vf6PdH7MHiX_1ZQnfHdb4-7EwYIfKQ8Qkwykqw/edit |
| Acceptable Use Policy (v2 BYOC) | Publish at floatchat.com/aup | https://docs.google.com/document/d/1DSrpxg2dPJW_WIFGm-7MxN2zN9ycfu6pB_tsVKThsvc/edit |
| AI Disclosure + Implementation Guide | Disclosure copy goes IN the chat widget | https://docs.google.com/document/d/1M2VMa1q3rBXfy5IrvwegVJHe5ObBESk2OLmSk8LHnXo/edit |
| Accessibility Statement | Publish at floatchat.com/accessibility | https://docs.google.com/document/d/1DM3eGOgG-n8W43aOtGn2MOqabS2QbdvQcWkeHbWgnZM/edit |
| Sub-processor List (v2 BYOC) | Publish at floatchat.com/subprocessors | https://docs.google.com/document/d/1VfB1r8-7EZsxad5RfSzvUnyECRU9-l4X4U7G7NEHGdI/edit |

## TIER 2 — Customer contracts (4 documents — NOT website pages)

| Document | Where it goes | Google Doc |
|---|---|---|
| Data Processing Agreement (v2 BYOC) | Publish at floatchat.com/dpa AND send to business customers | https://docs.google.com/document/d/1PZEh786iOEUNa_Wh7uDeKR1dPZdaRTQItfC7qhs9ESU/edit |
| Cross-Border Transfer Addendum | Bundled with the DPA when an EU/UK customer signs | https://docs.google.com/document/d/1MdqvyAKGVs04h0oOgge4S0_ryKAVrir5V5mC2iDAsGI/edit |
| Customer AUP Attestation | Sent to every customer at signup + once a year | https://docs.google.com/document/d/1Ar1zKcYuKq6IL_y0BgYZZ4D-e4l3OCklgURTTDl5Bns/edit |
| Sales Qualification Questionnaire | Internal sales-team CRM form (never customer-facing) | https://docs.google.com/document/d/1FGvze8xKhrNmJY61xOkD8ZbR1seE1Hbe1DHEgf_l38o/edit |

## TIER 3 — Internal playbooks (2 documents — NEVER public)

| Document | Where it lives | Google Doc |
|---|---|---|
| Incident Response Plan (v2 BYOC) | Internal Notion / wiki — confidential | https://docs.google.com/document/d/1bFxWcBvxr-j7UEPfyJ0JblJsGY9TzvFT106dJhlqL6U/edit |
| Records of Processing Activities (RoPA) (v2 BYOC) | Internal Drive — shown to regulators on request | https://docs.google.com/document/d/1kP2Bqhq1fveXZQqNrF7RnmKVzuaXlq6JhKIx4uX-F64/edit |

## The 7 floatchat.com legal page URLs (target state)

```
floatchat.com/privacy-policy   ← Iubenda embed
floatchat.com/cookie-policy    ← Iubenda embed
floatchat.com/terms            ← self-hosted
floatchat.com/aup              ← self-hosted
floatchat.com/dpa              ← self-hosted
floatchat.com/subprocessors    ← self-hosted
floatchat.com/accessibility    ← self-hosted
```

All 7 should be linked from the website footer.

## Ready-to-deploy page files

Plain HTML and Next.js versions of the 5 self-hosted pages were generated and
delivered in the `FloatChat_Compliance_USA_UK_FINAL` package. If the user
needs to (re)deploy a page, point them to that package rather than re-writing
content from scratch — the canonical content is the v2 BYOC versions linked
above.

## What "v2 BYOC" means

Several documents have a "v2 BYOC" version. v1 referenced Twilio as a FloatChat
sub-processor and an older hosting stack. v2 reflects the current reality:
DigitalOcean replaced the old hosting, Twilio was removed (customers bring
their own), and Bring-Your-Own-Twilio clauses were added to the Terms of
Service, AUP, Privacy Policy, Sub-processor List, DPA, Incident Response Plan,
and RoPA. Always use the v2 BYOC version. If a document on the live site
mentions FloatChat providing SMS/voice or signing HIPAA BAAs, it is the wrong
(old/generic) version and must be replaced.

## Common confusion to correct

- A live floatchat.com page that says "governing law: United States" is WRONG
  — it should say Singapore.
- A live page that says "execute a BAA" for healthcare is WRONG — FloatChat
  does not sign BAAs.
- A live page that lists "overage charges for SMS/voice" is WRONG — FloatChat
  does not bill for SMS/voice (BYOC).
- A homepage badge saying "AWS US-East / US-West" is WRONG — hosting is
  DigitalOcean NYC3.
