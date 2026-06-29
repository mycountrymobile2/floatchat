"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, AlertCircle, XCircle, FileSearch, ShieldCheck, Sparkles } from "lucide-react"
import { AppShell } from "@/components/dashboard/app-shell"
import {
  TabBar,
  Card,
  ChecklistItem,
  DataTable,
  StatusPill,
  type StatusVariant,
} from "@/components/dashboard/primitives"
import type { ReactNode } from "react"

const kpis = [
  { label: "AI Score", value: "84", footnote: "out of 100", icon: <Sparkles className="h-4 w-4 text-[#60A5FA]" /> },
  { label: "Passed", value: "47", footnote: "of 56 checks", icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" /> },
  { label: "Warnings", value: "6", footnote: "need review", icon: <AlertCircle className="h-4 w-4 text-amber-400" /> },
  { label: "Errors", value: "3", footnote: "blocking deflection", icon: <XCircle className="h-4 w-4 text-red-400" /> },
]

const subtabs = [
  { value: "overview", label: "Overview" },
  { value: "conversations", label: "Conversation Analysis" },
  { value: "intents", label: "Intent Coverage" },
  { value: "knowledge", label: "Knowledge Base" },
  { value: "vitals", label: "Conversation Vitals" },
]

interface CheckGroup {
  title: string
  description: string
  passed: number
  warnings: number
  fails: number
  items: { label: string; description: string; status: StatusVariant; statusLabel: string }[]
}

const groups: CheckGroup[] = [
  {
    title: "Reply Quality",
    description: "Tone, brand voice, factual accuracy, citation usage.",
    passed: 18, warnings: 2, fails: 1,
    items: [
      { label: "Brand voice consistency", description: "Greetings, sign-offs, capitalization", status: "good", statusLabel: "Pass" },
      { label: "Citation coverage", description: "Replies linking to a help article when source exists", status: "warning", statusLabel: "Warning" },
      { label: "Factual hallucination check", description: "No invented SKUs, prices, or policies", status: "good", statusLabel: "Pass" },
      { label: "PII redaction in suggested drafts", description: "Phone, email, card numbers masked", status: "fail", statusLabel: "Fail" },
      { label: "Sentiment-aware tone matching", description: "De-escalates angry, mirrors casual", status: "good", statusLabel: "Pass" },
    ],
  },
  {
    title: "Routing & Intent",
    description: "Right team, right priority, right macro suggested.",
    passed: 14, warnings: 3, fails: 1,
    items: [
      { label: "Refund vs cancel intent split", description: "Refund > 14d auto-routes to Tier 2", status: "good", statusLabel: "Pass" },
      { label: "VIP segment routing", description: "Customers with ARR > $50k go to dedicated AE", status: "good", statusLabel: "Pass" },
      { label: "Onboarding intent coverage", description: "Detects new-account-no-product questions", status: "warning", statusLabel: "Warning" },
      { label: "Billing escalation threshold", description: "> $500 disputes flag finance", status: "fail", statusLabel: "Fail" },
    ],
  },
  {
    title: "Knowledge Base",
    description: "Doc freshness, broken links, conflicting answers.",
    passed: 15, warnings: 1, fails: 1,
    items: [
      { label: "Articles last updated < 90 days", description: "82% of articles meet freshness target", status: "good", statusLabel: "Pass" },
      { label: "Broken internal links", description: "2 dead links found in 'Refunds' article", status: "warning", statusLabel: "Warning" },
      { label: "Conflicting answers", description: "Two articles give different SLA values", status: "fail", statusLabel: "Fail" },
    ],
  },
]

export default function AiAuditPage() {
  useEffect(() => { document.title = "AI Audit — FloatChat Dashboard" }, [])
  const [tab, setTab] = useState("overview")

  return (
    <AppShell title="AI Audit" subtitle="Aggregate quality scoring across replies, routing, and knowledge.">
      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-5">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-medium text-white/55">{k.label}</p>
              {k.icon}
            </div>
            <p className="mt-2 text-[28px] font-semibold tabular-nums leading-none">{k.value}</p>
            <p className="mt-2 text-[11px] text-white/45">{k.footnote}</p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <TabBar tabs={subtabs} active={tab} onChange={setTab} />
      </div>

      {tab === "overview" && (
        <div className="grid lg:grid-cols-3 gap-4">
          {groups.map((g) => (
            <Card key={g.title} title={g.title} subtitle={g.description}>
              <div className="flex items-center gap-2 mb-3">
                <StatusPill variant="good" label={`${g.passed} pass`} />
                <StatusPill variant="warning" label={`${g.warnings} warn`} />
                <StatusPill variant="fail" label={`${g.fails} fail`} />
              </div>
              <div className="-mx-5 divide-y divide-white/5">
                {g.items.map((c) => (
                  <ChecklistItem key={c.label} {...c} />
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "conversations" && (
        <Card title="Per-conversation analysis" subtitle="Score = tone (30%) + accuracy (40%) + routing (30%)">
          <DataTable
            columns={[
              { key: "id", header: "ID" },
              { key: "customer", header: "Customer" },
              { key: "intent", header: "Intent" },
              { key: "len", header: "Msg Len", align: "right" },
              { key: "route", header: "Routed To" },
              { key: "tone", header: "Tone" },
              { key: "score", header: "Score", align: "right" },
            ]}
            rows={[
              { id: "c-4291", customer: "Marcus T.", intent: "Pricing", len: 124, route: "Sales", tone: <StatusPill variant="good" label="Good" />, score: 92 },
              { id: "c-4290", customer: "Sarah K.", intent: "Webhook", len: 198, route: "Tier 2", tone: <StatusPill variant="warning" label="Mixed" />, score: 76 },
              { id: "c-4289", customer: "Tyler R.", intent: "Refund", len: 88, route: "Tier 2", tone: <StatusPill variant="good" label="Good" />, score: 88 },
              { id: "c-4288", customer: "Emily R.", intent: "Invoice", len: 152, route: "Billing", tone: <StatusPill variant="good" label="Good" />, score: 90 },
              { id: "c-4286", customer: "Mike Chen", intent: "Bug", len: 142, route: "Engineering", tone: <StatusPill variant="fail" label="Off" />, score: 54 },
              { id: "c-4285", customer: "Annie L.", intent: "Trial ext", len: 71, route: "Sales", tone: <StatusPill variant="good" label="Good" />, score: 84 },
            ] as unknown as Record<string, ReactNode>[]}
            onExport={() => {}}
          />
        </Card>
      )}

      {tab === "intents" && (
        <Card title="Intent coverage map" subtitle="Where the AI confidently answers vs. punts.">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: "Refund eligibility", coverage: 96, pill: "good" as const },
              { name: "Order tracking", coverage: 94, pill: "good" as const },
              { name: "Pricing & plans", coverage: 92, pill: "good" as const },
              { name: "Account access", coverage: 88, pill: "good" as const },
              { name: "Shipping windows", coverage: 79, pill: "warning" as const },
              { name: "Onboarding (new account)", coverage: 71, pill: "warning" as const },
              { name: "API + integration setup", coverage: 64, pill: "warning" as const },
              { name: "Billing disputes > $500", coverage: 41, pill: "fail" as const },
              { name: "Custom contract questions", coverage: 28, pill: "fail" as const },
            ].map((i) => (
              <div key={i.name} className="rounded-lg bg-[#0F1A2E] ring-1 ring-white/5 px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">{i.name}</p>
                  <StatusPill variant={i.pill} label={`${i.coverage}%`} size="sm" />
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${i.coverage}%`,
                      backgroundColor: i.pill === "good" ? "#10B981" : i.pill === "warning" ? "#F59E0B" : "#EF4444",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === "knowledge" && (
        <div className="grid lg:grid-cols-3 gap-4">
          <Card title="Article health" className="lg:col-span-2">
            <DataTable
              columns={[
                { key: "title", header: "Article" },
                { key: "updated", header: "Last Updated" },
                { key: "views", header: "Views (30d)", align: "right" },
                { key: "deflect", header: "Deflects", align: "right" },
                { key: "status", header: "Status" },
              ]}
              rows={[
                { title: "Refunds — policy and timeline", updated: "12d ago", views: "2,140", deflect: 642, status: <StatusPill variant="good" label="Healthy" /> },
                { title: "Order tracking & ETA", updated: "8d ago", views: "1,820", deflect: 588, status: <StatusPill variant="good" label="Healthy" /> },
                { title: "API authentication", updated: "94d ago", views: "1,210", deflect: 312, status: <StatusPill variant="warning" label="Stale" /> },
                { title: "Account 2FA reset", updated: "6d ago", views: "1,160", deflect: 410, status: <StatusPill variant="good" label="Healthy" /> },
                { title: "Shipping windows by region", updated: "182d ago", views: "884", deflect: 102, status: <StatusPill variant="fail" label="Outdated" /> },
                { title: "Webhook reference", updated: "212d ago", views: "642", deflect: 88, status: <StatusPill variant="fail" label="Outdated" /> },
              ] as unknown as Record<string, ReactNode>[]}
            />
          </Card>
          <Card title="KB summary">
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between"><span className="text-white/60">Total articles</span><span className="font-semibold tabular-nums">142</span></li>
              <li className="flex items-center justify-between"><span className="text-white/60">Updated last 30 days</span><span className="font-semibold tabular-nums text-emerald-400">88</span></li>
              <li className="flex items-center justify-between"><span className="text-white/60">Stale (90d+)</span><span className="font-semibold tabular-nums text-amber-400">36</span></li>
              <li className="flex items-center justify-between"><span className="text-white/60">Outdated (180d+)</span><span className="font-semibold tabular-nums text-red-400">18</span></li>
              <li className="flex items-center justify-between"><span className="text-white/60">Broken internal links</span><span className="font-semibold tabular-nums text-amber-400">12</span></li>
              <li className="flex items-center justify-between"><span className="text-white/60">Conflicting answers</span><span className="font-semibold tabular-nums text-red-400">3</span></li>
            </ul>
          </Card>
        </div>
      )}

      {tab === "vitals" && (
        <Card title="Conversation Vitals — health metrics over the last 28 days">
          <DataTable
            columns={[
              { key: "metric", header: "Metric" },
              { key: "value", header: "Value", align: "right" },
              { key: "target", header: "Target", align: "right" },
              { key: "status", header: "Status" },
              { key: "trend", header: "Trend" },
            ]}
            rows={[
              { metric: "First Response Time (FRT)", value: "42s", target: "< 60s", status: <StatusPill variant="good" label="Good" />, trend: "↘ improving" },
              { metric: "Full Resolution Time (FRT2)", value: "3m 24s", target: "< 5m", status: <StatusPill variant="good" label="Good" />, trend: "↘ improving" },
              { metric: "Customer Effort Score (CES)", value: "1.8", target: "< 2.0", status: <StatusPill variant="good" label="Good" />, trend: "→ stable" },
              { metric: "Reopen Rate", value: "6.2%", target: "< 8%", status: <StatusPill variant="good" label="Good" />, trend: "→ stable" },
              { metric: "Escalation Rate", value: "11.8%", target: "< 10%", status: <StatusPill variant="warning" label="Watch" />, trend: "↗ rising" },
              { metric: "Cold Transfer Rate", value: "3.4%", target: "< 2%", status: <StatusPill variant="fail" label="Off" />, trend: "↗ rising" },
            ] as unknown as Record<string, ReactNode>[]}
          />
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            <VitalCard name="FRT" value="42s" pill={<StatusPill variant="good" label="Healthy" />} note="Median across all channels" />
            <VitalCard name="Reopen Rate" value="6.2%" pill={<StatusPill variant="good" label="Healthy" />} note="Below industry avg (9.8%)" />
            <VitalCard name="Escalation" value="11.8%" pill={<StatusPill variant="warning" label="Watch" />} note="Spike on Mondays — staffing?" icon={<ShieldCheck className="h-4 w-4 text-amber-400" />} />
          </div>
        </Card>
      )}
    </AppShell>
  )
}

function VitalCard({ name, value, pill, note, icon }: { name: string; value: string; pill: ReactNode; note: string; icon?: ReactNode }) {
  return (
    <div className="rounded-lg bg-[#0F1A2E] ring-1 ring-white/5 p-4">
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-[11px] uppercase tracking-wider text-white/45 font-medium">{name}</p>
        {icon ?? <FileSearch className="h-4 w-4 text-white/30" />}
      </div>
      <p className="text-xl font-semibold tabular-nums">{value}</p>
      <div className="mt-2 flex items-center gap-2">{pill}<span className="text-[11px] text-white/45">{note}</span></div>
    </div>
  )
}
