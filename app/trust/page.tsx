import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Check, Shield, Lock, Globe } from "lucide-react"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: 'Trust & Security at FloatChat',
  description: 'US data residency, SOC 2 Type II in progress, HIPAA on Enterprise, GDPR + CCPA compliance. How FloatChat protects your data.',
  alternates: { canonical: 'https://floatchat.com/trust' },
}

export default function TrustPage() {
  usePageMeta(metadata)
  return (
    <>
      <Header />
      <main className="pt-20">

        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Your data is safe with us.
              </h1>
              <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
                US data residency, encryption at rest and in transit, SOC 2 Type II in progress. Here's how we protect your customers' data.
              </p>
              <div className="mt-8 flex flex-wrap gap-2 justify-center">
                <Badge variant="secondary">US-hosted</Badge>
                <Badge variant="secondary">SOC 2 in progress</Badge>
                <Badge variant="secondary">HIPAA on Enterprise</Badge>
                <Badge variant="secondary">GDPR + CCPA</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Trust cards */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              <div className="rounded-2xl border border-border bg-card p-6">
                <Shield className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">US data residency.</h3>
                <p className="text-sm text-muted-foreground">
                  DigitalOcean NYC3 (New York metro). Multi-availability-zone redundancy. Your data never leaves the US without your consent.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <Lock className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Encryption everywhere.</h3>
                <p className="text-sm text-muted-foreground">
                  TLS 1.3 in transit. AES-256 at rest. Customer data encrypted on disk and in backups.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <Check className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Access controls.</h3>
                <p className="text-sm text-muted-foreground">
                  2FA/MFA required for all agent accounts. SSO/SAML on Pro and Enterprise. Custom roles/RBAC on Pro+. IP allowlist on Pro+.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <Shield className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">SOC 2 Type II in progress.</h3>
                <p className="text-sm text-muted-foreground">
                  Target Q4 2026. Annual penetration testing (results available on request, Pro+). Bug bounty program at security@floatchat.com.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <Shield className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">HIPAA option on Enterprise.</h3>
                <p className="text-sm text-muted-foreground">
                  Available on Enterprise with signed Business Associate Agreement (BAA). PHI encryption, audit logs, custom data retention.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <Globe className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">GDPR + CCPA built in.</h3>
                <p className="text-sm text-muted-foreground">
                  Privacy controls, data export, data deletion within 30 days of account termination. DPA available for EU/UK/California customers.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Compliance table */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-8 text-center">
              Compliance by plan
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Feature</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Free</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Lite</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Starter</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Growth</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Pro</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "2FA/MFA", values: ["Yes", "Yes", "Yes", "Yes", "Yes", "Yes"] },
                    { feature: "Encryption at rest", values: ["Yes", "Yes", "Yes", "Yes", "Yes", "Yes"] },
                    { feature: "SSO / SAML", values: ["No", "No", "No", "No", "Yes", "Yes"] },
                    { feature: "Custom Roles / RBAC", values: ["No", "No", "No", "No", "Yes", "Yes"] },
                    { feature: "Audit logs", values: ["No", "No", "No", "No", "Yes", "Yes"] },
                    { feature: "IP allowlist", values: ["No", "No", "No", "No", "Yes", "Yes"] },
                    { feature: "HIPAA BAA", values: ["No", "No", "No", "No", "No", "Yes"] },
                  ].map((row) => (
                    <tr key={row.feature} className="border-b border-border">
                      <td className="py-3 px-4 text-foreground font-medium">{row.feature}</td>
                      {row.values.map((val, i) => (
                        <td key={i} className={`py-3 px-4 text-center ${val === "Yes" ? "text-green-600 font-medium" : "text-muted-foreground"}`}>
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Links */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm">
              <Link to="/security" className="text-foreground hover:underline">Security details</Link>
              <Link to="/privacy" className="text-foreground hover:underline">Privacy Policy</Link>
              <Link to="/dpa" className="text-foreground hover:underline">DPA</Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">
                Have security questions?
              </h2>
              <p className="text-muted-foreground mb-8">
                Talk to our team about Enterprise security requirements, HIPAA contracts, and custom compliance needs.
              </p>
              <Button size="lg" asChild>
                <Link to="/demo">Talk to Sales</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
