import { Link } from "react-router-dom"
import { ArrowRight, Sparkles } from "lucide-react"

/**
 * Mid-page inline CTA — for product, solution, and comparison pages.
 *
 * Drops in cleanly between content sections. Visually distinct from the
 * hero and final-CTA blocks so it doesn't feel repetitive.
 *
 * Usage:
 *   <InlineCTA
 *     headline="Add AI Captain at $9.99"
 *     body="200 replies/month, no per-resolution fees"
 *     primaryLabel="Start Free"
 *     primaryHref="/signup?plan=free"
 *     secondaryLabel="See pricing"
 *     secondaryHref="/pricing"
 *   />
 */

type InlineCTAProps = {
  headline: string
  body?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  tone?: "primary" | "neutral"
}

export function InlineCTA({
  headline,
  body,
  primaryLabel = "Start Free",
  primaryHref = "/signup?plan=free",
  secondaryLabel,
  secondaryHref,
  tone = "primary",
}: InlineCTAProps) {
  const isPrimary = tone === "primary"

  return (
    <section className="py-12 lg:py-16" aria-label="Inline call to action">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div
          className={`relative overflow-hidden rounded-2xl border p-8 lg:p-10 ${
            isPrimary
              ? "border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent"
              : "border-border bg-card"
          }`}
        >
          {/* Subtle background glow on primary variant */}
          {isPrimary && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl"
            />
          )}

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className={`h-4 w-4 ${isPrimary ? "text-primary" : "text-muted-foreground"}`} />
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Get started
                </span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
                {headline}
              </h3>
              {body && <p className="mt-2 text-base text-muted-foreground">{body}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to={primaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white px-6 py-3 text-sm font-semibold shadow-md shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              {secondaryLabel && secondaryHref && (
                <Link
                  to={secondaryHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card text-foreground px-6 py-3 text-sm font-semibold hover:bg-secondary/40 transition-colors"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
