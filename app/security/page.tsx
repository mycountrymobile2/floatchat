import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: 'Security at FloatChat',
  description: 'DigitalOcean NYC3 US infrastructure, SOC 2 Type II in progress, AES-256 encryption, TLS 1.3. How FloatChat secures your support data.',
  alternates: { canonical: 'https://floatchat.com/security' },
}

export default function SecurityPage() {
  usePageMeta(metadata)
  return (
    <>
      <Header />
      <main className="pt-20">

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Security at FloatChat
              </h1>
              <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
                We take customer data seriously.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">Infrastructure</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>DigitalOcean NYC3 (New York metro region)</li>
                <li>Multi-AZ redundancy</li>
                <li>99.9% uptime SLA</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">Encryption</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>TLS 1.3 in transit</li>
                <li>AES-256 at rest</li>
                <li>Customer data encrypted on disk and in backups</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">Access control</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>2FA / MFA required for all agent accounts</li>
                <li>SSO / SAML on Pro and Enterprise (Okta, Azure AD, Google Workspace)</li>
                <li>Custom roles / RBAC on Pro+</li>
                <li>IP allowlist on Pro+</li>
                <li>Audit logs on Pro+</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">Compliance</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>GDPR + CCPA: built into the platform</li>
                <li>HIPAA option: available on Enterprise with signed BAA</li>
                <li>SOC 2 Type II: in progress (target Q4 2026)</li>
                <li>ISO 27001: roadmap</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">Application security</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Annual penetration testing (results available on request, Pro+)</li>
                <li>Bug bounty program (responsible disclosure to security@floatchat.com)</li>
                <li>Quarterly security training for all staff</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">Data handling</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Customer data never used to train AI models</li>
                <li>Data deletion within 30 days of account termination</li>
                <li>Data export available in your account settings</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">Vendor security</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>All subprocessors vetted under our DPA</li>
                <li>Annual review of subprocessor security posture</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">Report a vulnerability</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Email <a href="mailto:security@floatchat.com" className="text-foreground hover:underline">security@floatchat.com</a>. We respond within 24 hours.
              </p>

              <div className="mt-12 flex flex-wrap gap-4">
                <Button asChild>
                  <Link to="/trust">Trust overview</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/privacy">Privacy Policy</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/dpa">DPA</Link>
                </Button>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
