"use client"

import { useEffect } from "react"
import {
  MessagesSquare,
  Activity,
  GitBranch,
  DollarSign,
  HeartHandshake,
  Bot,
  Megaphone,
  Briefcase,
  Compass,
} from "lucide-react"
import { AppShell } from "@/components/dashboard/app-shell"
import { ReportCategoryCard } from "@/components/dashboard/primitives"

const reports = [
  {
    title: "Conversation Volume",
    subtitle: "Volume by channel, source, geography, landing page, devices",
    href: "/dashboard-preview/reports/volume",
    icon: <MessagesSquare className="h-4 w-4" />,
    kpi1: { label: "Conversations", value: "22,040", delta: "12.4%", direction: "up" as const },
    kpi2: { label: "Unique Users", value: "18,920", delta: "8.2%", direction: "up" as const },
  },
  {
    title: "Engagement",
    subtitle: "First reply, full resolution, scroll depth on Help Center, CTA clicks",
    href: "/dashboard-preview/reports/engagement",
    icon: <Activity className="h-4 w-4" />,
    kpi1: { label: "Avg Resolution", value: "3m 24s", delta: "6.8%", direction: "up" as const },
    kpi2: { label: "Replies/Convo", value: "3.4", delta: "4.2%", direction: "up" as const },
  },
  {
    title: "Lead & Funnel",
    subtitle: "Visitor → lead → MQL → SQL → opportunity, time-to-convert, attribution",
    href: "/dashboard-preview/reports/leads",
    icon: <GitBranch className="h-4 w-4" />,
    kpi1: { label: "Lead CVR", value: "4.2%", delta: "15.3%", direction: "up" as const },
    kpi2: { label: "MQL Rate", value: "50%", delta: "3.8%", direction: "up" as const },
  },
  {
    title: "Revenue Recovery",
    subtitle: "CAC by channel, CLV, trial conv., revenue attribution, cohort retention",
    href: "/dashboard-preview/reports/revenue",
    icon: <DollarSign className="h-4 w-4" />,
    kpi1: { label: "Revenue", value: "$141.2K", delta: "18.6%", direction: "up" as const },
    kpi2: { label: "Avg CAC", value: "$68", delta: "12.4%", direction: "down" as const, inverted: true },
  },
  {
    title: "Customer Health",
    subtitle: "Activation, feature adoption, churn by channel, NPS/CSAT, support tickets",
    href: "/dashboard-preview/reports/csat",
    icon: <HeartHandshake className="h-4 w-4" />,
    kpi1: { label: "Activation", value: "79.7%", delta: "5.2%", direction: "up" as const },
    kpi2: { label: "NPS Score", value: "62", delta: "8%", direction: "up" as const },
  },
  {
    title: "AI Agent Performance",
    subtitle: "Deflection, accuracy, intent coverage, fallback rate, content decay",
    href: "/dashboard-preview/reports/ai",
    icon: <Bot className="h-4 w-4" />,
    kpi1: { label: "Deflection", value: "64%", delta: "12.6%", direction: "up" as const },
    kpi2: { label: "Accuracy", value: "94.2%", delta: "4.4%", direction: "up" as const },
  },
  {
    title: "Outbound & Campaigns",
    subtitle: "ROAS by campaign, quality scores, CPL, ad-to-landing paths, audience overlap",
    href: "/dashboard-preview/reports/outreach",
    icon: <Megaphone className="h-4 w-4" />,
    kpi1: { label: "ROAS", value: "4.2x", delta: "8.4%", direction: "up" as const },
    kpi2: { label: "Avg CPL", value: "$32", delta: "6.2%", direction: "down" as const, inverted: true },
  },
  {
    title: "Executive Summary",
    subtitle: "Pipeline, channel mix vs revenue, brand P&L, weekly + monthly cohorts",
    href: "/dashboard-preview/reports/executive",
    icon: <Briefcase className="h-4 w-4" />,
    kpi1: { label: "Pipeline", value: "$173.7K", delta: "22.4%", direction: "up" as const },
    kpi2: { label: "Margin", value: "90.6%", delta: "2.1%", direction: "up" as const },
  },
  {
    title: "Channel Conversion",
    subtitle: "Visitor to customer journey by location, source, keyword, landing page",
    href: "/dashboard-preview/reports/conversion",
    icon: <Compass className="h-4 w-4" />,
    kpi1: { label: "Signup %", value: "4.16%", delta: "6.4%", direction: "up" as const },
    kpi2: { label: "Paid Conv.", value: "45%", delta: "3.8%", direction: "up" as const },
  },
]

const glance = [
  { label: "Total Revenue", value: "$141.2K", note: "▲18.6% MoM", tone: "text-emerald-400" },
  { label: "New Customers", value: "+312", note: "▲12.4% MoM", tone: "text-emerald-400" },
  { label: "Marketing Spend", value: "$13.3K", note: "9.4% of revenue", tone: "text-white/55" },
  { label: "Avg ROAS", value: "4.2x", note: "▲8.4% MoM", tone: "text-emerald-400" },
]

export default function ReportsHubPage() {
  useEffect(() => {
    document.title = "Reports — FloatChat Dashboard"
  }, [])

  return (
    <AppShell
      title="Reports"
      subtitle="9 analytical views across volume, conversion, AI, revenue, and team performance."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((r) => (
          <ReportCategoryCard
            key={r.href}
            title={r.title}
            subtitle={r.subtitle}
            href={r.href}
            icon={r.icon}
            kpi1={r.kpi1}
            kpi2={r.kpi2}
            inverted={r.kpi2.inverted}
          />
        ))}
      </div>

      <section className="mt-10">
        <header className="mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/55">
            This month at a glance
          </h2>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {glance.map((g) => (
            <div key={g.label} className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-5">
              <p className="text-[12px] font-medium text-white/55">{g.label}</p>
              <p className="mt-2 text-[24px] font-semibold tabular-nums">{g.value}</p>
              <p className={`mt-1.5 text-[11px] font-medium ${g.tone}`}>{g.note}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  )
}
