import { Link } from "react-router-dom"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: 'Acceptable Use Policy | FloatChat',
  description: 'FloatChat Acceptable Use Policy — what you can and cannot do with FloatChat. Bring-Your-Own-Twilio model for voice and SMS.',
  alternates: { canonical: 'https://floatchat.com/aup' },
}

export default function AupPage() {
  usePageMeta(metadata)
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                FloatChat Acceptable Use Policy
              </h1>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                What you can and cannot do with FloatChat.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Effective: May 20, 2026 &nbsp;|&nbsp; Version: v2.0 — BYOC Twilio model — DRAFT for legal review
              </p>

              <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <p className="font-semibold">DRAFT — FOR LEGAL REVIEW</p>
                <p className="mt-1">
                  This document is an AI-assisted draft prepared to accelerate legal review.
                </p>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">Why this Policy exists</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This Acceptable Use Policy ("AUP") is part of our <Link to="/terms" className="text-foreground hover:underline">Terms of Service</Link> and applies to every use of FloatChat.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">1. Prohibited content and uses</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may not use FloatChat to create, store, send, or generate:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Unlawful content of any kind.</li>
                <li>Content that exploits or sexualizes minors.</li>
                <li>Content that promotes terrorism, violent extremism, or incites violence.</li>
                <li>Malware, viruses, ransomware, exploits, or anything designed to compromise systems.</li>
                <li>Spam, phishing, scams, deceptive marketing, or impersonation.</li>
                <li>Content that is unlawfully discriminatory, harassing, or threatening.</li>
                <li>Information designed to enable serious harm (e.g., weapons of mass destruction).</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">2. Prohibited data categories</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may not use FloatChat to process the following without our specific written approval:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Protected Health Information (PHI) under HIPAA. <span className="font-semibold text-foreground">FloatChat is not a HIPAA Business Associate; we do not sign BAAs.</span></li>
                <li>Special category personal data under GDPR Article 9.</li>
                <li>Sensitive personal data under India's DPDP Act 2023.</li>
                <li>Children's personal data — see Section 3.</li>
                <li>Government-issued identifiers for identity proofing (passport, national ID, SSN, Aadhaar) without our approved safeguards.</li>
                <li>Cardholder data subject to PCI DSS — use a separate PCI-compliant provider.</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">3. Children</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                FloatChat is a business tool not built for use with children. You may not deploy FloatChat in any product directed to or knowingly used by children under:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>13 years in the United States (COPPA);</li>
                <li>16 years in the European Union.</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">4. Voice and messaging (Bring Your Own Twilio)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                FloatChat does NOT provide voice or SMS messaging services. If you want voice/SMS, you must connect your own Twilio account (or equivalent CPaaS provider). When you do, you — not FloatChat — are the "caller", "sender", and "operator" for TCPA, FCC, 10DLC, ePrivacy, and equivalent legal purposes.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">You must:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Capture prior express written consent for marketing outreach (US TCPA + FCC AI Voice Ruling; EU ePrivacy; UK PECR).</li>
                <li>Register with The Campaign Registry (10DLC) under your own brand for US A2P messaging.</li>
                <li>Honor all opt-outs (STOP, DND, unsubscribe) within seconds.</li>
                <li>Maintain an internal do-not-call list.</li>
                <li>Disclose AI voice at the start of every AI-generated call.</li>
                <li>Respect time-of-day restrictions.</li>
                <li>Scrub against the National Do Not Call Registry before any cold outbound.</li>
                <li>Carry your own telecom-related insurance.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                FloatChat may suspend integration with your Twilio account if we receive credible reports of TCPA violations, but doing so does not make FloatChat liable for your past violations. You indemnify FloatChat against any claim, fine, or loss arising from your voice/SMS activities.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">5. AI use</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Keep the default AI-disclosure language visible to End Users.</li>
                <li>Do not present AI output as if it were a human's statement.</li>
                <li>Do not use the Service to make consequential decisions (employment, credit, healthcare, housing, education, legal services) about an End User without meaningful human review and required regulatory disclosures.</li>
                <li>Do not attempt to bypass safety controls or misuse the Service.</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">6. Security and integrity</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Don't probe, scan, or test vulnerability of the Service except through our authorized security program.</li>
                <li>Don't interfere with other customers' use.</li>
                <li>Don't access accounts/data/systems you're not authorized to access.</li>
                <li>Don't introduce automated traffic that exceeds documented rate limits.</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">7. Enforcement</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you violate this AUP, we may (in our discretion): ask you to fix it, restrict specific features, suspend or terminate your account, preserve and disclose information to authorities where required, and seek legal remedies including indemnification.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">8. Indemnity</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You defend, indemnify, and hold us harmless from any third-party claim, regulatory inquiry, fine, or loss arising from your violation of this AUP.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">9. Reporting violations</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To report a suspected AUP violation: <a href="mailto:legal@floatchat.com" className="text-foreground hover:underline">legal@floatchat.com</a>.
              </p>

              <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4 text-sm text-muted-foreground">
                <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                <Link to="/dpa" className="hover:text-foreground transition-colors">Data Processing Agreement</Link>
                <Link to="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link>
                <Link to="/subprocessors" className="hover:text-foreground transition-colors">Sub-processors</Link>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
