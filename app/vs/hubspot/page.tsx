import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RelatedComparisons } from "@/components/related-comparisons"
import { Check, X } from "lucide-react"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: "FloatChat vs HubSpot Service Hub. Without the CRM Tax",
  description:
    "HubSpot Service Hub alternative. AI bundled, voice native, capacity pricing. From $9.99/mo without the HubSpot CRM lock-in.",
  alternates: {
    canonical: "https://floatchat.com/vs/hubspot",
  },
}

export default function VsHubspotPage() {
  usePageMeta(metadata)
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4">HubSpot Service Hub Alternative</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                FloatChat vs HubSpot Service Hub. Without the CRM tax.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                HubSpot Service Hub Pro is $90/seat. FloatChat Pro is $189 for 25 agents flat. AI bundled. No CRM lock-in.
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
                    <th className="text-left p-4 font-semibold">HubSpot Service Hub Pro 25 seats</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border bg-primary/5 font-semibold">
                    <td className="p-4">Monthly</td>
                    <td className="p-4">$189</td>
                    <td className="p-4">$2,250</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Voice</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Bundled basic</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />Twilio relay (limited)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Requires HubSpot CRM?</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />No</td>
                    <td className="p-4">Best when you do</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">AI</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Bundled</td>
                    <td className="p-4">Breeze AI bundled in Pro</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Annual savings</td>
                    <td className="p-4">-</td>
                    <td className="p-4 text-green-600 font-semibold">$24,732 vs FloatChat</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Where HubSpot is better */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Where HubSpot is better
            </h2>
            <div className="space-y-6 max-w-3xl">
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">1. If you already use HubSpot CRM</h3>
                <p className="text-muted-foreground">
                  Service Hub plugs directly into deals, lifecycle stages, and contact properties. Strongest when paired with HubSpot Marketing Hub and Sales Hub.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">2. Reporting and dashboards</h3>
                <p className="text-muted-foreground">
                  HubSpot's reporting is more polished.
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
                <span><strong>No CRM lock-in.</strong> FloatChat works with HubSpot, Salesforce, Stripe, or no CRM at all. You're not paying for the CRM ecosystem.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Capacity pricing.</strong> Pay for team size, not per agent.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Voice native.</strong> HubSpot Calling is Twilio-relayed and limited.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Cheaper at every tier</strong> without the CRM upsell pressure.</span>
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
                <h3 className="font-semibold mb-2">Do I need to cancel HubSpot entirely?</h3>
                <p className="text-muted-foreground">No. Keep HubSpot CRM for marketing. Switch Service Hub to FloatChat for support. They integrate natively.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">What about HubSpot's knowledge base?</h3>
                <p className="text-muted-foreground">FloatChat Help Center (Starter+) replaces HubSpot's. Captain trains on your help content.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">Can FloatChat sync with HubSpot?</h3>
                <p className="text-muted-foreground">Yes. Native HubSpot integration on Starter+. Syncs contacts, deals, conversation history.</p>
              </div>
            </div>
          </div>
        </section>

        <RelatedComparisons competitor="hubspot" />

        {/* Final CTA */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Switch from HubSpot Service Hub
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
