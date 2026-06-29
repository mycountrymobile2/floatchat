import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RelatedComparisons } from "@/components/related-comparisons"
import { Check, X } from "lucide-react"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: "FloatChat vs Intercom. 90% Lower Pricing",
  description:
    "Intercom alternative for US teams. Same features (Fin AI, Helpdesk, Inbox) at one-tenth the price. Voice + SMS bundled. Free migration.",
  alternates: {
    canonical: "https://floatchat.com/vs/intercom",
  },
}

export default function VsIntercomPage() {
  usePageMeta(metadata)
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4">Intercom Alternative</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                FloatChat vs Intercom. 90% lower price.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Same Fin-class AI, helpdesk, and shared inbox at one-tenth the cost. Voice + SMS bundled. No per-resolution fees.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/signup?plan=free">Start Free</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Talk to Sales</Link>
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
                    <th className="text-left p-4 font-semibold">FloatChat Growth</th>
                    <th className="text-left p-4 font-semibold">Intercom Essential 10 seats + Fin AI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border bg-primary/5 font-semibold">
                    <td className="p-4">Monthly</td>
                    <td className="p-4">$69</td>
                    <td className="p-4">$1,280 ($290 + $990 AI)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Channels</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />10 (incl. voice + SMS)</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />6 (no native voice or SMS)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">AI cost</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Bundled in plan</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />$0.99 per resolution</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Per-seat or capacity</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Capacity ($69 = 10 agents)</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />Per-seat ($29-132/seat)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Annual savings</td>
                    <td className="p-4">-</td>
                    <td className="p-4 text-green-600 font-semibold">$14,532 vs FloatChat</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Where Intercom is better */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Where Intercom is better
            </h2>
            <div className="space-y-6 max-w-3xl">
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">1. Fin AI auto-resolution rate</h3>
                <p className="text-muted-foreground">
                  Intercom Fin claims 65% autonomous resolution. Captain claims 60%. Intercom has spent more on AI R&D and shows it.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">2. Brand trust at enterprise</h3>
                <p className="text-muted-foreground">
                  If your CIO has used Intercom for 5 years, they trust it. FloatChat is newer.
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
                <span><strong>AI not metered.</strong> Intercom Fin = $0.99 per resolution. FloatChat = bundled.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Voice native.</strong> Intercom doesn't have voice. FloatChat has US numbers from $5/mo.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>SMS native.</strong> Intercom doesn't have SMS. FloatChat at $0.005/segment.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Capacity pricing.</strong> 25 agents on Pro ($189) vs Intercom Premier ($132 x 25 = $3,300).</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Free plan.</strong> Intercom has a 14-day trial. FloatChat is free forever.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>No per-resolution sticker shock.</strong> A team doing 5,000 AI resolutions/month pays Intercom $4,950. FloatChat Pro covers it for $189.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Pricing Math Table */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8 text-center">
              Pricing math at 25 agents
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border mb-10">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold"></th>
                    <th className="text-left p-4 font-semibold">FloatChat Pro</th>
                    <th className="text-left p-4 font-semibold">Intercom Premier 25 seats + Fin</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-4">Base</td>
                    <td className="p-4">$189</td>
                    <td className="p-4">$3,300</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">AI (5,000 resolutions/mo)</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Included (10K bundled)</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />$4,950</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Voice (1 toll-free + 700 min)</td>
                    <td className="p-4">+$15 + $5.60 = $20.60</td>
                    <td className="p-4">Not native. Separate vendor.</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">SMS (800/mo)</td>
                    <td className="p-4">+$2 + carrier fees</td>
                    <td className="p-4">Not native.</td>
                  </tr>
                  <tr className="border-t border-border bg-primary/5 font-semibold">
                    <td className="p-4">Total</td>
                    <td className="p-4">$211</td>
                    <td className="p-4">$8,250+</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="p-6 rounded-2xl bg-primary/10 text-center sm:col-start-2">
                <p className="text-3xl font-bold text-primary">97% cheaper</p>
                <p className="text-sm text-muted-foreground">At 25 agents with same usage</p>
              </div>
            </div>
          </div>
        </section>

        {/* Migration */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
                How migration works
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl border border-border bg-card">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">1</span>
                  <div>
                    <p className="font-semibold">Day 1</p>
                    <p className="text-muted-foreground">Export your conversations, contacts, and articles from Intercom.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl border border-border bg-card">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">2</span>
                  <div>
                    <p className="font-semibold">Day 2</p>
                    <p className="text-muted-foreground">We import into FloatChat. Captain trains on your help docs.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl border border-border bg-card">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">3</span>
                  <div>
                    <p className="font-semibold">Days 3-4</p>
                    <p className="text-muted-foreground">Your team gets onboarded with a 1:1 walkthrough.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl border border-border bg-card">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">4</span>
                  <div>
                    <p className="font-semibold">Day 5</p>
                    <p className="text-muted-foreground">Go live. Forward your support@ email to FloatChat. Update widget snippet.</p>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-muted-foreground italic">
                Free for any team switching from Intercom. We've moved teams of 2 to teams of 100.
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
                <h3 className="font-semibold mb-2">Will I lose my conversation history?</h3>
                <p className="text-muted-foreground">No. We import all conversations. Your team sees the full history on day 1.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">Will Captain answer like Fin?</h3>
                <p className="text-muted-foreground">Yes for the same training data. Captain trains on your help center, articles, and past conversations. Same source, same accuracy.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">What about my Intercom integrations?</h3>
                <p className="text-muted-foreground">We support Stripe, HubSpot, Salesforce (Pro), Slack, Notion, Linear natively. Plus Zapier (5,000+ apps). Most Intercom integrations have a FloatChat equivalent.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">Will my widget look the same?</h3>
                <p className="text-muted-foreground">Customizable colors and logo on Starter+. Your customers won't notice unless they read the URL of the widget.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">Can we run both in parallel?</h3>
                <p className="text-muted-foreground">Yes, for up to 30 days during migration. Cancel Intercom at the end.</p>
              </div>
            </div>
          </div>
        </section>

        <RelatedComparisons competitor="intercom" />

        {/* Final CTA */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Switch from Intercom in 48 hours
            </h2>
            <p className="text-muted-foreground mb-8">Free migration. No credit card to start.</p>
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
