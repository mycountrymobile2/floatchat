import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RelatedComparisons } from "@/components/related-comparisons"
import { Check, X } from "lucide-react"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: "FloatChat vs Crisp. Voice + SMS Crisp Doesn't Have",
  description:
    "Crisp alternative. Voice and SMS native that Crisp doesn't bundle. AI Captain instead of Crisp Copilot add-on. From $0/mo.",
  alternates: {
    canonical: "https://floatchat.com/vs/crisp",
  },
}

export default function VsCrispPage() {
  usePageMeta(metadata)
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4">Crisp Alternative</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                FloatChat vs Crisp. Voice + SMS Crisp doesn't have.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Crisp is around $103/month flat. FloatChat Growth is $69. Crisp doesn't have voice or SMS.
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
                    <th className="text-left p-4 font-semibold">FloatChat Growth</th>
                    <th className="text-left p-4 font-semibold">Crisp Unlimited</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border bg-primary/5 font-semibold">
                    <td className="p-4">Monthly</td>
                    <td className="p-4">$69</td>
                    <td className="p-4">~$103 (approx)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Voice</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />No</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">SMS</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />No</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Multi-language Help Center</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Free plan</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Where Crisp is better */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Where Crisp is better
            </h2>
            <div className="space-y-6 max-w-3xl">
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">1. Flat pricing simplicity</h3>
                <p className="text-muted-foreground">
                  One price, unlimited everything (within Crisp's channels). No agent-count math.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">2. Indie-friendly culture</h3>
                <p className="text-muted-foreground">
                  Crisp is bootstrapped and small-team-friendly.
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
                <span><strong>Voice + SMS native.</strong> Crisp has neither.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Capacity pricing scales better.</strong> At 25 agents, FloatChat Pro is $189 vs Crisp at higher rates for premium features.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>AI bundled.</strong> Crisp's AI Copilot is a paid add-on.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>US data residency.</strong> Crisp is hosted in EU.</span>
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
                <h3 className="font-semibold mb-2">Is Crisp's Unlimited plan actually unlimited?</h3>
                <p className="text-muted-foreground">Within their supported channels (chat, email, Messenger). No voice, no SMS, no WhatsApp on Crisp free or Unlimited.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">What about Crisp's MagicType (live typing preview)?</h3>
                <p className="text-muted-foreground">FloatChat doesn't have a live typing preview. If that feature is important to your team, note it.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">How long does migration take?</h3>
                <p className="text-muted-foreground">48 hours. Export from Crisp, import to FloatChat.</p>
              </div>
            </div>
          </div>
        </section>

        <RelatedComparisons competitor="crisp" />

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
