"use client"

import { Link, useLocation } from "react-router-dom"
import type { ReactNode } from "react"
import {
  LayoutDashboard,
  BarChart3,
  Inbox,
  Bot,
  Zap,
  MessageSquareCode,
  PlugZap,
  AlertTriangle,
  LineChart,
  ExternalLink,
  RefreshCw,
  PlayCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const nav = [
  { label: "Overview", href: "/dashboard-preview", icon: LayoutDashboard },
  { label: "Reports", href: "/dashboard-preview/reports", icon: BarChart3 },
  { label: "Analytics", href: "/dashboard-preview/analytics", icon: LineChart },
  { label: "Inbox", href: "/dashboard-preview/inbox", icon: Inbox },
  { label: "AI Audit", href: "/dashboard-preview/ai-audit", icon: Bot },
  { label: "Response Speed", href: "/dashboard-preview/response-time", icon: Zap },
  { label: "Macros", href: "/dashboard-preview/macros", icon: MessageSquareCode },
  { label: "Integrations", href: "/dashboard-preview/integrations", icon: PlugZap },
  { label: "Errors", href: "/dashboard-preview/errors", icon: AlertTriangle },
]

export interface AppShellProps {
  title: string
  subtitle?: string
  actions?: ReactNode
  children: ReactNode
}

export function AppShell({ title, subtitle, actions, children }: AppShellProps) {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen bg-[#0B1426] text-white flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-[#06101F] border-r border-white/5 flex flex-col fixed inset-y-0 left-0 z-30">
        {/* Brand block */}
        <div className="px-5 pt-6 pb-5 border-b border-white/5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-1.5">
            Workspace
          </p>
          <a
            href="https://www.floatchat.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-[#60A5FA] transition-colors group"
          >
            <span>acme.floatchat.com</span>
            <ExternalLink className="h-3 w-3 text-white/40 group-hover:text-[#60A5FA]" />
          </a>
        </div>

        {/* Primary nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5" aria-label="Dashboard navigation">
          {nav.map((item) => {
            const active = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  active
                    ? "bg-[#3B82F6] text-white shadow-sm shadow-[#3B82F6]/20"
                    : "text-white/65 hover:text-white hover:bg-white/[0.04]"
                )}
              >
                <Icon className={cn("h-4 w-4", active ? "text-white" : "text-white/55")} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 pt-3 pb-5 border-t border-white/5">
          <p className="text-[11px] text-white/40 mb-3">
            Last sync: <span className="text-white/65">May 15, 2026 · 11:06 AM</span>
          </p>
          <button className="w-full inline-flex items-center justify-center gap-1.5 h-9 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium transition-colors">
            <RefreshCw className="h-3.5 w-3.5" />
            Run Sync
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 ml-60">
        {/* Top header */}
        <header className="sticky top-0 z-20 bg-[#0B1426]/85 backdrop-blur border-b border-white/5 px-8 py-5">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              {subtitle && (
                <p className="mt-1 text-sm text-white/55 leading-relaxed">{subtitle}</p>
              )}
            </div>
            {actions && (
              <div className="flex items-center gap-2 shrink-0">{actions}</div>
            )}
          </div>
        </header>

        <div className="px-8 py-8">
          {children}
        </div>

        {/* Mini preview banner */}
        <div className="px-8 pb-10">
          <div className="flex items-center justify-center gap-2 text-xs text-white/40">
            <PlayCircle className="h-3 w-3" />
            <span>FloatChat dashboard preview — demo data, no real workspace connected</span>
          </div>
        </div>
      </main>
    </div>
  )
}
