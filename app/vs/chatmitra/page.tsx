import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RelatedComparisons } from "@/components/related-comparisons"
import { Check, X } from "lucide-react"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: "FloatChat vs ChatMitra. Live Chat + Email That ChatMitra Doesn't Have",
  description:
    "ChatMitra alternative. Free live chat widget + email + WhatsApp two-way. AI Chatbot at $9.99. Same stack as ChatMitra Pro at lower cost.",
  alternates: {
    canonical: "https://floatchat.com/vs/chatmitra",
  },
}

export default function VsChatmitraPage() {
  usePageMeta(metadata)
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4">ChatMitra Alternative</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                FloatChat vs ChatMitra. Live chat + email that ChatMitra doesn't have.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                ChatMitra is WhatsApp-only. FloatChat adds live chat widget, email inbox, and a real upgrade path. Same Auto Reply + AI Chatbot stack at lower price.
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
                    <th className="text-left p-4 font-semibold">FloatChat Free</th>
                    <th className="text-left p-4 font-semibold">ChatMitra Free</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border bg-primary/5 font-semibold">
                    <td className="p-4">Live chat widget</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />No</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Email inbox</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />No</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">WhatsApp two-way</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes + WABA</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">WhatsApp marketing/templates</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />No (no BSP)</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Per-conversation fee</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />None</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />$0.20/conversation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Where ChatMitra is better - HONEST section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Where ChatMitra is better
            </h2>
            <div className="max-w-3xl">
              <div className="p-6 rounded-2xl border border-border bg-card mb-6">
                <p className="text-muted-foreground mb-4">
                  ChatMitra is a WhatsApp Business Solution Provider (BSP). FloatChat is not. Two real consequences:
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-1">1. WhatsApp marketing campaigns</h3>
                    <p className="text-muted-foreground">ChatMitra can send WhatsApp template messages to thousands of customers. FloatChat cannot.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">2. WhatsApp broadcast workflows</h3>
                    <p className="text-muted-foreground">Order updates, OTPs, marketing blasts via WhatsApp templates. ChatMitra has the Meta WABA license. FloatChat doesn't.</p>
                  </div>
                </div>
                <p className="mt-4 font-semibold text-foreground">
                  If your business runs primarily on WhatsApp marketing (especially for Indian markets), ChatMitra is the right tool. FloatChat is the wrong tool.
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
                <span><strong>Live chat widget on Free.</strong> ChatMitra is WhatsApp-only.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Email inbox on Free.</strong> ChatMitra has none.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>No per-conversation fee.</strong> ChatMitra charges $0.20 per conversation. FloatChat doesn't.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>AI Chatbot at $9.99.</strong> ChatMitra Pro is ~$12.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>6-tier upgrade path.</strong> ChatMitra has 2 plans (Free + $999 Pro). Limits scaling.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Use case decision table */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8 text-center">
              Use case decision guide
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border max-w-2xl mx-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold">Your priority</th>
                    <th className="text-left p-4 font-semibold">Use</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-4">WhatsApp marketing campaigns</td>
                    <td className="p-4 font-semibold">ChatMitra</td>
                  </tr>
                  <tr className="border-t border-border bg-primary/5 font-semibold">
                    <td className="p-4">Live chat widget on website</td>
                    <td className="p-4">FloatChat</td>
                  </tr>
                  <tr className="border-t border-border bg-primary/5 font-semibold">
                    <td className="p-4">Email inbox + chat + WhatsApp combined</td>
                    <td className="p-4">FloatChat</td>
                  </tr>
                  <tr className="border-t border-border bg-primary/5 font-semibold">
                    <td className="p-4">US market customer support</td>
                    <td className="p-4">FloatChat</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Indian market WhatsApp commerce</td>
                    <td className="p-4 font-semibold">ChatMitra</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">Will FloatChat add WhatsApp Business API?</h3>
                <p className="text-muted-foreground">WhatsApp Cloud API integration is on the roadmap for Pro and Enterprise tiers. No firm date.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">Can I use both ChatMitra and FloatChat?</h3>
                <p className="text-muted-foreground">Yes. ChatMitra for WhatsApp marketing broadcasts. FloatChat for US website chat + email support. Different use cases.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">Is FloatChat cheaper than ChatMitra Pro?</h3>
                <p className="text-muted-foreground">On the automation stack: FloatChat Lite ($9.99) vs ChatMitra Pro (~$12). Similar features. FloatChat adds live chat widget and email that ChatMitra doesn't have.</p>
              </div>
            </div>
          </div>
        </section>

        <RelatedComparisons competitor="chatmitra" />

        {/* Final CTA */}
        <section className="py-16 lg:py-24 bg-muted/30">
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
