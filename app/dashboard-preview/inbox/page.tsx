"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, ExternalLink, MessageSquare, Mail, Phone, MessageCircleMore } from "lucide-react"
import { AppShell } from "@/components/dashboard/app-shell"
import { StatusPill, type StatusVariant } from "@/components/dashboard/primitives"
import { cn } from "@/lib/utils"

type Channel = "Chat" | "Email" | "WhatsApp" | "Voice" | "SMS"
type Category = "All" | "Sales" | "Support" | "Billing" | "Onboarding" | "VIP" | "Internal"

const channelIcon: Record<Channel, typeof MessageSquare> = {
  Chat: MessageSquare,
  Email: Mail,
  WhatsApp: MessageCircleMore,
  Voice: Phone,
  SMS: MessageSquare,
}

interface Conversation {
  id: string
  category: Exclude<Category, "All">
  channel: Channel
  customer: string
  subject: string
  preview: string
  lastReply: string
  status: "Open" | "Pending" | "Resolved" | "On hold"
  sla: "On track" | "At risk" | "Breached"
  charCount: number
}

const conversations: Conversation[] = [
  { id: "c-4291", category: "Sales", channel: "Chat", customer: "Marcus T.", subject: "Pricing for 25 seats", preview: "Hey, looking at the $9.99 tier — does AI Agent come included or is that...", lastReply: "2m", status: "Open", sla: "On track", charCount: 124 },
  { id: "c-4290", category: "Support", channel: "Email", customer: "Sarah K.", subject: "Webhook stopped firing", preview: "Our Shopify orders webhook hasn't fired since 11:04. We've checked our...", lastReply: "8m", status: "Open", sla: "At risk", charCount: 198 },
  { id: "c-4289", category: "VIP", channel: "WhatsApp", customer: "Tyler R.", subject: "Order #4521 — wrong shoe size", preview: "Got my order today but it's a 10, I ordered an 11. Need exchange ASAP.", lastReply: "12m", status: "Pending", sla: "On track", charCount: 88 },
  { id: "c-4288", category: "Billing", channel: "Email", customer: "Emily R.", subject: "Question on invoice INV-2046", preview: "Saw a charge for $49 that I don't recognize. Can you pull the breakdown...", lastReply: "24m", status: "Open", sla: "On track", charCount: 152 },
  { id: "c-4287", category: "Onboarding", channel: "Voice", customer: "Atelier Cruz", subject: "Setting up Slack notifications", preview: "Voice call · 4m 12s · transcript ready", lastReply: "1h", status: "Resolved", sla: "On track", charCount: 0 },
  { id: "c-4286", category: "Support", channel: "Chat", customer: "Mike Chen", subject: "Help Center search is broken", preview: "Search bar on /help just returns nothing for 'refund'. Tried Chrome and...", lastReply: "1h", status: "Open", sla: "Breached", charCount: 142 },
  { id: "c-4285", category: "Sales", channel: "SMS", customer: "Annie L.", subject: "Trial extended?", preview: "Hey can you extend our trial by 7 days? Still waiting on procurement.", lastReply: "2h", status: "Pending", sla: "On track", charCount: 71 },
  { id: "c-4284", category: "Internal", channel: "Email", customer: "Jessica P.", subject: "Tagging policy review", preview: "Marketing wants to merge 'newsletter-signup' and 'lead-form' tags. Any...", lastReply: "3h", status: "Open", sla: "On track", charCount: 119 },
  { id: "c-4283", category: "VIP", channel: "Chat", customer: "Megan B.", subject: "Custom CSAT survey", preview: "Can we change the post-resolve survey wording for our enterprise plan?...", lastReply: "4h", status: "Resolved", sla: "On track", charCount: 156 },
  { id: "c-4282", category: "Support", channel: "Email", customer: "Ashley G.", subject: "2FA reset request", preview: "Lost my phone, can you reset MFA on my account please.", lastReply: "6h", status: "Resolved", sla: "On track", charCount: 56 },
  { id: "c-4281", category: "Billing", channel: "Chat", customer: "Sarah K.", subject: "Switch from monthly to annual", preview: "We'd like to switch our subscription to annual to lock in the rate.", lastReply: "8h", status: "Open", sla: "On track", charCount: 72 },
  { id: "c-4280", category: "Support", channel: "WhatsApp", customer: "Mike Chen", subject: "App crashes on Android 13", preview: "iOS works fine but Android keeps closing right after login on Pixel 7...", lastReply: "12h", status: "Open", sla: "At risk", charCount: 138 },
  { id: "c-4279", category: "Sales", channel: "Chat", customer: "Tyler R.", subject: "Demo follow-up", preview: "Thanks for yesterday's walkthrough. Sending the procurement form to legal.", lastReply: "1d", status: "Pending", sla: "On track", charCount: 78 },
  { id: "c-4278", category: "Onboarding", channel: "Email", customer: "Atelier Cruz", subject: "Workspace invite for design team", preview: "Need to add 4 new seats — Vivian, Theo, Lin, and Sarah.", lastReply: "1d", status: "Resolved", sla: "On track", charCount: 65 },
  { id: "c-4277", category: "Internal", channel: "Chat", customer: "Emily R.", subject: "Routing rule audit", preview: "All conversations tagged 'refund' should go to Tier 2, but I see some...", lastReply: "1d", status: "Resolved", sla: "On track", charCount: 128 },
  { id: "c-4276", category: "VIP", channel: "Email", customer: "Annie L.", subject: "Quarterly business review prep", preview: "Sending agenda for next Tuesday's QBR — let me know what you want to add.", lastReply: "2d", status: "Open", sla: "On track", charCount: 88 },
  { id: "c-4275", category: "Support", channel: "Voice", customer: "Marcus T.", subject: "Phone tree update", preview: "Voice call · 6m 02s · escalated to Tier 2 · CSAT 5/5", lastReply: "2d", status: "Resolved", sla: "On track", charCount: 0 },
]

const statusVariant: Record<Conversation["status"], StatusVariant> = {
  Open: "info",
  Pending: "warning",
  Resolved: "good",
  "On hold": "muted",
}
const slaVariant: Record<Conversation["sla"], StatusVariant> = {
  "On track": "good",
  "At risk": "warning",
  Breached: "fail",
}

const categories: Category[] = ["All", "Sales", "Support", "Billing", "Onboarding", "VIP", "Internal"]

export default function InboxInspectorPage() {
  useEffect(() => { document.title = "Inbox — FloatChat Dashboard" }, [])
  const [query, setQuery] = useState("")
  const [cat, setCat] = useState<Category>("All")
  const [selectedId, setSelectedId] = useState(conversations[0].id)

  const filtered = useMemo(() => {
    return conversations.filter((c) =>
      (cat === "All" || c.category === cat) &&
      (query === "" || (c.customer + c.subject + c.preview).toLowerCase().includes(query.toLowerCase()))
    )
  }, [query, cat])

  const selected = conversations.find((c) => c.id === selectedId) ?? conversations[0]

  return (
    <AppShell
      title="Inbox"
      subtitle={`All ${conversations.length} conversations across channels — pick one to see the full thread + AI suggestions.`}
    >
      {/* Filter bar */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customer, subject, or content"
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#16243D] ring-1 ring-white/10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-[#3B82F6]/40"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "px-3 h-9 rounded-lg text-xs font-medium transition-colors ring-1",
                cat === c
                  ? "bg-[#3B82F6] text-white ring-[#3B82F6]"
                  : "bg-[#16243D] text-white/65 ring-white/10 hover:text-white hover:bg-[#1A2B49]"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-4">
        {/* List */}
        <div className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] overflow-hidden">
          <ul className="divide-y divide-white/5 max-h-[640px] overflow-y-auto">
            {filtered.map((c) => {
              const Icon = channelIcon[c.channel]
              const active = c.id === selectedId
              return (
                <li key={c.id}>
                  <button
                    onClick={() => setSelectedId(c.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 transition-colors flex gap-3",
                      active ? "bg-[#1A2B49]" : "hover:bg-white/[0.02]"
                    )}
                  >
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-[#3B82F6]/10 ring-1 ring-[#3B82F6]/20 flex items-center justify-center text-[#60A5FA]">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold truncate">{c.customer}</p>
                        <span className="text-[10px] text-white/40 tabular-nums shrink-0">{c.lastReply}</span>
                      </div>
                      <p className="text-xs text-white/80 truncate">{c.subject}</p>
                      <p className="text-[11px] text-white/45 truncate mt-0.5">{c.preview}</p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <StatusPill variant={statusVariant[c.status]} label={c.status} size="sm" />
                        <StatusPill variant={slaVariant[c.sla]} label={c.sla} size="sm" />
                        <span className="text-[10px] text-white/40">· {c.category}</span>
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="px-4 py-2.5 border-t border-white/5 text-[11px] text-white/45">
            Showing {filtered.length} of {conversations.length} conversations
          </div>
        </div>

        {/* Detail */}
        <div className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] uppercase tracking-wider text-white/45">{selected.category}</span>
            <span className="text-white/20">·</span>
            <StatusPill variant={statusVariant[selected.status]} label={selected.status} />
            <StatusPill variant={slaVariant[selected.sla]} label={`SLA: ${selected.sla}`} />
          </div>
          <h2 className="text-xl font-semibold tracking-tight">{selected.subject}</h2>
          <div className="mt-1 flex items-center gap-2 text-sm text-white/55">
            <span className="font-medium text-white/80">{selected.customer}</span>
            <span>·</span>
            <span>{selected.channel}</span>
            <span>·</span>
            <a className="inline-flex items-center gap-1 text-[#60A5FA] hover:text-white" href="#">
              View live <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Preview thread */}
          <div className="mt-5 rounded-lg bg-[#0F1A2E] ring-1 ring-white/5 p-4">
            <p className="text-xs text-white/45 mb-1">Latest message · {selected.lastReply} ago</p>
            <p className="text-sm text-white/85 leading-relaxed">{selected.preview}</p>
          </div>

          {/* Inspector rows */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InspectRow label="Customer" value={selected.customer} />
            <InspectRow label="Channel" value={selected.channel} />
            <InspectRow label="Last reply" value={`${selected.lastReply} ago`} />
            <InspectRow label="Message length" value={`${selected.charCount} chars`} />
            <InspectRow label="AI suggestion" value="Refund eligible — Stripe ref ready" pill={<StatusPill variant="good" label="Confident" />} />
            <InspectRow label="Routing rule" value="Tier 2 (refunds > $30)" pill={<StatusPill variant="info" label="Auto-routed" />} />
            <InspectRow label="Macros applied" value="2 of 84" />
            <InspectRow label="Tags" value="refund · order-issue · vip" />
          </div>

          {/* Structured data — like JSON-LD */}
          <div className="mt-5 rounded-lg ring-1 ring-white/10 bg-[#0F1A2E] px-4 py-3">
            <p className="text-[11px] uppercase tracking-wider text-white/45 mb-2">Detected entities</p>
            <div className="flex flex-wrap gap-1.5">
              {["Order #4521", "Shopify", "Refund", "Email: tyler@…", "Size 11", "Net-30"].map((tag) => (
                <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.04] ring-1 ring-white/10 text-white/75">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

function InspectRow({ label, value, pill }: { label: string; value: string; pill?: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-[#0F1A2E] ring-1 ring-white/5 px-3 py-2.5">
      <p className="text-[10px] uppercase tracking-wider text-white/45 font-medium">{label}</p>
      <div className="mt-1 flex items-center justify-between gap-2">
        <p className="text-sm text-white/85 truncate">{value}</p>
        {pill}
      </div>
    </div>
  )
}
