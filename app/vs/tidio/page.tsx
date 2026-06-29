import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RelatedComparisons } from "@/components/related-comparisons"
import { Check, X } from "lucide-react"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: "FloatChat vs Tidio. Capacity Pricing Wins",
  description:
    "Tidio alternative. Capacity pricing instead of per-seat. AI bundled instead of $39+ Lyro add-on. Free plan with email + WhatsApp.",
  alternates: {
    canonical: "https://floatchat.com/vs/tidio",
  },
}

export default function VsTidioPage() {
  usePageMeta(metadata)
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4">Tidio Alternative</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                FloatChat vs Tidio. Capacity wins per-seat.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Same chat-led experience. AI bundled instead of $39+ Lyro add-on. Email and WhatsApp on Free that Tidio doesn't include.
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
                    <th className="text-left p-4 font-semibold">FloatChat Growth</th>
                    <th className="text-left p-4 font-semibold">Tidio Growth 10 seats + Lyro</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border bg-primary/5 font-semibold">
                    <td className="p-4">Monthly</td>
                    <td className="p-4">$69</td>
                    <td className="p-4">$629 ($590 + $39 Lyro)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">AI bundled</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />No ($39-289 add-on)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Email inbox</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes Free</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />Yes paid</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">WhatsApp</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes Free</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />No</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Voice + SMS</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes Starter+</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />No</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Annual savings</td>
                    <td className="p-4">-</td>
                    <td className="p-4 text-green-600 font-semibold">$6,720 vs FloatChat</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Where Tidio is better */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Where Tidio is better
            </h2>
            <div className="space-y-6 max-w-3xl">
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">1. Visual chatbot builder</h3>
                <p className="text-muted-foreground">
                  Tidio's drag-and-drop bot builder is more polished than FloatChat's current UI.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">2. Free tier limits</h3>
                <p className="text-muted-foreground">
                  Tidio Free is 50 conversations/month. FloatChat Free is unlimited live chat conversations.
                </p>
              </div>
              <p className="text-muted-foreground italic">
                Tidio's main edge is their bot UX. We close the gap on functionality but not the polish yet.
              </p>
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
                <span><strong>Capacity pricing.</strong> $69 = 10 agents. Tidio = $59 x 10 = $590.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>AI bundled.</strong> Tidio Lyro is a separate $39-289 add-on. FloatChat AI is in the plan from $9.99.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Free email + WhatsApp.</strong> Tidio Free is chat only.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Voice + SMS available.</strong> Tidio doesn't have either at any tier.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Pricing Math Table */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8 text-center">
              Pricing comparison
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold"></th>
                    <th className="text-left p-4 font-semibold">FloatChat Growth</th>
                    <th className="text-left p-4 font-semibold">Tidio Growth + Lyro</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-4">Base</td>
                    <td className="p-4">$69</td>
                    <td className="p-4">$590</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">AI</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Included</td>
                    <td className="p-4">$39 (light) / $289 (heavy)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Voice</td>
                    <td className="p-4">Add-on $5 + usage</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />Not available</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">SMS</td>
                    <td className="p-4">$0.005/seg + carrier</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />Not available</td>
                  </tr>
                  <tr className="border-t border-border bg-primary/5 font-semibold">
                    <td className="p-4">Total</td>
                    <td className="p-4">$74-100</td>
                    <td className="p-4">$629-879</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Migration */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                Migration
              </h2>
              <p className="text-muted-foreground text-lg">
                Standard 48-hour migration. Export Tidio data, import to FloatChat, train Captain on your help docs.
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
                <h3 className="font-semibold mb-2">Does FloatChat have a chatbot visual builder?</h3>
                <p className="text-muted-foreground">Yes on Lite and above. UI is functional, less polished than Tidio's. Improving in Q3.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">Can I keep my Tidio bot logic?</h3>
                <p className="text-muted-foreground">We help reproduce it in FloatChat during migration. Some Tidio-specific functions don't have direct FloatChat equivalents.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">What about Tidio Plus plan?</h3>
                <p className="text-muted-foreground">Tidio Plus ($749) bundles a flat rate. FloatChat Pro ($189) does the same with more channels (voice + SMS) and AI included.</p>
              </div>
            </div>
          </div>
        </section>

        <RelatedComparisons competitor="tidio" />

        {/* Final CTA */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Switch from Tidio
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
