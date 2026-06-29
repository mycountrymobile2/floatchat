"use client"

import { useEffect } from "react"
import { Download } from "lucide-react"
import { AppShell } from "@/components/dashboard/app-shell"
import { StatusPill, type StatusVariant, HeaderButton } from "@/components/dashboard/primitives"

type MacroStatus = "Good" | "Too Short" | "Too Long" | "Stale" | "Missing CTA"
const variant: Record<MacroStatus, StatusVariant> = {
  Good: "good",
  "Too Short": "warning",
  "Too Long": "warning",
  Stale: "warning",
  "Missing CTA": "fail",
}

interface Macro {
  name: string
  slug: string
  text: string
  charCount: number
  lastUsed: string
  status: MacroStatus
}

const macros: Macro[] = [
  { name: "Order tracking — Shopify", slug: "/track-shopify", text: "Hey {first_name}, your order #{order_id} shipped {ship_date} via {carrier}. Here's the link: {tracking_url}.", charCount: 108, lastUsed: "2m", status: "Good" },
  { name: "Refund eligibility", slug: "/refund-eligible", text: "You're good for a refund — {amount} will land on {card_last4} within 5-7 business days.", charCount: 92, lastUsed: "8m", status: "Good" },
  { name: "Webhook reset", slug: "/webhook-reset", text: "Try this:\n1. Re-auth Shopify in Settings → Integrations\n2. Trigger a test order\n3. Reply here if the webhook still doesn't fire — I'll escalate to engineering with the request_id.", charCount: 188, lastUsed: "24m", status: "Good" },
  { name: "VIP greeting", slug: "/vip-hello", text: "Hi.", charCount: 3, lastUsed: "1h", status: "Too Short" },
  { name: "Trial extension", slug: "/trial-extend", text: "Sure thing — extended your trial by 7 days. New end date is {trial_end}. Anything you want to spin up in the meantime?", charCount: 122, lastUsed: "2h", status: "Good" },
  { name: "2FA reset", slug: "/mfa-reset", text: "MFA reset request received. Verify your identity by replying with the last 4 digits of the card on file plus your billing zip — I'll process the reset within 15 minutes once verified. We can't accept SMS or email verification for this, sorry for the friction.", charCount: 268, lastUsed: "5h", status: "Too Long" },
  { name: "Account merger", slug: "/account-merge", text: "—", charCount: 1, lastUsed: "62d", status: "Stale" },
  { name: "Old pricing question", slug: "/old-pricing", text: "Our pricing is $19/month per agent, billed annually.", charCount: 52, lastUsed: "94d", status: "Stale" },
  { name: "Survey nudge", slug: "/survey-nudge", text: "Thanks for chatting today.", charCount: 26, lastUsed: "12h", status: "Missing CTA" },
  { name: "Procurement form", slug: "/proc-form", text: "Sending over our procurement packet now. It covers our W-9, SOC 2 Type II report, GDPR + CCPA addendums, and standard MSA template. Most legal teams sign off within 5 business days.", charCount: 192, lastUsed: "1d", status: "Good" },
]

const stats = {
  Good: macros.filter((m) => m.status === "Good").length,
  Missing: macros.filter((m) => m.status === "Missing CTA").length,
  Short: macros.filter((m) => m.status === "Too Short").length,
  Long: macros.filter((m) => m.status === "Too Long").length,
}

export default function MacrosPage() {
  useEffect(() => { document.title = "Macros — FloatChat Dashboard" }, [])
  return (
    <AppShell
      title="Macro Audit"
      subtitle="Quality of every saved reply across the workspace (optimal: 60–180 chars, with CTA + variables)."
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-5">
          <p className="text-[12px] font-medium text-white/55">Good (60–180 chars)</p>
          <p className="mt-2 text-[28px] font-semibold tabular-nums">{stats.Good}</p>
          <p className="mt-2 text-[11px] text-emerald-400">Healthy</p>
        </div>
        <div className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-5">
          <p className="text-[12px] font-medium text-white/55">Missing CTA</p>
          <p className="mt-2 text-[28px] font-semibold tabular-nums">{stats.Missing}</p>
          <p className="mt-2 text-[11px] text-red-400">Add a next step</p>
        </div>
        <div className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-5">
          <p className="text-[12px] font-medium text-white/55">Too Short (&lt;30)</p>
          <p className="mt-2 text-[28px] font-semibold tabular-nums">{stats.Short}</p>
          <p className="mt-2 text-[11px] text-amber-400">Expand the reply</p>
        </div>
        <div className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-5">
          <p className="text-[12px] font-medium text-white/55">Too Long (&gt;220)</p>
          <p className="mt-2 text-[28px] font-semibold tabular-nums">{stats.Long}</p>
          <p className="mt-2 text-[11px] text-amber-400">Trim for clarity</p>
        </div>
      </div>

      <div className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-6">
        <header className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold">Macro-by-macro analysis</h2>
            <p className="text-xs text-white/55">{macros.length} macros · sorted by last used.</p>
          </div>
          <HeaderButton icon={<Download className="h-3.5 w-3.5" />}>Export CSV</HeaderButton>
        </header>

        <ul className="divide-y divide-white/5">
          {macros.map((m) => (
            <li key={m.slug} className="py-3.5 flex items-start gap-4">
              <div className="shrink-0 w-20">
                <StatusPill variant={variant[m.status]} label={m.status} size="sm" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold">{m.name}</p>
                  <code className="text-[11px] text-[#60A5FA] bg-[#0F1A2E] px-1.5 py-0.5 rounded">{m.slug}</code>
                </div>
                <p className="mt-1 text-[13px] text-white/65 leading-relaxed font-mono whitespace-pre-wrap">{m.text}</p>
              </div>
              <div className="shrink-0 w-24 text-right">
                <p className="text-sm font-semibold tabular-nums">{m.charCount}c</p>
                <p className="text-[11px] text-white/45">used {m.lastUsed} ago</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  )
}
