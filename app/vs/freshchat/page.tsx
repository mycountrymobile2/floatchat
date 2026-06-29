import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RelatedComparisons } from "@/components/related-comparisons"
import { Check, X } from "lucide-react"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: "FloatChat vs Freshchat. Voice Bundled, AI Native",
  description:
    "Freshchat alternative. Voice + SMS bundled (no Freshcaller add-on). AI Captain bundled in plan. Capacity pricing beats per-seat.",
  alternates: {
    canonical: "https://floatchat.com/vs/freshchat",
  },
}

export default function VsFreshchatPage() {
  usePageMeta(metadata)
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4">Freshchat Alternative</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                FloatChat vs Freshchat. Voice native. AI bundled.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                No Freshcaller add-on. No Freddy AI overage. Capacity pricing instead of per-seat.
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
                    <th className="text-left p-4 font-semibold">FloatChat Pro 25 agents</th>
                    <th className="text-left p-4 font-semibold">Freshchat Pro 25 seats + Freshcaller + Freddy AI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border bg-primary/5 font-semibold">
                    <td className="p-4">Monthly</td>
                    <td className="p-4">$189</td>
                    <td className="p-4">$1,775</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Voice</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Bundled</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />$375 Freshcaller add-on</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">AI</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Bundled</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />$49/100 sessions overage</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Pricing model</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Capacity</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />Per-seat</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Annual savings</td>
                    <td className="p-4">-</td>
                    <td className="p-4 text-green-600 font-semibold">$19,032 vs FloatChat</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Where Freshchat is better */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Where Freshchat is better
            </h2>
            <div className="space-y-6 max-w-3xl">
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">1. Freddy AI sentiment is well-tuned</h3>
                <p className="text-muted-foreground">
                  Freshchat's sentiment scoring is mature. Captain matches it functionally but Freddy has more years of data.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">2. Mobile apps</h3>
                <p className="text-muted-foreground">
                  Freshchat has iOS and Android apps. FloatChat is web-only.
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
                <span><strong>Capacity pricing.</strong> $189 for 25 agents vs Freshchat $1,225 (25 x $49).</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Voice bundled.</strong> No separate Freshcaller subscription needed.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>AI bundled.</strong> Freshchat charges $0.49 per session beyond 500 free. FloatChat bundles 10,000 on Pro.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Stripe and Salesforce native.</strong> Freshchat needs Zapier for these.</span>
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
                <h3 className="font-semibold mb-2">Does Captain replace Freddy AI?</h3>
                <p className="text-muted-foreground">Yes for agent assist and auto-reply use cases. Freddy has deeper sentiment data. Captain has no per-session fees.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">What about Freshcaller?</h3>
                <p className="text-muted-foreground">FloatChat voice replaces Freshcaller for basic inbound/outbound. No IVR, call queues, or recording on FloatChat.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">How long does migration take?</h3>
                <p className="text-muted-foreground">48 hours. Export from Freshchat, import to FloatChat, train Captain, onboard team.</p>
              </div>
            </div>
          </div>
        </section>

        <RelatedComparisons competitor="freshchat" />

        {/* Final CTA */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Switch from Freshchat
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
