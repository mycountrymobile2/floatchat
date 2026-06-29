import { Link } from "react-router-dom"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: 'Accessibility Statement | FloatChat',
  description: 'FloatChat Accessibility Statement — our commitment to WCAG 2.2 AA, current conformance status, known gaps, and how to get help.',
  alternates: { canonical: 'https://floatchat.com/accessibility' },
}

export default function AccessibilityPage() {
  usePageMeta(metadata)
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                FloatChat Accessibility Statement
              </h1>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our commitment, current status, known gaps, and how to get help.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Effective: May 20, 2026 &nbsp;|&nbsp; Version: v1.0 — DRAFT for legal review
              </p>

              <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <p className="font-semibold">DRAFT — FOR LEGAL REVIEW</p>
                <p className="mt-1">
                  This document is an AI-assisted draft prepared to accelerate legal review. It is not legal advice and must be reviewed by qualified counsel in the relevant jurisdictions before publication or signature.
                </p>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">Our commitment</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                FloatChat is committed to being usable by everyone, including people who rely on assistive technology. We aim to meet the Web Content Accessibility Guidelines (WCAG) version 2.2, Level AA, which is referenced by the EU's harmonized standard EN 301 549 for the European Accessibility Act and the US Department of Justice's accessibility rule.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">What we've done</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Keyboard-only navigation throughout the chat widget and the customer dashboard.</li>
                <li>ARIA roles and labels on every interactive element.</li>
                <li>Color contrast that meets WCAG 2.2 AA (4.5:1 for normal text, 3:1 for large text).</li>
                <li>Visible focus indicators on all interactive elements.</li>
                <li>Screen reader testing against current versions of NVDA, JAWS, and VoiceOver.</li>
                <li>No automatic audio or video playback.</li>
                <li>All time-limited actions have a way to extend or disable the limit.</li>
                <li>All non-text content has a meaningful text alternative.</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">Known limitations</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We're being transparent about what's not yet ideal:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Complex chart visualizations in the customer dashboard currently rely on color encoding. We are adding pattern fills and accessible data tables.</li>
                <li>Some third-party emoji and reaction picker controls do not fully meet WCAG 2.2 AA. A replacement is on the roadmap.</li>
                <li>Localized language support for screen readers is limited to English at present. Additional languages will be added.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you hit a barrier we haven't listed, please tell us — see Contact below.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">Conformance status</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Based on internal review and external evaluation in May 2026, the FloatChat chat widget and customer dashboard are partially conformant with WCAG 2.2 Level AA. "Partially conformant" means most parts of the service meet the standard, with the gaps listed above. We commit to remediating those gaps on a published timeline. Our next full evaluation is scheduled for November 2026.
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">Alternative ways to reach us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you cannot use any part of the service because of an accessibility barrier, you can:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Email us at <a href="mailto:support@floatchat.com" className="text-foreground hover:underline">support@floatchat.com</a> — we respond within one business day.</li>
                <li>Reach us through the customer who deployed the FloatChat widget you are using.</li>
                <li>Ask for a phone call — we will arrange a callback at a time that works for you.</li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">Enforcement and feedback</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We treat every accessibility report as a priority issue. If you have a complaint that we can't resolve, you can contact your local accessibility regulator (for example, the US Department of Justice ADA hotline or your country's national accessibility authority in the EU).
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4">This statement</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This statement was last reviewed on May 20, 2026 and is reviewed at least annually.
              </p>

              <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4 text-sm text-muted-foreground">
                <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                <Link to="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link>
                <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                <Link to="/aup" className="hover:text-foreground transition-colors">Acceptable Use Policy</Link>
                <Link to="/dpa" className="hover:text-foreground transition-colors">Data Processing Agreement</Link>
                <Link to="/subprocessors" className="hover:text-foreground transition-colors">Sub-processors</Link>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
