import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RelatedComparisons } from "@/components/related-comparisons"
import { Check, X } from "lucide-react"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: "FloatChat vs Gorgias. Per-Agent vs Per-Ticket Math",
  description:
    "Gorgias alternative for Shopify stores. Per-agent capacity pricing instead of per-ticket. Voice + SMS bundled. From $19.99/mo.",
  alternates: {
    canonical: "https://floatchat.com/vs/gorgias",
  },
}

export default function VsGorgiasPage() {
  usePageMeta(metadata)
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4">Gorgias Alternative</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                FloatChat vs Gorgias. Per-agent beats per-ticket.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Gorgias charges by tickets ($10-$960/mo). FloatChat charges by team size ($19.99-$599/mo). Same Shopify integration depth.
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
                    <th className="text-left p-4 font-semibold">FloatChat Growth (10 agents)</th>
                    <th className="text-left p-4 font-semibold">Gorgias Pro (2,000 tickets)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border bg-primary/5 font-semibold">
                    <td className="p-4">Monthly</td>
                    <td className="p-4">$69</td>
                    <td className="p-4">$300</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Pricing model</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Per-agent capacity</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />Per-ticket</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Voice native</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes</td>
                    <td className="p-4">Add-on</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">SMS native</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes</td>
                    <td className="p-4">Add-on</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Shopify depth</td>
                    <td className="p-4">Yes</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes (deeper)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Where Gorgias is better */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Where Gorgias is better
            </h2>
            <div className="space-y-6 max-w-3xl">
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">1. Shopify depth</h3>
                <p className="text-muted-foreground">
                  Gorgias has deeper Shopify integration. Order edits, product variants, refunds inline. FloatChat has order-history sync but not edits.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">2. D2C-specific playbooks</h3>
                <p className="text-muted-foreground">
                  Gorgias has prebuilt automation for cart recovery, return, and refund flows.
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
                <span><strong>Per-agent pricing.</strong> Gorgias tickets-based pricing punishes high-volume support seasons (BFCM, holidays).</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Voice + SMS bundled.</strong> Gorgias has SMS add-on; voice is limited.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Lower base.</strong> $19.99 Starter beats Gorgias $50 Basic.</span>
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
                <h3 className="font-semibold mb-2">Can FloatChat edit Shopify orders inline?</h3>
                <p className="text-muted-foreground">Not yet. We show order history and can trigger webhooks. Full edit support (cancel, refund initiation, variant change) is on the roadmap.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">How does pricing work during BFCM?</h3>
                <p className="text-muted-foreground">FloatChat is flat per-agent. Your ticket volume doesn't affect your bill. Gorgias can spike significantly during high-volume sales events.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">Is migration from Gorgias free?</h3>
                <p className="text-muted-foreground">Yes. 48-hour migration. We import Shopify customer data, conversation history, and macros.</p>
              </div>
            </div>
          </div>
        </section>

        <RelatedComparisons competitor="gorgias" />

        {/* Final CTA */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Switch from Gorgias
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
