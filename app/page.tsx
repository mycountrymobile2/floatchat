import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { lazy, Suspense, useEffect } from "react"

// Below-the-fold — split out of the homepage's critical JS.
const HomeRest = lazy(() => import("@/components/home-rest"))
const Footer = lazy(() => import("@/components/footer").then((m) => ({ default: m.Footer })))

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "FloatChat",
      "url": "https://floatchat.com",
      "logo": "https://floatchat.com/logo.png",
      "description": "The agentic AI platform for customer conversations — agentic AI that talks, takes action, and broadcasts across WhatsApp, RCS, SMS, voice, email, and social, all from one platform.",
      "sameAs": [
        "https://www.linkedin.com/company/floatchat",
        "https://twitter.com/floatchatHQ"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "sales@floatchat.com",
        "contactType": "Customer Service",
        "areaServed": "US",
        "availableLanguage": ["English"]
      }
    },
    {
      "@type": "SoftwareApplication",
      "name": "FloatChat",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "0",
        "highPrice": "599",
        "offerCount": "6"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is the Free plan really free forever?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. No credit card. No time limit. You get the live chat widget on one domain, an email inbox, WhatsApp two-way conversations, contact upload, Shopify, and WooCommerce integrations. The Free plan does not include AI - that starts at $9.99."
          }
        },
        {
          "@type": "Question",
          "name": "How does AI cost work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI Chatbot is bundled in the Lite plan at $9.99 (200 replies/month). Starter ($19.99) adds full AI Captain with 500 replies. Growth 2,000. Pro 10,000. Enterprise unlimited."
          }
        },
        {
          "@type": "Question",
          "name": "Where is my data hosted?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DigitalOcean NYC3 (New York metro region). Encrypted at rest. GDPR and CCPA compliant. SOC 2 Type II in progress."
          }
        },
        {
          "@type": "Question",
          "name": "Can I switch from Intercom, Zendesk, or Tidio?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We export your data, import it to FloatChat, train Captain on your help docs, and have your team live in 48 hours. Free for any business switching."
          }
        }
      ]
    }
  ]
}

export default function Home() {
  useEffect(() => {
    document.title = "FloatChat — The Agentic AI Platform for Customer Conversations"
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute("content", "Deploy agentic AI that talks, takes action, and broadcasts across WhatsApp, RCS, SMS, voice, email, and social — all from one platform.")
  }, [])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main-content">
        <Hero />
        <Suspense fallback={null}>
          <HomeRest />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}
