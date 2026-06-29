import { Link } from "react-router-dom"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: 'Data Processing Agreement (DPA) — FloatChat',
  description: 'FloatChat Data Processing Agreement — between Customer and My Country Mobile Pte Ltd. Includes EU SCCs, UK IDTA, BYOC Twilio model, sub-processor list, and Annex II security measures.',
  alternates: { canonical: 'https://floatchat.com/dpa' },
}

const annexIIISubprocessors = [
  { name: "DigitalOcean, LLC", purpose: "Application hosting, managed database, object storage (NYC3)", location: "United States (NYC3)" },
  { name: "Vercel, Inc.", purpose: "Marketing website hosting (floatchat.com only)", location: "United States" },
  { name: "OpenAI, LLC", purpose: "AI chat inference (no training on Customer Data)", location: "United States" },
  { name: "Stripe, Inc.", purpose: "Payment processing", location: "United States" },
  { name: "Google LLC (Google Analytics 4)", purpose: "Marketing-site analytics (consent-gated via Iubenda)", location: "United States" },
]

export default function DpaPage() {
  usePageMeta(metadata)
  return (
    <>
      <Header />
      <main id="main-content" className="pt-20">
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Data Processing Agreement
              </h1>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Between the Customer and My Country Mobile Pte Ltd for the FloatChat Service.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Effective: May 20, 2026 &nbsp;|&nbsp; Version: v2.0 — BYOC Twilio model — DRAFT for legal review
              </p>

              <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <p className="font-semibold">DRAFT — FOR LEGAL REVIEW</p>
                <p className="mt-1">
                  This document is an AI-assisted draft prepared to accelerate legal review. It is not legal advice and must be reviewed by qualified counsel before being signed or sent to a customer.
                </p>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">Parties</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This Data Processing Agreement ("DPA") is entered into between the customer entity identified in the Order Form or sign-up ("Customer") and My Country Mobile Pte Ltd, with registered office at 8 Temasek Boulevard #32-01 Suntec Tower Three, Singapore 038988 (Singapore Company Registration No. 201535142E) ("Provider"). If you are a customer in India, a different DPA applies with our India operating entity.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">1. How this DPA fits with the rest of the agreement</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This DPA forms part of the master agreement between the Parties for the FloatChat service (<Link to="/terms" className="text-foreground hover:underline">Terms of Service</Link>, Order Form, and other documents — together the "Agreement"). If anything in this DPA conflicts with the Agreement on matters of personal-data processing, this DPA controls.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">2. Definitions</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li><span className="font-semibold text-foreground">"Applicable Data Protection Law"</span> — GDPR, EU ePrivacy Directive, CCPA/CPRA + other US state privacy laws, Singapore PDPA, and equivalents.</li>
                <li><span className="font-semibold text-foreground">"Customer Personal Data"</span> — personal data Provider processes on Customer's behalf in providing the Service.</li>
                <li><span className="font-semibold text-foreground">"Data Subject", "Personal Data", "Process / Processing", "Controller", "Processor", "Personal Data Breach"</span> — have the meanings given in GDPR.</li>
                <li><span className="font-semibold text-foreground">"Restricted Transfer"</span> — a transfer of personal data to a country outside the EEA, UK, or Switzerland that is not the subject of an adequacy decision.</li>
                <li><span className="font-semibold text-foreground">"Sub-processor"</span> — a third party Provider engages to process Customer Personal Data.</li>
                <li><span className="font-semibold text-foreground">"Standard Contractual Clauses" or "SCCs"</span> — the EU Commission's Implementing Decision 2021/914 (modular SCCs).</li>
                <li><span className="font-semibold text-foreground">"UK Addendum"</span> — the UK ICO International Data Transfer Addendum, version B1.0 or successor.</li>
                <li><span className="font-semibold text-foreground">"BYOC"</span> — Bring Your Own Carrier/Twilio: a customer-supplied account that the Customer connects to FloatChat for voice/SMS.</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">3. Roles and scope</h2>
              <div className="overflow-x-auto rounded-lg border border-border mt-4 mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Processing activity</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Customer's role</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Provider's role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-background">
                      <td className="px-4 py-3 align-top text-muted-foreground">Conversations and content collected through the FloatChat widget</td>
                      <td className="px-4 py-3 align-top text-muted-foreground">Controller</td>
                      <td className="px-4 py-3 align-top text-muted-foreground">Processor</td>
                    </tr>
                    <tr className="bg-muted/30">
                      <td className="px-4 py-3 align-top text-muted-foreground">Service-administration data (logins, audit trails, billing) of Customer's own users</td>
                      <td className="px-4 py-3 align-top text-muted-foreground">Joint determination</td>
                      <td className="px-4 py-3 align-top text-muted-foreground">Controller (security, billing) / Processor (hosted data)</td>
                    </tr>
                    <tr className="bg-background">
                      <td className="px-4 py-3 align-top text-muted-foreground">Aggregated and anonymized data derived from the Service</td>
                      <td className="px-4 py-3 align-top text-muted-foreground">N/A</td>
                      <td className="px-4 py-3 align-top text-muted-foreground">Controller</td>
                    </tr>
                    <tr className="bg-muted/30">
                      <td className="px-4 py-3 align-top text-muted-foreground">Provider's own business operations (CRM, marketing)</td>
                      <td className="px-4 py-3 align-top text-muted-foreground">N/A</td>
                      <td className="px-4 py-3 align-top text-muted-foreground">Controller</td>
                    </tr>
                    <tr className="bg-background">
                      <td className="px-4 py-3 align-top font-semibold text-foreground">Voice/SMS via Customer's own Twilio (BYOC) account</td>
                      <td className="px-4 py-3 align-top font-semibold text-foreground">Controller (operator)</td>
                      <td className="px-4 py-3 align-top font-semibold text-foreground">None — Provider is not a processor of Customer's Twilio account</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">4. Subject matter, duration, nature, purpose</h2>
              <div className="overflow-x-auto rounded-lg border border-border mt-4 mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-foreground w-1/3">Item</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-background"><td className="px-4 py-3 align-top font-semibold text-foreground">Subject matter</td><td className="px-4 py-3 align-top text-muted-foreground">Provision of the FloatChat chatbot service to Customer.</td></tr>
                    <tr className="bg-muted/30"><td className="px-4 py-3 align-top font-semibold text-foreground">Duration</td><td className="px-4 py-3 align-top text-muted-foreground">From the date of the Agreement until termination, plus any post-termination retention period.</td></tr>
                    <tr className="bg-background"><td className="px-4 py-3 align-top font-semibold text-foreground">Nature and purpose</td><td className="px-4 py-3 align-top text-muted-foreground">Hosting, transmitting, storing, retrieving, analyzing, and otherwise processing Customer Personal Data as needed to deliver the Service.</td></tr>
                    <tr className="bg-muted/30"><td className="px-4 py-3 align-top font-semibold text-foreground">Categories of Data Subjects</td><td className="px-4 py-3 align-top text-muted-foreground">Customer's end users who interact with the Service and Customer's own personnel using the Service.</td></tr>
                    <tr className="bg-background"><td className="px-4 py-3 align-top font-semibold text-foreground">Categories of Personal Data</td><td className="px-4 py-3 align-top text-muted-foreground">Contact identifiers (name, email, phone), conversation content, device data, authentication identifiers.</td></tr>
                    <tr className="bg-muted/30"><td className="px-4 py-3 align-top font-semibold text-foreground">Sensitive categories</td><td className="px-4 py-3 align-top text-muted-foreground">None. Customer represents it will not submit special-category or sensitive data.</td></tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">5. Provider's obligations as Processor</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">When acting as a Processor, Provider will:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Process Customer Personal Data only on Customer's documented instructions.</li>
                <li>Ensure personnel are bound by confidentiality obligations.</li>
                <li>Implement and maintain the technical and organizational measures in Annex II.</li>
                <li>Engage Sub-processors only in accordance with Section 8.</li>
                <li>Assist Customer in responding to Data Subject requests.</li>
                <li>Assist Customer in ensuring compliance with security, breach notification, DPIAs, and prior consultations.</li>
                <li>Delete or return Customer Personal Data at the end of services.</li>
                <li>Make available information to demonstrate compliance and allow audits per Section 9.</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">6. Provider's obligations as Controller</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">When Provider acts as a Controller (service administration, billing, anonymized improvement), Provider will:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Process personal data lawfully, fairly, and transparently.</li>
                <li>Identify and document a lawful basis for each processing activity.</li>
                <li>Maintain a privacy notice (the <Link to="/privacy" className="text-foreground hover:underline">FloatChat Privacy Policy</Link>).</li>
                <li>Honor Data Subject rights directly.</li>
                <li>Maintain a RoPA under GDPR Article 30 where required.</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">7. Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Provider will implement the measures in Annex II appropriate to the risk. Provider will notify Customer without undue delay and within 48 hours of becoming aware of a Personal Data Breach affecting Customer Personal Data.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">8. Sub-processors</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Customer authorizes Provider to engage the Sub-processors listed at <Link to="/subprocessors" className="text-foreground hover:underline">floatchat.com/subprocessors</Link>. Provider will give Customer at least 30 days' prior notice of any new Sub-processor. Customer may object on reasonable data-protection grounds within 30 days.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Provider will impose data-protection obligations on each Sub-processor that are no less protective than those in this DPA, and Provider remains liable for the acts and omissions of its Sub-processors.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">9. Audits</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Provider will respond to reasonable written audit requests. Provider may satisfy this obligation by making available recent third-party audit reports (SOC 2 Type II, ISO 27001). Audits during business hours, no more than once per 12 months (except in case of Personal Data Breach or regulator request).
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">10. International data transfers</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Parties acknowledge that Provider and Sub-processors are located outside the EEA or UK. The Parties agree:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>For Restricted Transfers under the GDPR: EU SCCs Module 2 or Module 3 apply, with the populated Annexes at the end of this DPA.</li>
                <li>For Restricted Transfers from the UK: UK IDTA Version B1.0 (or successor) applies.</li>
                <li>For Restricted Transfers from Switzerland: SCCs as adapted by the Swiss FADP guidance.</li>
                <li>Provider has carried out a Transfer Impact Assessment for each Restricted Transfer.</li>
                <li>Where the EU SCCs and this DPA conflict, the SCCs prevail.</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">11. Data Subject rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Provider will assist Customer in responding to Data Subject requests by providing self-service tools (export, deletion, correction). If a Data Subject contacts Provider directly, Provider will redirect them to Customer.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">12. Liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Each Party's total liability under this DPA, the SCCs, and the UK Addendum is subject to the limitations in the Agreement, except where the law prohibits limitation.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">13. Term and end of services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This DPA applies for as long as Provider processes Customer Personal Data. On end of services, Provider will delete or return all Customer Personal Data within 30 days.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">14. Updates</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Provider may update this DPA to reflect changes in applicable law. Material changes notified at least 30 days in advance.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-16 mb-4">Annex I — Description of the processing</h2>
              <div className="overflow-x-auto rounded-lg border border-border mt-4 mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-foreground w-1/3">Item</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-background"><td className="px-4 py-3 align-top font-semibold text-foreground">A. Data exporter (Customer)</td><td className="px-4 py-3 align-top text-muted-foreground">Identified in the Order Form or sign-up. Contact: [Customer DPO/privacy contact].</td></tr>
                    <tr className="bg-muted/30"><td className="px-4 py-3 align-top font-semibold text-foreground">A. Data importer (Provider)</td><td className="px-4 py-3 align-top text-muted-foreground">My Country Mobile Pte Ltd, 8 Temasek Boulevard #32-01 Suntec Tower Three, Singapore 038988. Contact: <a href="mailto:dpo@floatchat.com" className="text-foreground hover:underline">dpo@floatchat.com</a>.</td></tr>
                    <tr className="bg-background"><td className="px-4 py-3 align-top font-semibold text-foreground">B. Categories of Data Subjects</td><td className="px-4 py-3 align-top text-muted-foreground">End users of Customer (visitors, support contacts, prospects) and Customer's own personnel.</td></tr>
                    <tr className="bg-muted/30"><td className="px-4 py-3 align-top font-semibold text-foreground">B. Categories of Personal Data</td><td className="px-4 py-3 align-top text-muted-foreground">Identifiers (name, email, phone), conversation content, IP address, device metadata, page-view context, authentication data.</td></tr>
                    <tr className="bg-background"><td className="px-4 py-3 align-top font-semibold text-foreground">B. Sensitive data</td><td className="px-4 py-3 align-top text-muted-foreground">None permitted. AUP prohibits.</td></tr>
                    <tr className="bg-muted/30"><td className="px-4 py-3 align-top font-semibold text-foreground">B. Frequency of transfer</td><td className="px-4 py-3 align-top text-muted-foreground">Continuous, for the term of the Agreement.</td></tr>
                    <tr className="bg-background"><td className="px-4 py-3 align-top font-semibold text-foreground">B. Nature of the processing</td><td className="px-4 py-3 align-top text-muted-foreground">Cloud-hosted chat platform: collection, storage, transmission, AI inference, deletion.</td></tr>
                    <tr className="bg-muted/30"><td className="px-4 py-3 align-top font-semibold text-foreground">B. Purpose of the processing</td><td className="px-4 py-3 align-top text-muted-foreground">Provide the FloatChat service.</td></tr>
                    <tr className="bg-background"><td className="px-4 py-3 align-top font-semibold text-foreground">B. Retention</td><td className="px-4 py-3 align-top text-muted-foreground">As set out in the Privacy Policy and Customer's configuration.</td></tr>
                    <tr className="bg-muted/30"><td className="px-4 py-3 align-top font-semibold text-foreground">B. Sub-processors</td><td className="px-4 py-3 align-top text-muted-foreground">See Annex III.</td></tr>
                    <tr className="bg-background"><td className="px-4 py-3 align-top font-semibold text-foreground">C. Competent supervisory authority</td><td className="px-4 py-3 align-top text-muted-foreground">The EU member state of the data exporter; UK ICO; Singapore PDPC.</td></tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-16 mb-4">Annex II — Technical and organizational security measures</h2>

              <h3 className="text-xl font-semibold tracking-tight text-foreground mt-8 mb-3">Access control</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Role-based access control with least-privilege.</li>
                <li>MFA for all production and administrative access.</li>
                <li>Quarterly access reviews and immediate revocation on role change or termination.</li>
              </ul>

              <h3 className="text-xl font-semibold tracking-tight text-foreground mt-8 mb-3">Encryption</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>TLS 1.2+ for data in transit.</li>
                <li>AES-256 for data at rest, hardware-backed key management.</li>
                <li>Key rotation at least annually.</li>
              </ul>

              <h3 className="text-xl font-semibold tracking-tight text-foreground mt-8 mb-3">Network and infrastructure</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Hardened cloud infrastructure (DigitalOcean NYC3 — application hosting; Vercel — marketing website) with network segmentation.</li>
                <li>Web application firewall and DDoS protection.</li>
                <li>Continuous vulnerability scanning; annual penetration testing.</li>
              </ul>

              <h3 className="text-xl font-semibold tracking-tight text-foreground mt-8 mb-3">Operations and monitoring</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Centralized logging retained at least 180 days.</li>
                <li>24x7 security monitoring with documented incident response runbooks.</li>
                <li>Change management: peer review, automated tests, staged rollouts.</li>
              </ul>

              <h3 className="text-xl font-semibold tracking-tight text-foreground mt-8 mb-3">Personnel and physical</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Background checks at hire.</li>
                <li>Confidentiality obligations in all agreements.</li>
                <li>Annual security and privacy training.</li>
                <li>Physical security inherited from cloud providers (SOC 2 / ISO 27001).</li>
              </ul>

              <h3 className="text-xl font-semibold tracking-tight text-foreground mt-8 mb-3">Data lifecycle</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Data classification standards.</li>
                <li>Default-deny for data egress.</li>
                <li>Documented retention and deletion processes.</li>
                <li>Backups encrypted, geographically separated, tested annually.</li>
              </ul>

              <h3 className="text-xl font-semibold tracking-tight text-foreground mt-8 mb-3">Governance</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Designated privacy and security leads.</li>
                <li>Sub-processor due diligence and annual reassessment.</li>
                <li>Documented business continuity and disaster recovery, tested annually.</li>
                <li>Incident response: 48h to Customer; 72h to supervisory authorities under GDPR.</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-16 mb-4">Annex III — Authorized Sub-processors</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The current list is maintained at <Link to="/subprocessors" className="text-foreground hover:underline">floatchat.com/subprocessors</Link>. Current list (as of effective date):
              </p>
              <div className="overflow-x-auto rounded-lg border border-border mt-4 mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Sub-processor</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Service / Purpose</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {annexIIISubprocessors.map((sp, i) => (
                      <tr key={sp.name} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                        <td className="px-4 py-3 align-top font-semibold text-foreground">{sp.name}</td>
                        <td className="px-4 py-3 align-top text-muted-foreground">{sp.purpose}</td>
                        <td className="px-4 py-3 align-top text-muted-foreground">{sp.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Provider will give 30 days' prior notice of any new Sub-processor by updating the page and notifying subscribers.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <span className="font-semibold text-foreground">Customer-supplied integrations (Bring Your Own Twilio).</span> Where Customer connects its own Twilio account or any other third-party service for voice, SMS, email, or other capabilities, the operator of that account is the Customer (or its chosen vendor) — not Provider. Twilio in that case is the Customer's own processor under a separate agreement between Customer and Twilio. Provider is neither a Sub-processor of, nor a recipient of personal data from, Customer's Twilio account, except as transiently passed through the chat widget at Customer's direction. Customer is solely responsible for the compliance of its own Twilio (or equivalent CPaaS) usage with TCPA, 10DLC, EU ePrivacy, UK PECR, and other applicable telecom laws.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-16 mb-4">Signatures</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Each party signs below through an authorized representative.
              </p>
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="rounded-lg border border-border p-6 bg-card">
                  <p className="font-semibold text-foreground mb-4">For the Customer:</p>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>Signature ____________________</p>
                    <p>Name ________________________</p>
                    <p>Title ________________________</p>
                    <p>Date ________________________</p>
                  </div>
                </div>
                <div className="rounded-lg border border-border p-6 bg-card">
                  <p className="font-semibold text-foreground mb-4">For My Country Mobile Pte Ltd:</p>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>Signature ____________________</p>
                    <p>Name ________________________</p>
                    <p>Title ________________________</p>
                    <p>Date ________________________</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4 text-sm text-muted-foreground">
                <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                <Link to="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link>
                <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                <Link to="/aup" className="hover:text-foreground transition-colors">Acceptable Use Policy</Link>
                <Link to="/subprocessors" className="hover:text-foreground transition-colors">Sub-processors</Link>
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
