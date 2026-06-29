"use client"

import { useEffect } from "react"
import { AppShell } from "@/components/dashboard/app-shell"
import { StatusPill, type StatusVariant, HeaderButton } from "@/components/dashboard/primitives"
import { Plug, Plus } from "lucide-react"

interface Integration {
  name: string
  category: string
  status: "Connected" | "Action needed" | "Disconnected"
  lastSync: string
  events30d: number
  errors30d: number
  initial: string
  tileBg: string
}

const integrations: Integration[] = [
  { name: "Shopify", category: "Commerce", status: "Connected", lastSync: "3m ago", events30d: 84210, errors30d: 0, initial: "S", tileBg: "#96BF48" },
  { name: "Stripe", category: "Billing", status: "Connected", lastSync: "1m ago", events30d: 12440, errors30d: 2, initial: "S", tileBg: "#635BFF" },
  { name: "Slack", category: "Comms", status: "Connected", lastSync: "8s ago", events30d: 6210, errors30d: 0, initial: "#", tileBg: "#4A154B" },
  { name: "HubSpot", category: "CRM", status: "Action needed", lastSync: "1h ago", events30d: 4280, errors30d: 18, initial: "H", tileBg: "#FF7A59" },
  { name: "Salesforce", category: "CRM", status: "Connected", lastSync: "12m ago", events30d: 3120, errors30d: 4, initial: "S", tileBg: "#00A1E0" },
  { name: "Zendesk Sell", category: "CRM", status: "Disconnected", lastSync: "—", events30d: 0, errors30d: 0, initial: "Z", tileBg: "#03363D" },
  { name: "Google Workspace", category: "Identity", status: "Connected", lastSync: "2h ago", events30d: 1840, errors30d: 0, initial: "G", tileBg: "#4285F4" },
  { name: "Segment", category: "CDP", status: "Connected", lastSync: "6m ago", events30d: 92180, errors30d: 12, initial: "S", tileBg: "#52BD94" },
  { name: "Twilio", category: "Telephony", status: "Connected", lastSync: "1m ago", events30d: 5120, errors30d: 1, initial: "T", tileBg: "#F22F46" },
  { name: "Notion", category: "Knowledge", status: "Action needed", lastSync: "3d ago", events30d: 142, errors30d: 24, initial: "N", tileBg: "#000000" },
  { name: "Linear", category: "Tickets", status: "Connected", lastSync: "5m ago", events30d: 942, errors30d: 0, initial: "L", tileBg: "#5E6AD2" },
  { name: "PostHog", category: "Analytics", status: "Connected", lastSync: "9m ago", events30d: 28480, errors30d: 0, initial: "P", tileBg: "#1D4AFF" },
]

const statusMap: Record<Integration["status"], StatusVariant> = {
  Connected: "good",
  "Action needed": "warning",
  Disconnected: "muted",
}

export default function IntegrationsStatusPage() {
  useEffect(() => { document.title = "Integrations — FloatChat Dashboard" }, [])
  const counts = {
    connected: integrations.filter((i) => i.status === "Connected").length,
    action: integrations.filter((i) => i.status === "Action needed").length,
    off: integrations.filter((i) => i.status === "Disconnected").length,
  }

  return (
    <AppShell
      title="Integrations"
      subtitle="Connection health for every external system feeding the workspace."
      actions={<HeaderButton variant="primary" icon={<Plus className="h-3.5 w-3.5" />}>Add integration</HeaderButton>}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-5">
          <p className="text-[12px] font-medium text-white/55">Connected</p>
          <p className="mt-2 text-[28px] font-semibold tabular-nums">{counts.connected}</p>
          <p className="mt-2 text-[11px] text-emerald-400">Syncing normally</p>
        </div>
        <div className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-5">
          <p className="text-[12px] font-medium text-white/55">Needs action</p>
          <p className="mt-2 text-[28px] font-semibold tabular-nums">{counts.action}</p>
          <p className="mt-2 text-[11px] text-amber-400">Token expired or errors</p>
        </div>
        <div className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-5">
          <p className="text-[12px] font-medium text-white/55">Disconnected</p>
          <p className="mt-2 text-[28px] font-semibold tabular-nums">{counts.off}</p>
          <p className="mt-2 text-[11px] text-white/55">Manual reconnect required</p>
        </div>
        <div className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-5">
          <p className="text-[12px] font-medium text-white/55">Events (30d)</p>
          <p className="mt-2 text-[28px] font-semibold tabular-nums">242K</p>
          <p className="mt-2 text-[11px] text-emerald-400">+14.2% vs last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {integrations.map((i) => (
          <div key={i.name} className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-5 hover:bg-[#1A2B49] transition-colors">
            <div className="flex items-start gap-3">
              <div
                className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg font-bold"
                style={{ backgroundColor: i.tileBg }}
              >
                {i.initial}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{i.name}</p>
                  <StatusPill variant={statusMap[i.status]} label={i.status} size="sm" />
                </div>
                <p className="text-[11px] text-white/45 mt-0.5">{i.category}</p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                  <div>
                    <p className="text-white/40">Last sync</p>
                    <p className="text-white/85 font-medium">{i.lastSync}</p>
                  </div>
                  <div>
                    <p className="text-white/40">Events 30d</p>
                    <p className="text-white/85 font-medium tabular-nums">{i.events30d.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-white/40">Errors</p>
                    <p className={`font-medium tabular-nums ${i.errors30d > 10 ? "text-red-400" : i.errors30d > 0 ? "text-amber-400" : "text-emerald-400"}`}>{i.errors30d}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl bg-gradient-to-br from-[#1E3050] to-[#16243D] ring-1 ring-[#3B82F6]/20 p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 ring-1 ring-[#3B82F6]/20 flex items-center justify-center text-[#60A5FA]">
            <Plug className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold">Connect Search Console + Analytics</p>
            <p className="text-xs text-white/55">One Google sign-in unlocks both. We&apos;ll cross-reference SEO queries with conversation intents.</p>
          </div>
        </div>
        <HeaderButton variant="primary">Connect Google</HeaderButton>
      </div>
    </AppShell>
  )
}
