"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Inbox,
  Bot,
  Zap,
  MessageSquareCode,
  AlertTriangle,
  RefreshCw,
  Plug,
  ArrowRight,
} from "lucide-react"
import { AppShell } from "@/components/dashboard/app-shell"
import { HeaderButton } from "@/components/dashboard/primitives"

const tiles = [
  { label: "Inbox", href: "/dashboard-preview/inbox", icon: Inbox, desc: "12 unread, 3 SLA at risk" },
  { label: "AI Audit", href: "/dashboard-preview/ai-audit", icon: Bot, desc: "Deflection 64% · 3 warnings" },
  { label: "Response Speed", href: "/dashboard-preview/response-time", icon: Zap, desc: "Median 42s" },
  { label: "Errors", href: "/dashboard-preview/errors", icon: AlertTriangle, desc: "2 webhook failures" },
  { label: "Macros", href: "/dashboard-preview/macros", icon: MessageSquareCode, desc: "84 macros · 6 stale" },
]

const kpis = [
  { label: "Open Conversations", value: "184", delta: "+12 today", tone: "text-emerald-400" },
  { label: "Avg First Response", value: "42s", delta: "−18% vs last week", tone: "text-emerald-400" },
  { label: "AI Deflection", value: "64%", delta: "+5.2% vs last month", tone: "text-emerald-400" },
  { label: "CSAT (7d)", value: "4.7 / 5", delta: "+0.2 vs last week", tone: "text-emerald-400" },
]

export default function DashboardOverviewPage() {
  useEffect(() => {
    document.title = "Dashboard — FloatChat"
  }, [])

  return (
    <AppShell
      title="Dashboard Overview"
      subtitle="Live snapshot for acme.floatchat.com · across all channels"
      actions={
        <>
          <HeaderButton icon={<Plug className="h-3.5 w-3.5" />}>Connect Slack</HeaderButton>
          <HeaderButton variant="primary" icon={<RefreshCw className="h-3.5 w-3.5" />}>Refresh</HeaderButton>
        </>
      }
    >
      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-5">
            <p className="text-[12px] font-medium text-white/55">{k.label}</p>
            <p className="mt-2 text-[28px] font-semibold tracking-tight leading-none">{k.value}</p>
            <p className={`mt-3 text-[11px] font-medium ${k.tone}`}>{k.delta}</p>
          </div>
        ))}
      </div>

      {/* Empty hint state — first-run nudge */}
      <div className="rounded-xl bg-gradient-to-br from-[#1E3050] to-[#16243D] ring-1 ring-[#3B82F6]/20 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#60A5FA] mb-1">Quick action</p>
            <h3 className="text-lg font-semibold">Click <span className="text-[#60A5FA]">Refresh</span> to run a live deflection sweep.</h3>
            <p className="mt-1 text-sm text-white/55">
              Replays the last 1,000 conversations against your AI Agent, scores each, and flags drops in CSAT, response time, and routing.
            </p>
          </div>
          <button className="shrink-0 inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium transition-colors">
            <RefreshCw className="h-4 w-4" />
            Run audit
          </button>
        </div>
      </div>

      {/* Quick tiles */}
      <h2 className="text-sm font-semibold uppercase tracking-wider text-white/55 mb-3">Jump to</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {tiles.map((t) => {
          const Icon = t.icon
          return (
            <Link
              key={t.href}
              to={t.href}
              className="group rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-4 hover:ring-[#3B82F6]/40 hover:bg-[#1A2B49] transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-[#3B82F6]/10 ring-1 ring-[#3B82F6]/20 flex items-center justify-center text-[#60A5FA] mb-3">
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex items-center justify-between gap-1">
                <p className="text-sm font-semibold">{t.label}</p>
                <ArrowRight className="h-3.5 w-3.5 text-white/30 group-hover:text-[#60A5FA] group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="mt-1 text-[11px] text-white/50 leading-relaxed">{t.desc}</p>
            </Link>
          )
        })}
      </div>

      {/* Reports preview */}
      <div className="mt-10 flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-white/55">Recent activity</h2>
        <Link to="/dashboard-preview/reports" className="text-xs text-[#60A5FA] hover:text-white inline-flex items-center gap-0.5">
          View all reports <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06]">
        <ul className="divide-y divide-white/5">
          {[
            { who: "AI Agent", text: "Resolved 47 conversations in the last 6 hours · deflection 71%", time: "12 min ago" },
            { who: "Sarah K.", text: "Replied to 14 conversations · avg first response 38s", time: "1 hr ago" },
            { who: "Workflow", text: "“Refund — order > 14d” triggered 8 times this week", time: "3 hr ago" },
            { who: "Webhook", text: "Shopify orders sync · 1,204 events processed", time: "5 hr ago" },
            { who: "AI Audit", text: "3 macros flagged as stale — last used >60 days ago", time: "1 day ago" },
          ].map((row, i) => (
            <li key={i} className="flex items-center justify-between px-5 py-3 text-sm">
              <div className="min-w-0 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="font-medium text-white/85">{row.who}</span>
                <span className="text-white/55 truncate">{row.text}</span>
              </div>
              <span className="text-[11px] text-white/40 tabular-nums shrink-0 ml-4">{row.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  )
}
