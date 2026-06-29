import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RelatedComparisons } from "@/components/related-comparisons"
import { Check, X } from "lucide-react"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: "FloatChat vs Drift. Self-Serve, Transparent Pricing",
  description:
    "Drift alternative. Self-serve signup vs sales-led. Public USD pricing. Voice + SMS + chat + email bundled.",
  alternates: {
    canonical: "https://floatchat.com/vs/drift",
  },
}

export default function VsDriftPage() {
  usePageMeta(metadata)
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4">Drift Alternative</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                FloatChat vs Drift. Self-serve. Transparent.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Drift requires a sales call before you see prices. FloatChat publishes everything from $0 to $599. Same chat-led functionality.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/signup?plan=free">Start Free</Link>
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
                    <th className="text-left p-4 font-semibold">FloatChat</th>
                    <th className="text-left p-4 font-semibold">Drift</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border bg-primary/5 font-semibold">
                    <td className="p-4">Pricing</td>
                    <td className="p-4">Public, $0-$599/mo</td>
                    <td className="p-4">Sales-led, ~$2,500+/mo reported</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Self-serve signup</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />No (talk to sales)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Voice native</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />No</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">AI bundled</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes</td>
                    <td className="p-4">Yes (on higher tiers)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Where Drift is better */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Where Drift is better
            </h2>
            <div className="space-y-6 max-w-3xl">
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">1. B2B sales-conversion features</h3>
                <p className="text-muted-foreground">
                  Drift was built for B2B demand gen. Their playbooks for "book a meeting" flows are more advanced.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">2. Salesforce / Marketo deep integration</h3>
                <p className="text-muted-foreground">
                  Drift has years of integration depth on the marketing tech stack.
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
                <span><strong>You can sign up without a sales call.</strong> Drift requires a demo before you see pricing.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Transparent USD pricing.</strong> No "talk to sales" until Enterprise.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Voice + SMS native.</strong> Drift is chat-led, no native voice or SMS.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Free plan.</strong> Drift has no free tier.</span>
              </li>
            </ul>
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
                <h3 className="font-semibold mb-2">Is FloatChat good for sales chat (SDR use case)?</h3>
                <p className="text-muted-foreground">Primarily a support inbox. If you need revenue-focused playbooks with meeting booking and ABM targeting, Drift is purpose-built for that. FloatChat is for support teams.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">What if I need both sales chat and support?</h3>
                <p className="text-muted-foreground">Use Drift for inbound sales qualification and FloatChat for support. They serve different audiences.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">Can I see pricing without talking to sales?</h3>
                <p className="text-muted-foreground">Yes. floatchat.com/pricing. All 6 tiers, all features, all prices. No form required.</p>
              </div>
            </div>
          </div>
        </section>

        <RelatedComparisons competitor="drift" />

        {/* Final CTA */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Try FloatChat Free
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
