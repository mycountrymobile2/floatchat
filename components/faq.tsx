import { Link } from "react-router-dom"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"

const faqs: FAQItem[] = [
  {
    question: "Is the Free plan really free forever?",
    answer:
      "Yes. No credit card. No time limit. You get the live chat widget on one domain, an email inbox, WhatsApp two-way conversations, contact upload, Shopify, and WooCommerce integrations. The Free plan does not include AI — that starts at $9.99.",
  },
  {
    question: "How does AI cost work?",
    answer:
      "AI Chatbot is bundled in the Lite plan at $9.99 (200 replies/month). Starter ($19.99) adds full AI Captain with sentiment, copilot, summary, and knowledge base — 500 replies. Growth 2,000. Pro 10,000. Enterprise unlimited. No per-resolution fees.",
  },
  {
    question: "Where is my data hosted?",
    answer:
      "DigitalOcean NYC3 (New York metro region). Encrypted at rest (AES-256) and in transit (TLS 1.3). GDPR and CCPA compliant. SOC 2 Type II in progress.",
  },
  {
    question: "Can I switch from Intercom, Zendesk, or Tidio?",
    answer:
      "Yes. We export your data, import it to FloatChat, train Captain on your help docs, and have your team live in 48 hours. Free for any business switching from another platform.",
  },
  {
    question: "What's the catch?",
    answer:
      "None. We make money when teams grow into Lite, Starter, Growth, or Pro. The Free plan exists because we want you to try the product before you pay.",
  },
  {
    question: "What is NOT available on any tier?",
    answer:
      "No whitelabel, no custom domain (Help Center stays on FloatChat URL), no mobile app (web-only), no WhatsApp Business API marketing broadcasts, no IVR/voicemail/call recording, no PCI DSS.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-gradient-to-b from-white to-[#EEF2FF]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FAQSection
          faqs={faqs}
          title="Common questions"
          description="Straight answers, no sales spin."
          footer={
            <p className="text-sm text-muted-foreground">
              More questions?{" "}
              <Link
                to="/contact"
                className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
              >
                Talk to us
              </Link>{" "}
              or check the{" "}
              <Link
                to="/help"
                className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
              >
                Help Center
              </Link>
              .
            </p>
          }
        />
      </div>
    </section>
  )
}
