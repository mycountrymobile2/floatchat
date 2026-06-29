import { Link } from "react-router-dom"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: 'Sub-processor List | FloatChat',
  description: 'The third-party vendors FloatChat uses to deliver the service, what they do, and where they sit. DigitalOcean, Vercel, OpenAI, Stripe, Google Analytics 4. BYOC model for Twilio.',
  alternates: { canonical: 'https://floatchat.com/subprocessors' },
}

const subprocessors = [
  {
    name: "DigitalOcean, LLC",
    purpose: "Application hosting, managed database, object storage (NYC3 region)",
    data: "All Customer Data and metadata (accounts, conversations, logs)",
    location: "United States (NYC3 — New York metro)",
    safeguard: "SCCs + DPF certification",
  },
  {
    name: "Vercel, Inc.",
    purpose: "Marketing website hosting (floatchat.com only)",
    data: "Visitor IP address and page metadata; no Customer Data",
    location: "United States",
    safeguard: "SCCs + DPF certification",
  },
  {
    name: "OpenAI, LLC",
    purpose: "Large language model inference for chat replies (no training on Customer Data)",
    data: "Conversation content for the duration of the API call",
    location: "United States",
    safeguard: "SCCs + Data Processing Addendum",
  },
  {
    name: "Stripe, Inc.",
    purpose: "Payment processing and subscription billing",
    data: "Billing details, payment metadata",
    location: "United States",
    safeguard: "SCCs + DPF certification",
  },
  {
    name: "Google LLC (Google Analytics 4)",
    purpose: "Marketing-website analytics (blocked pre-consent via Iubenda)",
    data: "Pseudonymous identifiers, page-view events",
    location: "United States",
    safeguard: "SCCs + DPF certification + Google Consent Mode v2",
  },
]

export default function SubprocessorsPage() {
  usePageMeta(metadata)
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                FloatChat Sub-processor List
              </h1>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                The third-party vendors FloatChat uses to deliver the service, what they do, and where they sit.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Effective: May 20, 2026 &nbsp;|&nbsp; Version: v2.0 — BYOC Twilio model — DRAFT for legal review
              </p>

              <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <p className="font-semibold">DRAFT — FOR LEGAL REVIEW</p>
                <p className="mt-1">
                  This document is an AI-assisted draft prepared to accelerate legal review. It is not legal advice and must be reviewed by qualified counsel in the relevant jurisdictions before publication or signature.
                </p>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">About this list</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This list names every sub-processor that may process personal data on behalf of FloatChat. We update it whenever a sub-processor is added, removed, or changes a material aspect of their service. Customers can subscribe to changes at <Link to="/subprocessors/subscribe" className="text-foreground hover:underline">floatchat.com/subprocessors/subscribe</Link>.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Before onboarding any sub-processor, we run a security and privacy review. For sub-processors that involve transfers out of the European Economic Area, the United Kingdom, or other restricted-transfer jurisdictions, we put EU Standard Contractual Clauses, the UK IDTA, or an equivalent safeguard in place and complete a Transfer Impact Assessment.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">Current sub-processors</h2>
              <div className="overflow-x-auto rounded-lg border border-border mt-4">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Sub-processor</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Service / Purpose</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Data categories</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Location</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Transfer safeguard</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subprocessors.map((sp, i) => (
                      <tr key={sp.name} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                        <td className="px-4 py-3 align-top font-semibold text-foreground">{sp.name}</td>
                        <td className="px-4 py-3 align-top text-muted-foreground">{sp.purpose}</td>
                        <td className="px-4 py-3 align-top text-muted-foreground">{sp.data}</td>
                        <td className="px-4 py-3 align-top text-muted-foreground">{sp.location}</td>
                        <td className="px-4 py-3 align-top text-muted-foreground">{sp.safeguard}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">Customer-supplied integrations (Bring Your Own Twilio)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                FloatChat does NOT provide voice or SMS as part of the Service. If a Customer chooses to connect their own Twilio account (or equivalent CPaaS provider) for voice or SMS, the operator of that account is the Customer — not FloatChat. <span className="font-semibold text-foreground">Twilio is therefore NOT listed above as a FloatChat sub-processor.</span>
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">The Customer is responsible for:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Entering its own data processing terms directly with Twilio.</li>
                <li>Telecom-compliance obligations (TCPA, 10DLC, FCC AI Voice Ruling, STIR/SHAKEN, EU ePrivacy, UK PECR, etc.).</li>
                <li>Opt-out handling, do-not-call list management, time-of-day restrictions.</li>
                <li>Indemnifying FloatChat against any claim arising from the Customer's Twilio account activity.</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">Change-notification process</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>We post the updated list at <Link to="/subprocessors" className="text-foreground hover:underline">floatchat.com/subprocessors</Link> and email subscribers at least 30 days before a new sub-processor starts processing personal data.</li>
                <li>Customers may object on reasonable grounds within 30 days of notice. We will work with the customer to find a fix, and if we can't, the customer may terminate the affected portion of the Service.</li>
                <li>Emergency replacements (for example, a vendor failing audit) may use shorter notice, with a written explanation.</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">Contact</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Questions about a specific sub-processor or the change-notification list: <a href="mailto:privacy@floatchat.com" className="text-foreground hover:underline">privacy@floatchat.com</a>.
              </p>

              <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4 text-sm text-muted-foreground">
                <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                <Link to="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link>
                <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                <Link to="/aup" className="hover:text-foreground transition-colors">Acceptable Use Policy</Link>
                <Link to="/dpa" className="hover:text-foreground transition-colors">Data Processing Agreement</Link>
                <Link to="/accessibility" className="hover:text-foreground transition-colors">Accessibility</Link>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
