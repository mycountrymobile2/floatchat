import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RelatedComparisons } from "@/components/related-comparisons"
import { Check, X } from "lucide-react"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: "FloatChat vs Front. Better Pricing, More Channels",
  description:
    "Front alternative. Capacity pricing beats $19-99/seat. AI bundled. Voice + SMS native that Front doesn't have.",
  alternates: {
    canonical: "https://floatchat.com/vs/front",
  },
}

export default function VsFrontPage() {
  usePageMeta(metadata)
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4">Front Alternative</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                FloatChat vs Front. Capacity pricing wins.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Front charges $19-99/seat with a 5-seat minimum. FloatChat Growth is $69 for 10 agents flat.
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
                    <th className="text-left p-4 font-semibold">Front Growth 10 seats</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border bg-primary/5 font-semibold">
                    <td className="p-4">Monthly</td>
                    <td className="p-4">$69</td>
                    <td className="p-4">$590 ($59 x 10)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">AI</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Bundled</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />On Scale tier ($99/seat)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Voice</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Native basic</td>
                    <td className="p-4">Twilio relay</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">5-seat minimum?</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />No</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />Yes</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Annual savings</td>
                    <td className="p-4">-</td>
                    <td className="p-4 text-green-600 font-semibold">$6,252 vs FloatChat</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Where Front is better */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Where Front is better
            </h2>
            <div className="space-y-6 max-w-3xl">
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">1. Email collaboration UX</h3>
                <p className="text-muted-foreground">
                  Front pioneered the shared email inbox and the rhythm of "internal notes inside the email" is more polished.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">2. Calendar integrations</h3>
                <p className="text-muted-foreground">
                  Front has deeper Outlook and Gmail calendar integration.
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
                <span><strong>Capacity pricing.</strong> No 5-seat minimum tax.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>AI bundled</strong> at $9.99 (Lite) or $19.99 (Starter). Front AI is on Scale tier ($99/seat).</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Voice + SMS native.</strong> Front doesn't bundle these.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Free plan exists.</strong> Front has a 30-day trial.</span>
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
                <h3 className="font-semibold mb-2">Can I keep Front's shared drafts feature?</h3>
                <p className="text-muted-foreground">FloatChat has internal notes and collaborative replies. Shared drafts as Front does them require our product team to review. Check with our team.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">What about Front's external party participation?</h3>
                <p className="text-muted-foreground">FloatChat doesn't currently support external party email threads. If that's core to your workflow, Front may be a better fit.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">How long does migration take?</h3>
                <p className="text-muted-foreground">48 hours. Export from Front, import to FloatChat, onboard team.</p>
              </div>
            </div>
          </div>
        </section>

        <RelatedComparisons competitor="front" />

        {/* Final CTA */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Switch from Front
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
