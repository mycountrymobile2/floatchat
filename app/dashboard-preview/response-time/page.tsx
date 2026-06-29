"use client"

import { useEffect } from "react"
import { Zap, RefreshCw, Play } from "lucide-react"
import { AppShell } from "@/components/dashboard/app-shell"
import { HeaderButton, StatusPill, DataTable } from "@/components/dashboard/primitives"
import type { ReactNode } from "react"

const channels = [
  { channel: "Live Chat",   frt: "12s",  ftr: "2m 14s", ai: 94, agent: 88, csat: 92, sla: 99 },
  { channel: "Email",       frt: "4m 8s", ftr: "47m 02s", ai: 88, agent: 84, csat: 86, sla: 96 },
  { channel: "WhatsApp",    frt: "38s",  ftr: "3m 12s", ai: 91, agent: 86, csat: 90, sla: 97 },
  { channel: "Voice",       frt: "8s",   ftr: "4m 52s", ai: 80, agent: 90, csat: 88, sla: 94 },
  { channel: "SMS",         frt: "1m 42s", ftr: "8m 18s", ai: 84, agent: 80, csat: 84, sla: 93 },
  { channel: "Help Center", frt: "—",    ftr: "—",      ai: 92, agent: 0, csat: 88, sla: 100 },
]

function scoreColor(v: number) {
  if (v >= 90) return "text-emerald-400"
  if (v >= 75) return "text-amber-400"
  return "text-red-400"
}
function scorePill(v: number): "good" | "warning" | "fail" {
  if (v >= 90) return "good"
  if (v >= 75) return "warning"
  return "fail"
}

export default function ResponseTimePage() {
  useEffect(() => { document.title = "Response Speed — FloatChat Dashboard" }, [])
  return (
    <AppShell
      title="Response Speed"
      subtitle="Live timing audit across every channel. Refresh to rerun the last 1,000 conversations."
      actions={
        <>
          <HeaderButton icon={<RefreshCw className="h-3.5 w-3.5" />}>Refresh Live Chat</HeaderButton>
          <HeaderButton variant="primary" icon={<Play className="h-3.5 w-3.5" />}>Audit all channels</HeaderButton>
        </>
      }
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Median First Response", value: "42s", footnote: "−18% vs last week", tone: "text-emerald-400" },
          { label: "Median Full Resolve", value: "3m 24s", footnote: "−6.8% vs last week", tone: "text-emerald-400" },
          { label: "Within SLA", value: "96.4%", footnote: "+1.2pp", tone: "text-emerald-400" },
          { label: "Breached SLA", value: "23", footnote: "of 1,000", tone: "text-amber-400" },
        ].map((k) => (
          <div key={k.label} className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-5">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-medium text-white/55">{k.label}</p>
              <Zap className="h-4 w-4 text-[#60A5FA]" />
            </div>
            <p className="mt-2 text-[28px] font-semibold tabular-nums leading-none">{k.value}</p>
            <p className={`mt-2 text-[11px] font-medium ${k.tone}`}>{k.footnote}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-6">
        <header className="mb-4">
          <h2 className="text-base font-semibold">Per-channel scorecards</h2>
          <p className="text-xs text-white/55">Lighthouse-style scoring across 4 categories: AI quality, Agent quality, CSAT, SLA. 90+ healthy, 75-89 watch, &lt;75 off.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {channels.map((c) => (
            <div key={c.channel} className="rounded-lg bg-[#0F1A2E] ring-1 ring-white/5 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold">{c.channel}</p>
                <span className="text-[10px] text-white/45">FRT {c.frt} · FTR {c.ftr}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { name: "AI", v: c.ai },
                  { name: "Agent", v: c.agent },
                  { name: "CSAT", v: c.csat },
                  { name: "SLA", v: c.sla },
                ].map((m) => (
                  <div key={m.name} className="text-center">
                    <div className={`relative mx-auto w-12 h-12 rounded-full flex items-center justify-center text-[13px] font-bold tabular-nums ${scoreColor(m.v)}`}
                      style={{
                        background: `conic-gradient(currentColor ${m.v * 3.6}deg, rgba(255,255,255,0.06) 0)`,
                      }}>
                      <span className="absolute inset-1 rounded-full bg-[#0F1A2E] flex items-center justify-center">
                        {m.v || "—"}
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] text-white/55">{m.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <DataTable
          columns={[
            { key: "channel", header: "Channel" },
            { key: "frt", header: "First Response", align: "right" },
            { key: "ftr", header: "Full Resolve", align: "right" },
            { key: "sla", header: "SLA %", align: "right" },
            { key: "verdict", header: "Verdict" },
          ]}
          rows={channels.map((c) => ({
            channel: c.channel,
            frt: c.frt,
            ftr: c.ftr,
            sla: `${c.sla}%`,
            verdict: <StatusPill variant={scorePill(c.sla)} label={c.sla >= 95 ? "Within SLA" : c.sla >= 90 ? "Watch" : "Breach risk"} />,
          })) as unknown as Record<string, ReactNode>[]}
          onExport={() => {}}
        />
      </div>
    </AppShell>
  )
}
