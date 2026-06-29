import { useState } from "react"
import { Link } from "react-router-dom"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, CheckCircle2, ArrowLeft } from "lucide-react"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: 'Subscribe to Sub-processor Updates | FloatChat',
  description: 'Get notified at least 30 days before FloatChat adds a new sub-processor. Required for customers under our DPA.',
  alternates: { canonical: 'https://floatchat.com/subprocessors/subscribe' },
}

export default function SubprocessorSubscribePage() {
  usePageMeta(metadata)
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch("/api/subprocessor-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Subscription failed")
      }
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-xl">

              <Link
                to="/subprocessors"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Sub-processor List
              </Link>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Get notified when our sub-processor list changes.
              </h1>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our <Link to="/dpa" className="text-foreground hover:underline">DPA</Link> promises at least 30 days' notice before any new sub-processor starts processing personal data. Subscribe here and we'll email you each time we add, remove, or replace one.
              </p>

              {done ? (
                <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-6">
                  <CheckCircle2 className="h-8 w-8 text-green-600 mb-3" />
                  <h2 className="text-lg font-semibold text-foreground mb-2">You're subscribed.</h2>
                  <p className="text-sm text-muted-foreground">
                    We'll email <span className="font-medium text-foreground">{email}</span> with at least 30 days' notice before any sub-processor change. You can unsubscribe at any time by replying to one of those notices.
                  </p>
                  <div className="mt-5">
                    <Link
                      to="/subprocessors"
                      className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to Sub-processor List
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-10 rounded-2xl border border-border bg-card p-6 lg:p-8 space-y-5">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="mt-1.5"
                      aria-required="true"
                    />
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      Use the address that should receive change notifications. A shared inbox works well (e.g., <code className="text-foreground">privacy@yourcompany.com</code>).
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="company" className="text-sm font-medium text-foreground">
                      Company <span className="text-muted-foreground font-normal">(optional)</span>
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Inc."
                      className="mt-1.5"
                    />
                  </div>

                  {error && (
                    <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                      {error}
                    </div>
                  )}

                  <Button type="submit" disabled={submitting} className="w-full gap-2">
                    <Mail className="h-4 w-4" />
                    {submitting ? "Subscribing…" : "Subscribe to updates"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    We use your email only to send sub-processor change notifications. See our <Link to="/privacy" className="text-foreground hover:underline">Privacy Policy</Link>.
                  </p>
                </form>
              )}

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
