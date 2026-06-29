import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: 'Privacy Policy | FloatChat',
  description: 'FloatChat Privacy Policy — the personal data we collect, how we use it, the third parties involved, and your rights under GDPR and US state privacy laws.',
  alternates: { canonical: 'https://floatchat.com/privacy' },
}

export default function PrivacyPage() {
  usePageMeta(metadata)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Force body to pure white on this route so the header's bg-white/50 backdrop
  // blur reads as white instead of the site's #FAFCFF — eliminates the visible
  // seam between the header and the white iubenda iframe.
  useEffect(() => {
    const prev = document.body.style.backgroundColor
    document.body.style.backgroundColor = "#ffffff"
    return () => {
      document.body.style.backgroundColor = prev
    }
  }, [])

  // Listen for iubenda's iframe-height postMessage and resize so the iframe
  // exactly matches its content — kills the internal scrollbar; only the page
  // scrolls.
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (!e.origin.includes("iubenda.com")) return
      let h: number | undefined
      const d = e.data
      if (typeof d === "number") h = d
      else if (d && typeof d === "object") {
        const o = d as Record<string, unknown>
        const cand = o.height ?? o.iframeHeight ?? (o.payload as Record<string, unknown> | undefined)?.height
        if (typeof cand === "number") h = cand
      } else if (typeof d === "string") {
        try {
          const o = JSON.parse(d) as Record<string, unknown>
          if (typeof o.height === "number") h = o.height
          else if (typeof o.iframeHeight === "number") h = o.iframeHeight
        } catch {
          const m = d.match(/:(\d{3,5}):/)
          if (m) h = parseInt(m[1], 10)
        }
      }
      if (h && h > 200 && h < 50000 && iframeRef.current) {
        iframeRef.current.style.height = h + 32 + "px"
      }
    }
    window.addEventListener("message", handler)
    return () => window.removeEventListener("message", handler)
  }, [])

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="pb-16 lg:pb-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-none">
              {/* Visually-hidden h1 so the page has a proper heading for
                  screen readers / SEO without duplicating iubenda's own h1. */}
              <h1 className="sr-only">Privacy Policy</h1>

              <iframe
                ref={iframeRef}
                src="https://www.iubenda.com/privacy-policy/32586379"
                title="FloatChat Privacy Policy"
                className="block w-full"
                style={{ height: "21350px", border: 0, background: "transparent" }}
                loading="lazy"
                scrolling="no"
              />

              <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4 text-sm text-muted-foreground">
                <Link className="hover:text-foreground transition-colors" to="/cookies">Cookie Policy</Link>
                <Link className="hover:text-foreground transition-colors" to="/terms">Terms of Service</Link>
                <Link className="hover:text-foreground transition-colors" to="/dpa">Data Processing Agreement</Link>
                <Link className="hover:text-foreground transition-colors" to="/aup">Acceptable Use Policy</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
