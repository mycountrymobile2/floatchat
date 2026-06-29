import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RelatedComparisons } from "@/components/related-comparisons"
import { Check, X } from "lucide-react"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: "FloatChat vs Tawk.to. AI Built In, Real Upgrade Path",
  description:
    "Tawk.to alternative. Free live chat with email and WhatsApp Tawk doesn't have. AI Chatbot from $9.99 instead of paid add-on.",
  alternates: {
    canonical: "https://floatchat.com/vs/tawk",
  },
}

export default function VsTawkPage() {
  usePageMeta(metadata)
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4">Tawk.to Alternative</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                FloatChat vs Tawk.to. Real upgrade path.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Tawk is free with hidden costs (their own agents marketplace). FloatChat is free with a clean upgrade path. Email + WhatsApp on Free that Tawk doesn't have.
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
                    <th className="text-left p-4 font-semibold">Tawk.to Free</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border bg-primary/5 font-semibold">
                    <td className="p-4">Live chat</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes (unlimited agents)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Email inbox</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />No</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">WhatsApp two-way</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />No</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Shopify, WooCommerce</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Yes</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />No</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">AI Chatbot</td>
                    <td className="p-4">$9.99 (Lite)</td>
                    <td className="p-4">Add-on (separate cost)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Branding</td>
                    <td className="p-4">"Powered by FloatChat"</td>
                    <td className="p-4">"Powered by Tawk.to"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Where Tawk.to is better */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Where Tawk.to is better
            </h2>
            <div className="space-y-6 max-w-3xl">
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">1. Unlimited agents on Free</h3>
                <p className="text-muted-foreground">
                  Tawk lets you add unlimited agents free. FloatChat Free is 1 agent.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">2. Massive existing user base</h3>
                <p className="text-muted-foreground">
                  5M+ businesses use Tawk. They have years of stability.
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
                <span><strong>Real upgrade path.</strong> Tawk's "upgrade" is hiring their chat agents at $1/hour. FloatChat upgrades unlock real platform features.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Email + WhatsApp on Free.</strong> Tawk is chat-only.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>AI built in at $9.99.</strong> Tawk's AI is a paid add-on.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Modern UX.</strong> FloatChat's UI is current.</span>
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
                <h3 className="font-semibold mb-2">Can I have more than 1 agent on FloatChat Free?</h3>
                <p className="text-muted-foreground">No. Free plan is 1 agent. Starter ($19.99) gives you 3. Extra agents are $12/month each on Starter+.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">Is FloatChat's free plan as stable as Tawk?</h3>
                <p className="text-muted-foreground">We have a 99.9% uptime SLA. Same infrastructure commitment as paid plans.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">Will I lose my Tawk conversation history?</h3>
                <p className="text-muted-foreground">No. We import your contacts and conversation history when you switch. Free migration.</p>
              </div>
            </div>
          </div>
        </section>

        <RelatedComparisons competitor="tawk" />

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
