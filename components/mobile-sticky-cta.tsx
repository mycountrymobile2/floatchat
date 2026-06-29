"use client"

import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ArrowRight, X } from "lucide-react"

/**
 * Mobile-only sticky CTA bar.
 *
 * - Hidden on auth, signup, login, dashboard, contact, demo routes
 *   (the user is already in-funnel; another CTA is noise)
 * - Hidden on desktop (md and up)
 * - User-dismissable per session via sessionStorage
 * - Auto-shows after a slight delay so the page can paint first
 */

const HIDDEN_ROUTES = ["/signup", "/login", "/forgot-password", "/dashboard", "/contact", "/demo"]

export function MobileStickyCTA() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    // Per-session dismissal
    if (sessionStorage.getItem("floatchat:mobile-cta-dismissed") === "1") {
      setDismissed(true)
      return
    }
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [])

  // Hide on routes already in the funnel
  if (HIDDEN_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"))) {
    return null
  }

  if (dismissed) return null

  return (
    <div
      className={`md:hidden fixed bottom-3 left-3 right-3 z-40 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
      }`}
      role="region"
      aria-label="Sign up call to action"
    >
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-xl shadow-black/20 px-4 py-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground leading-tight truncate">
            Start free — AI from $9.99
          </p>
          <p className="text-xs text-muted-foreground leading-tight">
            No credit card. Live in 5 minutes.
          </p>
        </div>
        <Link
          to="/signup?plan=free"
          className="inline-flex items-center gap-1 shrink-0 rounded-xl bg-primary text-white px-4 py-2 text-sm font-semibold shadow-md shadow-primary/30 active:scale-[0.98] transition-transform"
        >
          Start
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem("floatchat:mobile-cta-dismissed", "1")
            setDismissed(true)
          }}
          className="p-1.5 -mr-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shrink-0"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
