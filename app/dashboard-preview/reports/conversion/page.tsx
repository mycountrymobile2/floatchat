"use client"

import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { AppShell } from "@/components/dashboard/app-shell"
import { Card, DataTable, StatCard, TabBar } from "@/components/dashboard/primitives"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const tabs = [
  { value: "detail", label: "Detailed Breakdown" },
  { value: "source", label: "By Source" },
  { value: "location", label: "By Location" },
  { value: "lp", label: "By Landing Page" },
  { value: "trends", label: "Trends" },
  { value: "rev", label: "Revenue Analysis" },
]

const sources = ["All Sources", "Google Organic", "Google Ads", "Direct", "Facebook", "LinkedIn", "Instagram", "Email", "Twitter", "Referral", "Pinterest"]
const countries = ["All", "US", "UK", "Canada", "Australia", "Germany"]
const trafficTypes = ["All", "Organic Only", "Paid Only"]

const rows = [
  { loc: "New York, US", src: "Google Organic", lp: "/pricing", kw: "intercom alternative", v: 2140, s: 142, o: 64, total: "$7,680", aov: "$120", signup: "6.6%", purch: "3.0%", rev: "15.8%" },
  { loc: "London, UK", src: "Google Ads", lp: "/", kw: "customer support inbox", v: 1820, s: 96, o: 42, total: "$5,040", aov: "$120", signup: "5.3%", purch: "2.3%", rev: "10.4%" },
  { loc: "San Francisco, US", src: "LinkedIn", lp: "/ai-agent", kw: "—", v: 1240, s: 84, o: 38, total: "$4,560", aov: "$120", signup: "6.8%", purch: "3.1%", rev: "9.4%" },
  { loc: "Toronto, CA", src: "Direct", lp: "/pricing", kw: "—", v: 942, s: 72, o: 32, total: "$3,840", aov: "$120", signup: "7.6%", purch: "3.4%", rev: "7.9%" },
  { loc: "Sydney, AU", src: "Email", lp: "/", kw: "—", v: 818, s: 64, o: 28, total: "$3,360", aov: "$120", signup: "7.8%", purch: "3.4%", rev: "6.9%" },
  { loc: "Berlin, DE", src: "Google Organic", lp: "/help", kw: "refund policy", v: 642, s: 28, o: 12, total: "$1,440", aov: "$120", signup: "4.4%", purch: "1.9%", rev: "3.0%" },
  { loc: "Austin, US", src: "Twitter", lp: "/blog/ai", kw: "—", v: 538, s: 14, o: 6, total: "$720", aov: "$120", signup: "2.6%", purch: "1.1%", rev: "1.5%" },
]

export default function ConversionReportPage() {
  useEffect(() => { document.title = "Channel Conversion — FloatChat" }, [])
  const [tab, setTab] = useState("detail")
  const [src, setSrc] = useState("All Sources")
  const [country, setCountry] = useState("All")
  const [traffic, setTraffic] = useState("All")

  const filtered = useMemo(() => {
    return rows.filter((r) =>
      (src === "All Sources" || r.src === src) &&
      (country === "All" || r.loc.endsWith(country === "US" ? "US" : country === "UK" ? "UK" : country === "Canada" ? "CA" : country === "Australia" ? "AU" : "DE")) &&
      (traffic === "All" || (traffic === "Organic Only" ? r.src.includes("Organic") || r.src === "Direct" : r.src.includes("Ads") || r.src === "LinkedIn" || r.src === "Twitter"))
    )
  }, [src, country, traffic])

  const totals = useMemo(() => {
    const v = filtered.reduce((a, r) => a + r.v, 0)
    const s = filtered.reduce((a, r) => a + r.s, 0)
    const o = filtered.reduce((a, r) => a + r.o, 0)
    const rev = filtered.reduce((a, r) => a + Number(r.total.replace(/[$,]/g, "")), 0)
    return { v, s, o, rev, signup: v > 0 ? ((s / v) * 100).toFixed(2) + "%" : "—", purch: v > 0 ? ((o / v) * 100).toFixed(2) + "%" : "—" }
  }, [filtered])

  return (
    <AppShell title="Channel Conversion" subtitle="Visitor → customer journey by location, source, keyword, and landing page.">
      <Link to="/dashboard-preview/reports" className="inline-flex items-center gap-1 text-xs text-white/55 hover:text-white mb-4">
        <ArrowLeft className="h-3 w-3" /> Back to Reports
      </Link>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
        <StatCard label="Total Visitors" value="22,040" />
        <StatCard label="Total Signups" value="916" />
        <StatCard label="Total Purchases" value="412" />
        <StatCard label="Total Revenue" value="$48,640" />
        <StatCard label="AOV" value="$118.06" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Signup Rate" value="4.16%" delta="6.4%" deltaDirection="up" />
        <StatCard label="Purchase Rate" value="1.87%" delta="3.2%" deltaDirection="up" />
        <StatCard label="Paid Conversion" value="44.98%" delta="3.8%" deltaDirection="up" />
        <StatCard label="Revenue / Visitor" value="$2.21" delta="14.2%" deltaDirection="up" />
      </div>

      {/* Split cards */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <SplitCard label="Organic Traffic" pct="66.12% of revenue" tone="emerald" stats={{ v: "14,840", s: 642, o: 286, rev: "$32,200", aov: "$112.59" }} />
        <SplitCard label="Paid Traffic" pct="33.88% of revenue" tone="blue" stats={{ v: "7,200", s: 274, o: 126, rev: "$16,440", aov: "$130.48" }} />
      </div>

      <div className="mb-4"><TabBar tabs={tabs} active={tab} onChange={setTab} /></div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Dropdown label="Source" value={src} options={sources} onChange={setSrc} />
        <Dropdown label="Country" value={country} options={countries} onChange={setCountry} />
        <Dropdown label="Traffic" value={traffic} options={trafficTypes} onChange={setTraffic} />
      </div>

      {/* Running totals row */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4 rounded-xl bg-[#1E3050] ring-1 ring-[#3B82F6]/20 p-4">
        <Running label="Visitors" value={totals.v.toLocaleString()} />
        <Running label="Signups" value={totals.s.toLocaleString()} />
        <Running label="Purchases" value={totals.o.toLocaleString()} />
        <Running label="Revenue" value={`$${totals.rev.toLocaleString()}`} />
        <Running label="Signup %" value={totals.signup} />
        <Running label="Purchase %" value={totals.purch} />
      </div>

      <Card title="Conversion table">
        <DataTable
          columns={[
            { key: "loc", header: "Location" },
            { key: "src", header: "Source" },
            { key: "lp", header: "Landing" },
            { key: "kw", header: "Keyword" },
            { key: "v", header: "Visitors", align: "right" },
            { key: "s", header: "Signups", align: "right" },
            { key: "o", header: "Orders", align: "right" },
            { key: "total", header: "Total $", align: "right" },
            { key: "aov", header: "AOV", align: "right" },
            { key: "signup", header: "Signup %", align: "right" },
            { key: "purch", header: "Purch %", align: "right" },
            { key: "rev", header: "Rev %", align: "right" },
          ]}
          rows={filtered as unknown as Record<string, ReactNode>[]}
          onExport={() => {}}
        />
      </Card>
    </AppShell>
  )
}

function Dropdown({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="flex items-center gap-2 rounded-lg bg-[#16243D] ring-1 ring-white/10 px-3 h-9 text-xs">
      <span className="text-white/45">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-white font-medium focus:outline-none pr-1 cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#16243D] text-white">{o}</option>
        ))}
      </select>
      <ChevronDown className="h-3 w-3 text-white/45" />
    </label>
  )
}

function Running({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-[#60A5FA] font-semibold">{label}</p>
      <p className="text-base font-semibold tabular-nums mt-0.5">{value}</p>
    </div>
  )
}

function SplitCard({ label, pct, tone, stats }: { label: string; pct: string; tone: "emerald" | "blue"; stats: { v: string; s: number; o: number; rev: string; aov: string } }) {
  return (
    <div className={cn(
      "rounded-xl ring-1 p-5 cursor-pointer hover:ring-2 transition-all",
      tone === "emerald" ? "bg-emerald-500/[0.04] ring-emerald-500/20 hover:ring-emerald-500/40" : "bg-[#3B82F6]/[0.04] ring-[#3B82F6]/20 hover:ring-[#3B82F6]/40"
    )}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold">{label}</p>
        <span className={cn("text-[11px] font-medium", tone === "emerald" ? "text-emerald-400" : "text-[#60A5FA]")}>{pct}</span>
      </div>
      <div className="grid grid-cols-5 gap-2 text-center">
        <div><p className="text-[10px] text-white/45">Visitors</p><p className="text-sm font-semibold tabular-nums">{stats.v}</p></div>
        <div><p className="text-[10px] text-white/45">Signups</p><p className="text-sm font-semibold tabular-nums">{stats.s}</p></div>
        <div><p className="text-[10px] text-white/45">Purchases</p><p className="text-sm font-semibold tabular-nums">{stats.o}</p></div>
        <div><p className="text-[10px] text-white/45">Revenue</p><p className="text-sm font-semibold tabular-nums">{stats.rev}</p></div>
        <div><p className="text-[10px] text-white/45">AOV</p><p className="text-sm font-semibold tabular-nums">{stats.aov}</p></div>
      </div>
      <p className="mt-3 text-[10px] text-white/40">Click to filter the table below</p>
    </div>
  )
}
