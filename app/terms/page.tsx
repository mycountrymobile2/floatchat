import { Link } from "react-router-dom"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: 'Terms of Service | FloatChat',
  description: 'FloatChat Terms of Service — the agreement between your business and My Country Mobile Pte Ltd for use of FloatChat. Bring-Your-Own-Twilio model for voice and SMS.',
  alternates: { canonical: 'https://floatchat.com/terms' },
}

export default function TermsPage() {
  usePageMeta(metadata)
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                FloatChat Terms of Service
              </h1>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                The agreement between your business and My Country Mobile Pte Ltd for use of FloatChat.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Effective: May 20, 2026 &nbsp;|&nbsp; Version: v2.0 — BYOC Twilio model — DRAFT for legal review
              </p>

              <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <p className="font-semibold">DRAFT — FOR LEGAL REVIEW</p>
                <p className="mt-1">
                  This document is an AI-assisted draft prepared to accelerate legal review. It is not legal advice and must be reviewed by qualified counsel.
                </p>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">Summary</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms govern your business's use of FloatChat. They cover what we provide, what you can and cannot do, how payments work, how either of us can end the relationship, and what happens if something goes wrong.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">1. Definitions</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li><span className="font-semibold text-foreground">"Customer", "you", "your"</span> — the business entity using FloatChat.</li>
                <li><span className="font-semibold text-foreground">"FloatChat", "we", "us", "our"</span> — My Country Mobile Pte Ltd.</li>
                <li><span className="font-semibold text-foreground">"Service"</span> — the FloatChat chatbot platform.</li>
                <li><span className="font-semibold text-foreground">"Customer Data"</span> — data you, your end users, or your systems submit to the Service.</li>
                <li><span className="font-semibold text-foreground">"End User"</span> — a person interacting with a FloatChat chat widget.</li>
                <li><span className="font-semibold text-foreground">"AUP"</span> — our Acceptable Use Policy at <Link to="/aup" className="text-foreground hover:underline">floatchat.com/aup</Link>.</li>
                <li><span className="font-semibold text-foreground">"DPA"</span> — our Data Processing Agreement at <Link to="/dpa" className="text-foreground hover:underline">floatchat.com/dpa</Link>.</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">2. The Service</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We provide a hosted chatbot platform that lets you deploy AI-assisted chat experiences for your end users. We do NOT provide voice or SMS as part of the Service (see Section 4 — Bring Your Own Twilio).
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">3. Your account</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Provide accurate sign-up information and keep it up to date.</li>
                <li>Keep your credentials secret. Notify us at <a href="mailto:security@floatchat.com" className="text-foreground hover:underline">security@floatchat.com</a> if compromised.</li>
                <li>We may suspend access if your account is at risk or violates these Terms.</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">4. Your responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">When using the Service, you must:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Comply with our AUP at all times.</li>
                <li>Get all necessary consents from your End Users.</li>
                <li>Not use the Service for PHI, children's data, or any AUP-restricted category.</li>
                <li>Not reverse-engineer, copy, or extract our source code, models, or methods.</li>
                <li>Not use the Service to build a competing product.</li>
              </ul>

              <h3 className="text-xl font-semibold tracking-tight text-foreground mt-8 mb-3">4.1 Voice and SMS features — "Bring Your Own Twilio"</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                FloatChat does not provide voice or SMS messaging services. If you want voice or SMS, you must:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li>(a) Open and operate your own Twilio account in your own name;</li>
                <li>(b) Comply with all applicable telecom laws — including the US TCPA, the FCC's February 2024 AI Voice Ruling, 10DLC registration with The Campaign Registry, STIR/SHAKEN attestation, the National Do Not Call Registry, EU ePrivacy, UK PECR, and all other applicable laws in every jurisdiction where you call or text;</li>
                <li>(c) Capture prior express written consent from every recipient before any marketing voice/SMS, and maintain proof of consent for at least 5 years;</li>
                <li>(d) Honor opt-outs (STOP, DND, unsubscribe) immediately and maintain an internal do-not-call list;</li>
                <li>(e) Disclose at the start of any AI voice call that the caller is an AI assistant;</li>
                <li>(f) Indemnify and defend FloatChat against any claim, fine, or loss arising from your voice/SMS activities, including TCPA class actions and regulatory penalties.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                FloatChat is NOT a party to your Twilio account, NOT responsible for your telecom-law compliance, and NOT a co-defendant in any TCPA action arising from your messaging. We will preserve and produce evidence on lawful subpoena but will not be liable for your compliance failures.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">5. Customer Data</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You own your Customer Data. We do not claim ownership. You grant us a limited license to host, process, transmit, and display Customer Data to provide the Service. We act as a processor for End User conversation data — see the <Link to="/dpa" className="text-foreground hover:underline">DPA</Link>.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not use your Customer Data to train models offered to other customers without your specific consent.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">6. Privacy and security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                See our <Link to="/privacy" className="text-foreground hover:underline">Privacy Policy</Link> and <Link to="/dpa" className="text-foreground hover:underline">DPA</Link>. Security measures: encryption in transit and at rest, MFA, annual penetration testing, vendor security reviews, incident response with regional notification timelines.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">7. Sub-processors</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use a limited set of sub-processors. The current list is at <Link to="/subprocessors" className="text-foreground hover:underline">floatchat.com/subprocessors</Link>. We will tell you about any new sub-processor at least 30 days before they start.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">8. AI features and human oversight</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Service uses generative AI. AI output can be wrong, incomplete, or inappropriate. You agree to maintain human oversight where the answer matters and to keep our AI-disclosure language visible to End Users.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may not use the Service to (a) generate content that violates law, (b) impersonate a real person, (c) make consequential decisions about an End User (employment, credit, healthcare, housing, education, legal services) without meaningful human review.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">9. Fees, taxes, and renewals</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Fees per Order Form. Due in advance, non-refundable.</li>
                <li>You're responsible for sales/use/GST/VAT/withholding taxes.</li>
                <li>Subscriptions auto-renew unless either party gives 30 days' written notice of non-renewal.</li>
                <li>Payment delinquency &gt;15 days may trigger suspension.</li>
                <li>Pricing changes for renewals require 60 days' notice.</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">10. Term and termination</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Subscription runs for the term in the Order Form. Either party may terminate for material breach with 30 days' notice and cure period. We may terminate immediately for serious AUP violations.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                On termination: your right to use the Service ends. We make Customer Data available for export for 30 days, then delete or anonymize within 90 days.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">11. Confidentiality</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Each party uses confidential information only to perform under these Terms.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">12. Intellectual property</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We own the Service, software, models, and improvements. You own your Customer Data. Feedback you give us is voluntary; we can use it without obligation.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">13. Warranties and disclaimers</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We warrant reasonable skill and care. Other than as stated, the Service is provided "as is." AI features may produce inaccurate output; you are responsible for reviewing AI output before relying on it.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">14. Limitation of liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Neither party is liable for indirect/consequential damages. Total liability capped at fees paid in the 12 months before the claim. Standard exclusions apply (fraud, gross negligence, indemnity, confidentiality).
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">15. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You indemnify us for claims arising from your Customer Data, End Users, AUP violations, or unlawful use. We defend you against IP infringement claims targeting the Service as provided.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">16. Governing law and disputes</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms are governed by the laws of Singapore. Any dispute will be resolved by the courts of Singapore.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <span className="font-semibold text-foreground">Exception for small claims:</span> Either party may bring a small-claims action in the courts of the other party's home jurisdiction for amounts under USD 10,000, provided the action is limited to small-claims procedures available without legal counsel.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <span className="font-semibold text-foreground">Exception for non-waivable consumer rights:</span> Non-waivable consumer rights under your local law apply regardless of this section.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you are in India, the laws and courts of India apply to your relationship with the India Entity.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">17. Changes to these Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may update these Terms. Material changes notified at least 30 days in advance.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">18. Miscellaneous</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>These Terms (with the Order Form, AUP, and DPA) are the full agreement.</li>
                <li>Severability: if a provision is unenforceable, the rest survives.</li>
                <li>Force majeure for events beyond reasonable control.</li>
                <li>Assignment requires consent except in merger/sale.</li>
                <li>Notices in writing to <a href="mailto:legal@floatchat.com" className="text-foreground hover:underline">legal@floatchat.com</a>.</li>
              </ul>

              <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4 text-sm text-muted-foreground">
                <Link className="hover:text-foreground transition-colors" to="/privacy">Privacy Policy</Link>
                <Link className="hover:text-foreground transition-colors" to="/cookies">Cookie Policy</Link>
                <Link className="hover:text-foreground transition-colors" to="/aup">Acceptable Use Policy</Link>
                <Link className="hover:text-foreground transition-colors" to="/dpa">Data Processing Agreement</Link>
                <Link className="hover:text-foreground transition-colors" to="/subprocessors">Sub-processors</Link>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
