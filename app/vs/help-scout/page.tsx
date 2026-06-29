import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RelatedComparisons } from "@/components/related-comparisons"
import { Check, X } from "lucide-react"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: "FloatChat vs Help Scout. More Channels, Less Per Seat",
  description:
    "Help Scout alternative. Voice + SMS + chat bundled with email. Capacity pricing instead of $25-65/seat. AI Captain included.",
  alternates: {
    canonical: "https://floatchat.com/vs/help-scout",
  },
}

export default function VsHelpScoutPage() {
  usePageMeta(metadata)
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4">Help Scout Alternative</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                FloatChat vs Help Scout. More than email.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Help Scout is email-led. FloatChat bundles email + chat + voice + SMS at lower per-agent cost. AI built in.
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
                    <th className="text-left p-4 font-semibold">Help Scout Plus 10 seats</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border bg-primary/5 font-semibold">
                    <td className="p-4">Monthly</td>
                    <td className="p-4">$69</td>
                    <td className="p-4">$500</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Channels</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />10 (chat, email, WhatsApp, voice, SMS, social)</td>
                    <td className="p-4">Email-led, basic chat (Beacon)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Voice</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Native basic</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />Not available</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">SMS</td>
                    <td className="p-4"><Check className="w-4 h-4 text-green-500 inline mr-2" />Native</td>
                    <td className="p-4"><X className="w-4 h-4 text-red-500 inline mr-2" />Not available</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Annual savings</td>
                    <td className="p-4">-</td>
                    <td className="p-4 text-green-600 font-semibold">$5,172 vs FloatChat</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Where Help Scout is better */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Where Help Scout is better
            </h2>
            <div className="space-y-6 max-w-3xl">
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">1. Email UX is excellent</h3>
                <p className="text-muted-foreground">
                  Help Scout has 10+ years of polish on email-led support.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">2. Beacon widget design</h3>
                <p className="text-muted-foreground">
                  Their chat widget is well-designed for SaaS knowledge base + chat hybrid use cases.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold text-lg mb-2">3. NPS and CSAT reporting</h3>
                <p className="text-muted-foreground">
                  Help Scout's reporting is more email-focused and very mature.
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
                <span><strong>Voice and SMS native.</strong> Help Scout has neither.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Capacity pricing.</strong> $69 = 10 agents flat vs $250-650 on Help Scout per-seat.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>WhatsApp + Instagram + Messenger native.</strong> Help Scout doesn't have these.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span><strong>AI bundled.</strong> Help Scout AI features are on Pro tier ($65/seat).</span>
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
                <h3 className="font-semibold mb-2">Is FloatChat's email as good as Help Scout?</h3>
                <p className="text-muted-foreground">For team basics (assign, note, reply, automate), yes. Help Scout's email UX has more polish. FloatChat trades polish for channel breadth.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">Can I keep my Help Scout conversations?</h3>
                <p className="text-muted-foreground">Yes. 48-hour migration imports your conversation history.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">What if my team only needs email?</h3>
                <p className="text-muted-foreground">Free plan covers 1 inbox. Upgrade if you need more. But if email-only is permanent, Help Scout is genuinely good.</p>
              </div>
            </div>
          </div>
        </section>

        <RelatedComparisons competitor="help-scout" />

        {/* Final CTA */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Switch from Help Scout
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
