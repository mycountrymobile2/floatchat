import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RelatedComparisons } from "@/components/related-comparisons"
import { Check, X } from "lucide-react"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: "FloatChat vs Zendesk. 95% Less for 25 Agents",
  description:
    "Zendesk alternative. Capacity pricing beats per-seat. AI bundled instead of $50/agent extra. Free migration in 48 hours.",
  alternates: {
    canonical: "https://floatchat.com/vs/zendesk",
  },
}

export default function VsZendeskPage() {
  usePageMeta(metadata)
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4">Zendesk Alternative</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                FloatChat vs Zendesk. 95% less for 25 agents.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Capacity pricing instead of per-seat. AI bundled instead of $50/agent extra. Same helpdesk features at SMB prices.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/signup?plan=free">Start Free</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/demo">Book a Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* TL;DR Table */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8 text-center">
              TL;DR Comparison
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold"></th>
                    <th className="text-left p-4 font-semibold">FloatChat Pro</th>
                    <th className="text-left p-4 font-semibold">Zendesk Suite Pro 25 seats + Copilot</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border bg-primary/5 font-semibold">
                    <td className="p-4">Monthly</td>
                    <td className="p-4">$189</td>
                    <td className="p-4">$4,125 ($2,875 + $1,250 Copilot)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Pricing model</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Capacity ($189 = 25 agents)</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />Per-seat ($115/seat + $50/seat AI)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Voice</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Bundled basic</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />Talk add-on</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Setup time</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />30 minutes</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />Weeks</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Annual savings</td>
                    <td className="p-4">-</td>
                    <td className="p-4 text-green-600 font-semibold">$47,232 vs FloatChat</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Where Zendesk is better */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Where Zendesk is better
            </h2>
            <div className="space-y-6 max-w-3xl">
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">1. Massive integration ecosystem</h3>
                <p className="text-muted-foreground">
                  Zendesk has 1,500+ apps in their marketplace. FloatChat has 30+. If you need a niche integration, Zendesk likely has it.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">2. Enterprise track record</h3>
                <p className="text-muted-foreground">
                  Zendesk is the default for many F500 procurement teams.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">3. Reporting depth</h3>
                <p className="text-muted-foreground">
                  Zendesk Explore is genuinely powerful for analytics-heavy use cases.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Where FloatChat wins */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Where FloatChat wins
            </h2>
            <ul className="space-y-4 max-w-3xl">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Capacity pricing.</strong> $189 for 25 agents flat vs Zendesk $4,125.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>AI bundled.</strong> Zendesk Copilot is $50/seat extra. FloatChat AI is in the plan.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>30-minute setup.</strong> Zendesk takes weeks of configuration with consultants. FloatChat onboards in an afternoon.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Voice native.</strong> No Zendesk Talk add-on needed.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Honest pricing.</strong> No "Suite Pro" vs "Suite Enterprise Plus" upsell maze.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Pricing Math Table */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8 text-center">
              Pricing by team size
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border mb-10">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold">Team size</th>
                    <th className="text-left p-4 font-semibold">FloatChat</th>
                    <th className="text-left p-4 font-semibold">Zendesk Suite Pro + Copilot</th>
                    <th className="text-left p-4 font-semibold">Savings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-4">3 agents</td>
                    <td className="p-4">$19.99 (Starter)</td>
                    <td className="p-4">$495 ($165 x 3)</td>
                    <td className="p-4 text-green-600 font-semibold">$5,700/yr</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">10 agents</td>
                    <td className="p-4">$69 (Growth)</td>
                    <td className="p-4">$1,650</td>
                    <td className="p-4 text-green-600 font-semibold">$18,972/yr</td>
                  </tr>
                  <tr className="border-t border-border bg-primary/5 font-semibold">
                    <td className="p-4">25 agents</td>
                    <td className="p-4">$189 (Pro)</td>
                    <td className="p-4">$4,125</td>
                    <td className="p-4 text-green-600">$47,232/yr</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">100 agents</td>
                    <td className="p-4">$599 (Enterprise)</td>
                    <td className="p-4">$16,500</td>
                    <td className="p-4 text-green-600 font-semibold">$190,812/yr</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-center">
              <div className="p-6 rounded-2xl bg-primary/10 text-center">
                <p className="text-3xl font-bold text-primary">$190K saved</p>
                <p className="text-sm text-muted-foreground">At 100 agents per year</p>
              </div>
            </div>
          </div>
        </section>

        {/* Migration */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                48-hour free migration
              </h2>
              <p className="text-muted-foreground text-lg">
                Export from Zendesk, import to FloatChat, train Captain on your help docs, onboard team. No downtime.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">Are macros and triggers preserved?</h3>
                <p className="text-muted-foreground">Yes. We import them as FloatChat macros and automation rules.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">Does Captain replace Zendesk Copilot?</h3>
                <p className="text-muted-foreground">Yes. Same use cases: reply suggestions, summary, sentiment, intent.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">What about Zendesk Talk?</h3>
                <p className="text-muted-foreground">FloatChat voice replaces Zendesk Talk for basic calling (in/out, click-to-call). Note: no IVR, voicemail, or call recording on FloatChat. For those, keep your existing telephony.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">Can I run both during migration?</h3>
                <p className="text-muted-foreground">Yes, 30-day overlap. Cancel Zendesk at the end.</p>
              </div>
            </div>
          </div>
        </section>

        <RelatedComparisons competitor="zendesk" />

        {/* Final CTA */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Switch from Zendesk
            </h2>
            <Button size="lg" asChild>
              <Link to="/signup?plan=free">Start Free</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
