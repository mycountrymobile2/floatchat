# FloatChat Compliance Playbooks

Step-by-step procedures for compliance events. When one of these happens,
follow the matching playbook rather than improvising.

## Table of contents

1. Adding a new sub-processor / third-party vendor
2. Handling a Data Subject Request (DSR / DSAR)
3. Responding to a data breach
4. Onboarding a new customer
5. Adding or changing an AI feature
6. Annual / quarterly maintenance

---

## 1. Adding a new sub-processor / third-party vendor

Triggered whenever FloatChat starts using a new service that touches personal
data (a new analytics tool, error tracker, email provider, CRM, etc.).

GDPR Article 28 requires customers be told *before* a new sub-processor goes
live. Steps:

1. **Security/privacy review** — confirm the vendor offers a DPA and SCCs.
   Sign their DPA via self-service (most have a portal).
2. **Update the Sub-processor List** document and the floatchat.com/subprocessors
   page — add the vendor row (name, purpose, data categories, location,
   transfer safeguard).
3. **Add the service in Iubenda** — go to the Privacy Policy editor, Add
   service, select or create the vendor. This updates the live Privacy Policy.
4. **Email the change-notification subscribers** at least 30 days before the
   vendor starts processing personal data.
5. **Update the RoPA** — add the vendor to the recipients of the relevant
   processing activities.
6. If the vendor is in a non-adequacy country, **complete a Transfer Impact
   Assessment** (use the free IAPP template).

Note: a customer's own Twilio account is NOT a sub-processor — it is the
customer's own vendor under the BYOC model. Do not add Twilio to the list.

---

## 2. Handling a Data Subject Request (DSR / DSAR)

A person asks to access, correct, delete, or port their personal data, or to
object to processing. GDPR gives 30 days; CCPA gives 45 days.

1. **Log the request** in the DSR Register (date, requester email, request
   type).
2. **Verify identity** — confirm the requester controls the email on file.
   Do not act on an unverified request.
3. **Determine the role.** If the data is in a chat widget deployed by a
   business customer, FloatChat is the *processor* — redirect the requester to
   that business customer (the controller) and notify the customer. If the
   data is a FloatChat account holder or website visitor, FloatChat is the
   *controller* and must respond directly.
4. **Fulfil the request** — pull, correct, delete, or export the data.
5. **Respond within the deadline** and record the response date in the
   register. If a legal exception prevents action, tell the requester why.

---

## 3. Responding to a data breach

A breach is any unauthorized access to, loss, or disclosure of personal data.
This is one of the few situations that needs a lawyer — engage one immediately.

The legal clocks:
- GDPR supervisory authority: 72 hours from awareness.
- Customer notification (per the DPA): 48 hours from awareness.
- Affected individuals: without undue delay if high risk.
- US states: state-specific (use the Perkins Coie 50-state matrix).

Immediate steps (full detail is in the Incident Response Plan document):

1. **Open an incident ticket**, assign an Incident Commander, do not delete
   anything (preserve evidence).
2. **Classify severity** (P0-P3) within 30 minutes.
3. **Contain** — disable compromised credentials, isolate affected systems.
4. **Engage a lawyer** — this is a hard escalation trigger. Do not DIY breach
   notification.
5. **Notify** per the clocks above, using the templates in the Incident
   Response Plan.
6. **Post-incident review** within 14 days.

---

## 4. Onboarding a new customer

When a business signs up for FloatChat:

1. **Sales Qualification Questionnaire** — sales runs this during the first
   call. Any "Red column" answer (healthcare/PHI, children's audience,
   automated consequential decisions) triggers a Trust & Safety review or
   refusal. Refusal language is in the questionnaire.
2. **Terms of Service + AUP** — customer accepts at signup (checkbox).
3. **Customer AUP Attestation** — sent for signature at signup and renewed
   annually. It confirms no PHI, no children's audiences, lawful outreach, and
   that if they use voice/SMS they use their own Twilio.
4. **DPA** — provided to the customer. If they are in the EU/UK, the
   Cross-Border Transfer Addendum is bundled with it.
5. Store all signed documents in the CRM under the customer record.

---

## 5. Adding or changing an AI feature

FloatChat's AI use is "limited risk" under the EU AI Act (transparency only).
Keep it that way:

- Any user-facing AI must show the AI disclosure (Variant A) at the start of
  every chat session. Never let a customer disable it.
- If FloatChat ever adds image, audio, or video generation, California SB-942
  provenance-manifest rules come into scope — revisit then.
- If a customer asks to use FloatChat for a regulated decision (employment,
  credit, healthcare, housing, education, legal services), that is a
  Trust & Safety escalation — the AUP forbids solely-automated consequential
  decisions without human review.
- Update the RoPA and the AI Disclosure document if the processing changes.

---

## 6. Annual / quarterly maintenance

- **Quarterly:** review whether FloatChat has crossed any US state privacy-law
  threshold; refresh the threshold memo.
- **Every 6 months:** review the RoPA.
- **Annually:** download the new Perkins Coie breach-notification matrix;
  re-confirm the Customer AUP Attestation with every customer; run one
  incident-response tabletop exercise; re-check the EU/UK Representative is
  still appointed.
- **On any change:** new processing activity, new sub-processor, changed
  retention, changed legal basis — update the RoPA and Sub-processor List.
