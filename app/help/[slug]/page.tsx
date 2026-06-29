"use client"

import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, MessageSquare } from "lucide-react"

// Best-effort: turn the slug back into a readable title.
function deslugify(slug: string): string {
  return slug
    .split("-")
    .map((word) => (word.length > 0 ? word[0].toUpperCase() + word.slice(1) : ""))
    .join(" ")
}

export default function HelpArticlePage() {
  const { slug = "" } = useParams<{ slug: string }>()
  const title = deslugify(slug)

  useEffect(() => {
    document.title = `${title} — Help Center | FloatChat`
    const desc = document.querySelector('meta[name="description"]')
    if (desc) {
      desc.setAttribute(
        "content",
        `FloatChat Help Center — guides and how-tos for ${title.toLowerCase()}.`
      )
    }
  }, [title])

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20">
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/help"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Help Center
              </Link>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
                {title}
              </h1>

              <div className="mt-8 rounded-2xl border border-border bg-card p-8">
                <p className="text-base text-foreground leading-relaxed mb-4">
                  We're still writing this article. In the meantime, our support team can answer
                  your question directly — usually within one business hour.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  If you'd like to be notified when this article is published, email{" "}
                  <a
                    href="mailto:support@floatchat.com"
                    className="text-primary underline underline-offset-2 hover:no-underline"
                  >
                    support@floatchat.com
                  </a>{" "}
                  with the subject line "Help article: {title}".
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white px-5 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Contact support
                  </Link>
                  <Link
                    to="/help"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card text-foreground px-5 py-2.5 text-sm font-semibold hover:bg-secondary/50 transition-colors"
                  >
                    Browse all articles
                  </Link>
                </div>
              </div>

              <div className="mt-10 text-sm text-muted-foreground">
                Looking for something specific? Try these popular topics:{" "}
                <Link to="/help" className="text-primary underline underline-offset-2 hover:no-underline">
                  Getting Started
                </Link>
                {" · "}
                <Link to="/pricing" className="text-primary underline underline-offset-2 hover:no-underline">
                  Pricing
                </Link>
                {" · "}
                <Link to="/docs" className="text-primary underline underline-offset-2 hover:no-underline">
                  Developer Docs
                </Link>
                .
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
