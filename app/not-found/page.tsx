"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Home, MessageSquare, Tag, BookOpen, Layers, Mail } from "lucide-react"

const suggestions = [
  { label: "Homepage", href: "/", icon: Home },
  { label: "Pricing", href: "/pricing", icon: Tag },
  { label: "Live Chat", href: "/live-chat", icon: MessageSquare },
  { label: "Comparisons", href: "/vs/intercom", icon: Layers },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Contact", href: "/contact", icon: Mail },
]

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "Page not found (404) | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc) {
      desc.setAttribute(
        "content",
        "The page you're looking for doesn't exist. Find what you need in the FloatChat sitemap."
      )
    }
  }, [])

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20">
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">404</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                We couldn't find that page.
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                The link may be broken, the page may have moved, or you may have mistyped the URL.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white px-6 py-3 text-base font-semibold hover:bg-primary/90 transition-colors"
                >
                  Go to homepage
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card text-foreground px-6 py-3 text-base font-semibold hover:bg-secondary/50 transition-colors"
                >
                  Contact support
                </Link>
              </div>

              <div className="mt-14">
                <p className="text-sm font-medium text-foreground mb-4">Popular destinations</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
                  {suggestions.map((s) => (
                    <Link
                      key={s.label}
                      to={s.href}
                      className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground hover:border-primary/40 hover:bg-secondary/30 transition-colors"
                    >
                      <s.icon className="h-4 w-4 text-primary shrink-0" />
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
