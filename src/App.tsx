import { useEffect, lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { Toaster } from "sonner"
import { MobileStickyCTA } from "@/components/mobile-sticky-cta"

// Eagerly loaded — the homepage is the entry route; bundling anything else here
// only bloats the homepage's critical JS.
import HomePage from "@/app/page"

// Lazy loaded — high-traffic conversion pages
const PricingPage = lazy(() => import("@/app/pricing/page"))
const SignupPage = lazy(() => import("@/app/signup/page"))
const LoginPage = lazy(() => import("@/app/login/page"))

// Lazy loaded — product pages
const AiAgentPage = lazy(() => import("@/app/ai-agent/page"))
const VoicePage = lazy(() => import("@/app/voice/page"))
const SmsPage = lazy(() => import("@/app/sms/page"))
const EmailPage = lazy(() => import("@/app/email/page"))
const LiveChatPage = lazy(() => import("@/app/live-chat/page"))
const HelpCenterPage = lazy(() => import("@/app/help-center/page"))
const WhatsAppPage = lazy(() => import("@/app/whatsapp/page"))
const InboxPage = lazy(() => import("@/app/inbox/page"))
const AutomationPage = lazy(() => import("@/app/automation/page"))
const IntegrationsPage = lazy(() => import("@/app/integrations/page"))

// Lazy loaded — AI agents
const AiAgentsHubPage = lazy(() => import("@/app/ai-agents/page"))
const AiAgentCustomerServicePage = lazy(() => import("@/app/ai-agents/customer-service/page"))
const AiAgentSalesPage = lazy(() => import("@/app/ai-agents/sales/page"))
const AiAgentBookingPage = lazy(() => import("@/app/ai-agents/booking/page"))
const AiAgentLeadQualificationPage = lazy(() => import("@/app/ai-agents/lead-qualification/page"))
const AiAgentBuilderPage = lazy(() => import("@/app/ai-agents/agent-builder/page"))

// Lazy loaded — agentic AI + product pages
const AgenticAiPage = lazy(() => import("@/app/agentic-ai/page"))
const AgentCopilotPage = lazy(() => import("@/app/products/agent-copilot/page"))
const AnalyticsPage = lazy(() => import("@/app/products/analytics/page"))
const OmnichannelInboxPage = lazy(() => import("@/app/products/omnichannel-inbox/page"))
const AboutUsPage = lazy(() => import("@/app/about-us/page"))
const ContactUsPage = lazy(() => import("@/app/contact-us/page"))

// Lazy loaded — platform & why
const PlatformPage = lazy(() => import("@/app/platform/page"))
const PlatformSecurityPage = lazy(() => import("@/app/platform/security/page"))
const WhyFloatChatPage = lazy(() => import("@/app/why-floatchat/page"))
const PartnershipsPage = lazy(() => import("@/app/partnerships/page"))
const AiConsultingServicesPage = lazy(() => import("@/app/services/ai-consulting/page"))
const VoiceAiAgentsPage = lazy(() => import("@/app/voice-ai-agents/page"))
const NumbersDidPage = lazy(() => import("@/app/numbers/did/page"))

// Lazy loaded — channels (agentic-AI messaging channels)
const ChannelWhatsAppPage = lazy(() => import("@/app/channels/whatsapp/page"))
const ChannelWhatsAppBroadcastingPage = lazy(() => import("@/app/channels/whatsapp-broadcasting/page"))
const ChannelRcsPage = lazy(() => import("@/app/channels/rcs/page"))
const ChannelRcsBroadcastingPage = lazy(() => import("@/app/channels/rcs-broadcasting/page"))
const ChannelSmsBroadcastingPage = lazy(() => import("@/app/channels/sms-broadcasting/page"))
const ChannelVoicePage = lazy(() => import("@/app/channels/voice/page"))
const ChannelInstagramPage = lazy(() => import("@/app/channels/instagram/page"))
const ChannelMessengerPage = lazy(() => import("@/app/channels/messenger/page"))
const ChannelWebChatPage = lazy(() => import("@/app/channels/web-chat/page"))
const ChannelSocialPage = lazy(() => import("@/app/channels/social/page"))

// Lazy loaded — industries
const IndustryRetailPage = lazy(() => import("@/app/industry/retail/page"))
const IndustryTravelPage = lazy(() => import("@/app/industry/travel-and-hospitality/page"))
const IndustryFintechPage = lazy(() => import("@/app/industry/fintech/page"))
const IndustryEducationPage = lazy(() => import("@/app/industry/education/page"))
const IndustryMediaPage = lazy(() => import("@/app/industry/media-entertainment/page"))
const IndustryHealthcarePage = lazy(() => import("@/app/industry/healthcare/page"))
const IndustryInsurancePage = lazy(() => import("@/app/industry/insurance/page"))
const IndustryMortgagePage = lazy(() => import("@/app/industry/mortgage/page"))
const IndustryTelecomPage = lazy(() => import("@/app/industry/telecom/page"))
const IndustryRealEstatePage = lazy(() => import("@/app/industry/real-estate/page"))

// Lazy loaded — competitor comparisons (agentic-AI set)
const CompareHaptikPage = lazy(() => import("@/app/compare/haptik/page"))
const CompareTwilioPage = lazy(() => import("@/app/compare/twilio/page"))
const CompareTwixorPage = lazy(() => import("@/app/compare/twixor/page"))
const CompareInfobipPage = lazy(() => import("@/app/compare/infobip/page"))

// Lazy loaded — solutions
const EcommercePage = lazy(() => import("@/app/solutions/ecommerce/page"))
const SaasPage = lazy(() => import("@/app/solutions/saas/page"))
const HealthcarePage = lazy(() => import("@/app/solutions/healthcare/page"))
const RealEstatePage = lazy(() => import("@/app/solutions/real-estate/page"))
const EducationPage = lazy(() => import("@/app/solutions/education/page"))
const RestaurantsPage = lazy(() => import("@/app/solutions/restaurants/page"))

// Lazy loaded — comparisons
const ComparePage = lazy(() => import("@/app/compare/page"))
const VsIntercomPage = lazy(() => import("@/app/vs/intercom/page"))
const VsZendeskPage = lazy(() => import("@/app/vs/zendesk/page"))
const VsTidioPage = lazy(() => import("@/app/vs/tidio/page"))
const VsFreshchatPage = lazy(() => import("@/app/vs/freshchat/page"))
const VsHubspotPage = lazy(() => import("@/app/vs/hubspot/page"))
const VsHelpScoutPage = lazy(() => import("@/app/vs/help-scout/page"))
const VsFrontPage = lazy(() => import("@/app/vs/front/page"))
const VsDriftPage = lazy(() => import("@/app/vs/drift/page"))
const VsGorgiasPage = lazy(() => import("@/app/vs/gorgias/page"))
const VsCrispPage = lazy(() => import("@/app/vs/crisp/page"))
const VsTawkPage = lazy(() => import("@/app/vs/tawk/page"))
const VsChatmitraPage = lazy(() => import("@/app/vs/chatmitra/page"))

// Lazy loaded — company / legal
const AboutPage = lazy(() => import("@/app/about/page"))
const TrustPage = lazy(() => import("@/app/trust/page"))
const SecurityPage = lazy(() => import("@/app/security/page"))
const PrivacyPage = lazy(() => import("@/app/privacy/page"))
const TermsPage = lazy(() => import("@/app/terms/page"))
const DpaPage = lazy(() => import("@/app/dpa/page"))

// Lazy loaded — forms & resources
const ContactPage = lazy(() => import("@/app/contact/page"))
const DemoPage = lazy(() => import("@/app/demo/page"))
const BlogPage = lazy(() => import("@/app/blog/page"))
const BlogPostPage = lazy(() => import("@/app/blog/[slug]/page"))
const CustomersPage = lazy(() => import("@/app/customers/page"))
const HelpPage = lazy(() => import("@/app/help/page"))
const HelpArticlePage = lazy(() => import("@/app/help/[slug]/page"))
const DocsPage = lazy(() => import("@/app/docs/page"))
const ChangelogPage = lazy(() => import("@/app/changelog/page"))
const StatusPage = lazy(() => import("@/app/status/page"))
const TemplatesPage = lazy(() => import("@/app/templates/page"))
const NotFoundPage = lazy(() => import("@/app/not-found/page"))

// Lazy loaded — additional legal
const CookiesPage = lazy(() => import("@/app/cookies/page"))
const AupPage = lazy(() => import("@/app/aup/page"))
const AccessibilityPage = lazy(() => import("@/app/accessibility/page"))
const SubprocessorsPage = lazy(() => import("@/app/subprocessors/page"))
const SubprocessorSubscribePage = lazy(() => import("@/app/subprocessors/subscribe/page"))

// Lazy loaded — auth (dashboard protected)
const ForgotPasswordPage = lazy(() => import("@/app/forgot-password/page"))
const DashboardPage = lazy(() => import("@/app/dashboard/page"))

// Lazy loaded — dashboard preview (public marketing dashboard)
const DashboardPreviewPage = lazy(() => import("@/app/dashboard-preview/page"))
const DashboardReportsHub = lazy(() => import("@/app/dashboard-preview/reports/page"))
const DashboardAnalyticsGate = lazy(() => import("@/app/dashboard-preview/analytics/page"))
const DashboardInbox = lazy(() => import("@/app/dashboard-preview/inbox/page"))
const DashboardAiAudit = lazy(() => import("@/app/dashboard-preview/ai-audit/page"))
const DashboardResponseTime = lazy(() => import("@/app/dashboard-preview/response-time/page"))
const DashboardMacros = lazy(() => import("@/app/dashboard-preview/macros/page"))
const DashboardIntegrations = lazy(() => import("@/app/dashboard-preview/integrations/page"))
const DashboardErrors = lazy(() => import("@/app/dashboard-preview/errors/page"))
const ReportVolume = lazy(() => import("@/app/dashboard-preview/reports/volume/page"))
const ReportEngagement = lazy(() => import("@/app/dashboard-preview/reports/engagement/page"))
const ReportLeads = lazy(() => import("@/app/dashboard-preview/reports/leads/page"))
const ReportRevenue = lazy(() => import("@/app/dashboard-preview/reports/revenue/page"))
const ReportCsat = lazy(() => import("@/app/dashboard-preview/reports/csat/page"))
const ReportAi = lazy(() => import("@/app/dashboard-preview/reports/ai/page"))
const ReportOutreach = lazy(() => import("@/app/dashboard-preview/reports/outreach/page"))
const ReportExecutive = lazy(() => import("@/app/dashboard-preview/reports/executive/page"))
const ReportConversion = lazy(() => import("@/app/dashboard-preview/reports/conversion/page"))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/** Keeps <link rel="canonical"> in sync with the current route. */
function CanonicalUrl() {
  const { pathname } = useLocation()
  useEffect(() => {
    let el = document.querySelector('link[rel="canonical"]')
    if (!el) {
      el = document.createElement("link")
      el.setAttribute("rel", "canonical")
      document.head.appendChild(el)
    }
    const clean = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname
    el.setAttribute("href", `https://www.floatchat.com${clean === "/" ? "/" : clean}`)
  }, [pathname])
  return null
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CanonicalUrl />
      <Toaster richColors position="top-right" />
      <MobileStickyCTA />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />

          {/* Product */}
          <Route path="/ai-agent" element={<AiAgentPage />} />
          <Route path="/voice" element={<VoicePage />} />
          <Route path="/sms" element={<SmsPage />} />
          <Route path="/email" element={<EmailPage />} />
          <Route path="/live-chat" element={<LiveChatPage />} />
          <Route path="/help-center" element={<HelpCenterPage />} />
          <Route path="/whatsapp" element={<WhatsAppPage />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/automation" element={<AutomationPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />

          {/* AI agents */}
          <Route path="/ai-agents" element={<AiAgentsHubPage />} />
          <Route path="/ai-agents/customer-service" element={<AiAgentCustomerServicePage />} />
          <Route path="/ai-agents/sales" element={<AiAgentSalesPage />} />
          <Route path="/ai-agents/booking" element={<AiAgentBookingPage />} />
          <Route path="/ai-agents/lead-qualification" element={<AiAgentLeadQualificationPage />} />
          <Route path="/ai-agents/agent-builder" element={<AiAgentBuilderPage />} />

          {/* Agentic AI + products */}
          <Route path="/agentic-ai" element={<AgenticAiPage />} />
          <Route path="/products/agent-copilot" element={<AgentCopilotPage />} />
          <Route path="/products/analytics" element={<AnalyticsPage />} />
          <Route path="/products/omnichannel-inbox" element={<OmnichannelInboxPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />

          {/* Platform & why */}
          <Route path="/platform" element={<PlatformPage />} />
          <Route path="/platform/security" element={<PlatformSecurityPage />} />
          <Route path="/why-floatchat" element={<WhyFloatChatPage />} />
          <Route path="/partnerships" element={<PartnershipsPage />} />
          <Route path="/services/ai-consulting" element={<AiConsultingServicesPage />} />
          <Route path="/voice-ai-agents" element={<VoiceAiAgentsPage />} />
          <Route path="/numbers/did" element={<NumbersDidPage />} />

          {/* Channels */}
          <Route path="/channels/whatsapp" element={<ChannelWhatsAppPage />} />
          <Route path="/channels/whatsapp-broadcasting" element={<ChannelWhatsAppBroadcastingPage />} />
          <Route path="/channels/rcs" element={<ChannelRcsPage />} />
          <Route path="/channels/rcs-broadcasting" element={<ChannelRcsBroadcastingPage />} />
          <Route path="/channels/sms-broadcasting" element={<ChannelSmsBroadcastingPage />} />
          <Route path="/channels/voice" element={<ChannelVoicePage />} />
          <Route path="/channels/instagram" element={<ChannelInstagramPage />} />
          <Route path="/channels/messenger" element={<ChannelMessengerPage />} />
          <Route path="/channels/web-chat" element={<ChannelWebChatPage />} />
          <Route path="/channels/social" element={<ChannelSocialPage />} />

          {/* Industries */}
          <Route path="/industry/retail" element={<IndustryRetailPage />} />
          <Route path="/industry/travel-and-hospitality" element={<IndustryTravelPage />} />
          <Route path="/industry/fintech" element={<IndustryFintechPage />} />
          <Route path="/industry/education" element={<IndustryEducationPage />} />
          <Route path="/industry/media-entertainment" element={<IndustryMediaPage />} />
          <Route path="/industry/healthcare" element={<IndustryHealthcarePage />} />
          <Route path="/industry/insurance" element={<IndustryInsurancePage />} />
          <Route path="/industry/mortgage" element={<IndustryMortgagePage />} />
          <Route path="/industry/telecom" element={<IndustryTelecomPage />} />
          <Route path="/industry/real-estate" element={<IndustryRealEstatePage />} />

          {/* Solutions */}
          <Route path="/solutions/ecommerce" element={<EcommercePage />} />
          <Route path="/solutions/saas" element={<SaasPage />} />
          <Route path="/solutions/healthcare" element={<HealthcarePage />} />
          <Route path="/solutions/real-estate" element={<RealEstatePage />} />
          <Route path="/solutions/education" element={<EducationPage />} />
          <Route path="/solutions/restaurants" element={<RestaurantsPage />} />

          {/* Comparisons */}
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/compare/haptik" element={<CompareHaptikPage />} />
          <Route path="/compare/twilio" element={<CompareTwilioPage />} />
          <Route path="/compare/twixor" element={<CompareTwixorPage />} />
          <Route path="/compare/infobip" element={<CompareInfobipPage />} />
          <Route path="/vs/intercom" element={<VsIntercomPage />} />
          <Route path="/vs/zendesk" element={<VsZendeskPage />} />
          <Route path="/vs/tidio" element={<VsTidioPage />} />
          <Route path="/vs/freshchat" element={<VsFreshchatPage />} />
          <Route path="/vs/hubspot" element={<VsHubspotPage />} />
          <Route path="/vs/help-scout" element={<VsHelpScoutPage />} />
          <Route path="/vs/front" element={<VsFrontPage />} />
          <Route path="/vs/drift" element={<VsDriftPage />} />
          <Route path="/vs/gorgias" element={<VsGorgiasPage />} />
          <Route path="/vs/crisp" element={<VsCrispPage />} />
          <Route path="/vs/tawk" element={<VsTawkPage />} />
          <Route path="/vs/chatmitra" element={<VsChatmitraPage />} />

          {/* Company / Legal */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/trust" element={<TrustPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/dpa" element={<DpaPage />} />

          {/* Forms & resources */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/help/:slug" element={<HelpArticlePage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/templates" element={<TemplatesPage />} />

          {/* Legal */}
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/aup" element={<AupPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="/subprocessors" element={<SubprocessorsPage />} />
          <Route path="/subprocessors/subscribe" element={<SubprocessorSubscribePage />} />

          {/* Dashboard preview (public, demo data) */}
          <Route path="/dashboard-preview" element={<DashboardPreviewPage />} />
          <Route path="/dashboard-preview/reports" element={<DashboardReportsHub />} />
          <Route path="/dashboard-preview/analytics" element={<DashboardAnalyticsGate />} />
          <Route path="/dashboard-preview/inbox" element={<DashboardInbox />} />
          <Route path="/dashboard-preview/ai-audit" element={<DashboardAiAudit />} />
          <Route path="/dashboard-preview/response-time" element={<DashboardResponseTime />} />
          <Route path="/dashboard-preview/macros" element={<DashboardMacros />} />
          <Route path="/dashboard-preview/integrations" element={<DashboardIntegrations />} />
          <Route path="/dashboard-preview/errors" element={<DashboardErrors />} />
          <Route path="/dashboard-preview/reports/volume" element={<ReportVolume />} />
          <Route path="/dashboard-preview/reports/engagement" element={<ReportEngagement />} />
          <Route path="/dashboard-preview/reports/leads" element={<ReportLeads />} />
          <Route path="/dashboard-preview/reports/revenue" element={<ReportRevenue />} />
          <Route path="/dashboard-preview/reports/csat" element={<ReportCsat />} />
          <Route path="/dashboard-preview/reports/ai" element={<ReportAi />} />
          <Route path="/dashboard-preview/reports/outreach" element={<ReportOutreach />} />
          <Route path="/dashboard-preview/reports/executive" element={<ReportExecutive />} />
          <Route path="/dashboard-preview/reports/conversion" element={<ReportConversion />} />

          {/* Auth */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* 404 catch-all — must remain last */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
