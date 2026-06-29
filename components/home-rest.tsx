import { Logos } from "@/components/logos"
import { Features } from "@/components/features"
import { AICopilot } from "@/components/ai-copilot"
import { AIFeatures } from "@/components/ai-features"
import { Omnichannel } from "@/components/omnichannel"
import { Testimonials } from "@/components/testimonials"
import { Steps } from "@/components/steps"
import { FAQ } from "@/components/faq"
import { CTA } from "@/components/cta"

/**
 * Everything below the homepage hero. Split into its own lazy chunk so the
 * homepage's critical JS only carries the Header + Hero — these ~2,500 lines of
 * below-the-fold sections no longer block first paint / inflate Total Blocking
 * Time on mobile.
 */
export default function HomeRest() {
  return (
    <>
      <Logos />
      <Features />
      <AICopilot />
      <AIFeatures />
      <Omnichannel />
      <Testimonials />
      <Steps />
      <FAQ />
      <CTA />
    </>
  )
}
