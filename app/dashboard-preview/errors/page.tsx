"use client"

import { useEffect } from "react"
import { AppShell } from "@/components/dashboard/app-shell"
import { DataTable, StatusPill, HeaderButton, type StatusVariant } from "@/components/dashboard/primitives"
import { RefreshCw, AlertTriangle } from "lucide-react"
import type { ReactNode } from "react"

interface ErrorRow {
  when: string
  source: string
  type: string
  message: string
  count: number
  severity: "Critical" | "Warning" | "Notice"
  status: "Open" | "Triaged" | "Resolved"
}

const errors: ErrorRow[] = [
  { when: "11:04 AM", source: "Webhook · Shopify orders/create", type: "5xx", message: "POST /webhooks/shopify failed with 504 (8 retries exhausted)", count: 8, severity: "Critical", status: "Open" },
  { when: "10:42 AM", source: "Integration · HubSpot", type: "Auth", message: "OAuth token expired — refresh failed (invalid_grant)", count: 18, severity: "Critical", status: "Open" },
  { when: "10:18 AM", source: "AI Agent · refund-intent", type: "Hallucination", message: "Cited non-existent SKU 'A-1042' in 3 drafts (auto-blocked from send)", count: 3, severity: "Warning", status: "Triaged" },
  { when: "09:52 AM", source: "Routing rule · vip-segment", type: "Logic", message: "Loop detected — VIP routing matched both 'enterprise' and 'starter' tags", count: 12, severity: "Warning", status: "Open" },
  { when: "08:30 AM", source: "Webhook · Stripe charge.refunded", type: "Schema", message: "Field 'metadata.order_id' missing on 2 payloads", count: 2, severity: "Notice", status: "Triaged" },
  { when: "Yesterday", source: "Integration · Notion KB", type: "Sync", message: "Rate limit (429) — paused for 24h, 142 articles behind", count: 24, severity: "Warning", status: "Open" },
  { when: "Yesterday", source: "Voice · Twilio", type: "Connectivity", message: "1 call dropped mid-transcript (region us-east-2 jitter)", count: 1, severity: "Notice", status: "Resolved" },
  { when: "2d ago", source: "Email · IMAP", type: "Auth", message: "support@acme.com — password rotation broke IMAP fetch", count: 1, severity: "Critical", status: "Resolved" },
]

const sevPill: Record<ErrorRow["severity"], StatusVariant> = {
  Critical: "fail",
  Warning: "warning",
  Notice: "info",
}
const statusPill: Record<ErrorRow["status"], StatusVariant> = {
  Open: "fail",
  Triaged: "warning",
  Resolved: "good",
}

export default function ErrorsPage() {
  useEffect(() => { document.title = "Errors — FloatChat Dashboard" }, [])
  const open = errors.filter((e) => e.status === "Open").length
  const critical = errors.filter((e) => e.severity === "Critical" && e.status !== "Resolved").length
  return (
    <AppShell
      title="Errors & Issues"
      subtitle="Webhook failures, integration drift, AI hallucinations, and routing loops — surfaced fast."
      actions={<HeaderButton variant="primary" icon={<RefreshCw className="h-3.5 w-3.5" />}>Refresh</HeaderButton>}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KpiCard label="Critical (24h)" value={critical} tone="text-red-400" hint="Blocking" />
        <KpiCard label="Open" value={open} tone="text-amber-400" hint="Needs triage" />
        <KpiCard label="MTTR (last 30d)" value="42m" tone="text-emerald-400" hint="−12% vs last month" />
        <KpiCard label="Resolved (7d)" value={errors.filter((e) => e.status === "Resolved").length} tone="text-emerald-400" hint="Auto + manual" />
      </div>

      <div className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-6">
        <header className="mb-4">
          <h2 className="text-base font-semibold flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-amber-400" /> Error log</h2>
          <p className="text-xs text-white/55">Most recent first · grouped by source.</p>
        </header>

        <DataTable
          columns={[
            { key: "when", header: "When" },
            { key: "source", header: "Source" },
            { key: "type", header: "Type" },
            { key: "message", header: "Message" },
            { key: "count", header: "Count", align: "right" },
            { key: "severity", header: "Severity" },
            { key: "status", header: "Status" },
          ]}
          rows={errors.map((e) => ({
            when: e.when,
            source: e.source,
            type: e.type,
            message: <span className="text-white/70 font-mono text-[12px]">{e.message}</span>,
            count: e.count,
            severity: <StatusPill variant={sevPill[e.severity]} label={e.severity} />,
            status: <StatusPill variant={statusPill[e.status]} label={e.status} />,
          })) as unknown as Record<string, ReactNode>[]}
          onExport={() => {}}
        />
      </div>
    </AppShell>
  )
}

function KpiCard({ label, value, tone, hint }: { label: string; value: number | string; tone: string; hint: string }) {
  return (
    <div className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-5">
      <p className="text-[12px] font-medium text-white/55">{label}</p>
      <p className="mt-2 text-[28px] font-semibold tabular-nums">{value}</p>
      <p className={`mt-2 text-[11px] font-medium ${tone}`}>{hint}</p>
    </div>
  )
}
