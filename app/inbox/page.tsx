"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Inbox,
  Check,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Search,
  Filter,
  Star,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  AtSign,
  Tag,
  Clock,
  Workflow,
  X,
  Mic,
} from "lucide-react"
import {
  FaWhatsapp,
  FaEnvelope,
  FaInstagram,
  FaFacebookMessenger,
  FaTelegram,
  FaLine,
  FaTiktok,
} from "react-icons/fa"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"

/* ─────────────────────────────────────────────────────────────
   Hero mockup: multi-channel agent dashboard
─────────────────────────────────────────────────────────────── */

type IconCmp = React.ComponentType<{ style?: React.CSSProperties; className?: string }>

const channelList: { Icon: IconCmp; name: string; color: string; count?: number }[] = [
  { Icon: FaWhatsapp, name: "WhatsApp", color: "#25D366", count: 12 },
  { Icon: FaEnvelope, name: "Email", color: "#EA4335", count: 8 },
  { Icon: FaInstagram, name: "Instagram", color: "#E1306C", count: 5 },
  { Icon: FaFacebookMessenger, name: "Messenger", color: "#0084FF", count: 3 },
  { Icon: FaTelegram, name: "Telegram", color: "#26A5E4", count: 2 },
  { Icon: FaLine, name: "Line", color: "#06C755" },
  { Icon: FaTiktok, name: "TikTok", color: "#0F0F0F" },
]

const threads = [
  {
    name: "Jessica Chen",
    preview: "Is order #4421 shipped yet?",
    time: "2m",
    channel: "WhatsApp",
    color: "#25D366",
    Icon: FaWhatsapp,
    unread: 2,
    avatar: "https://i.pravatar.cc/80?img=47",
    active: true,
  },
  {
    name: "Marcus Williams",
    preview: "About the subscription renewal…",
    time: "5m",
    channel: "Email",
    color: "#EA4335",
    Icon: FaEnvelope,
    unread: 1,
    avatar: "https://i.pravatar.cc/80?img=12",
  },
  {
    name: "Ashley Rodriguez",
    preview: "DM'd you about the linen tee",
    time: "12m",
    channel: "Instagram",
    color: "#E1306C",
    Icon: FaInstagram,
    avatar: "https://i.pravatar.cc/80?img=44",
  },
  {
    name: "Tyler Brooks",
    preview: "Thanks for the quick reply!",
    time: "1h",
    channel: "Messenger",
    color: "#0084FF",
    Icon: FaFacebookMessenger,
    avatar: "https://i.pravatar.cc/80?img=15",
  },
  {
    name: "Megan O'Connor",
    preview: "Sent you the receipt copy",
    time: "3h",
    channel: "Email",
    color: "#EA4335",
    Icon: FaEnvelope,
    avatar: "https://i.pravatar.cc/80?img=49",
  },
]

function MultiChannelInboxMockup() {
  // Cycle the active channel highlight on the sidebar to show "many channels"
  const [highlight, setHighlight] = useState(0)
  useEffect(() => {
    const t = setInterval(
      () => setHighlight((p) => (p + 1) % channelList.length),
      1600,
    )
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative">
      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.35), transparent 70%)",
        }}
      />

      {/* Floating "10 channels" chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
          <Inbox className="h-2.5 w-2.5 text-white" />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          10 channels · 1 screen
        </span>
      </motion.div>

      {/* Floating SLA chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Avg reply <span className="text-emerald-600">2m</span>
        </span>
      </motion.div>

      {/* Main window */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 text-[10px] font-mono text-slate-400">
            app.floatchat.com · inbox
          </span>
          <span className="ml-auto text-[9px] text-slate-400">⌘K</span>
        </div>

        <div className="grid grid-cols-12 min-h-[440px]">
          {/* Channels rail — hidden on phones */}
          <aside className="hidden md:flex md:col-span-3 border-r border-slate-200 bg-slate-50/60 flex-col">
            <div className="px-3 py-2.5 border-b border-slate-200">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Channels
              </p>
            </div>
            <div className="px-2 py-2 space-y-0.5">
              {channelList.map((c, i) => {
                const active = i === highlight
                return (
                  <motion.div
                    key={c.name}
                    animate={
                      active
                        ? { backgroundColor: "rgba(59,130,246,0.08)" }
                        : { backgroundColor: "rgba(0,0,0,0)" }
                    }
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer"
                  >
                    <c.Icon
                      style={{ color: c.color, width: 12, height: 12 }}
                    />
                    <span className="text-[10.5px] font-medium text-[#0F2A4A] truncate flex-1">
                      {c.name}
                    </span>
                    {c.count && (
                      <span
                        className={`text-[9px] font-semibold px-1.5 py-0 rounded ${
                          active
                            ? "bg-[#3B82F6] text-white"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {c.count}
                      </span>
                    )}
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-auto px-3 py-3 border-t border-slate-200">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mb-2">
                Today
              </p>
              <div className="space-y-1.5">
                <RailStat label="Conversations" value="142" />
                <RailStat label="Avg first reply" value="2m" />
                <RailStat label="Resolved" value="89" tone="emerald" />
              </div>
            </div>
          </aside>

          {/* Thread list */}
          <section className="col-span-12 md:col-span-5 border-r border-slate-200 flex flex-col">
            <div className="px-3 py-2.5 border-b border-slate-200">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-semibold text-[#0F2A4A]">
                    All conversations
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
                    142 open
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Search className="h-3 w-3" />
                  <Filter className="h-3 w-3" />
                </div>
              </div>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="text-[#1D4ED8] font-medium border-b border-[#1D4ED8] pb-0.5">
                  Mine <span className="text-slate-400">5</span>
                </span>
                <span className="text-slate-500">
                  Unassigned <span className="text-slate-400">3</span>
                </span>
                <span className="text-slate-500">
                  All <span className="text-slate-400">142</span>
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              {threads.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`flex items-start gap-2 px-3 py-2.5 border-b border-slate-100 cursor-pointer ${
                    t.active
                      ? "bg-[#3B82F6]/5 border-l-2 border-l-[#3B82F6]"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      loading="lazy"
                      className="h-7 w-7 rounded-full object-cover ring-2 ring-white"
                    />
                    <span
                      className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-1 ring-white flex items-center justify-center"
                      style={{ background: t.color }}
                    >
                      <t.Icon className="h-2 w-2 text-white" />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-[11px] font-medium text-[#0F2A4A] truncate">
                        {t.name}
                      </p>
                      <span className="text-[9px] text-slate-400 shrink-0">
                        {t.time}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate">{t.preview}</p>
                    <p
                      className="mt-0.5 text-[8.5px] font-medium uppercase tracking-wider"
                      style={{ color: t.color }}
                    >
                      {t.channel}
                    </p>
                  </div>
                  {t.unread ? (
                    <motion.span
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                      className="h-4 min-w-[16px] px-1 rounded-full bg-[#3B82F6] text-[9px] font-medium text-white flex items-center justify-center"
                    >
                      {t.unread}
                    </motion.span>
                  ) : null}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Active conversation — hidden on small */}
          <section className="hidden lg:flex lg:col-span-4 flex-col bg-white">
            <div className="px-3 py-2 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/80?img=47"
                    alt="Jessica Chen"
                    loading="lazy"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#25D366] ring-1 ring-white flex items-center justify-center">
                    <FaWhatsapp className="h-2 w-2 text-white" />
                  </span>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#0F2A4A] leading-tight">
                    Jessica Chen
                  </p>
                  <p className="text-[9px] text-slate-500">3 channels · 1 profile</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Star className="h-3 w-3" />
                <MoreVertical className="h-3 w-3" />
              </div>
            </div>

            {/* Customer profile micro-card */}
            <div className="px-3 py-2 border-b border-slate-100 bg-slate-50/40">
              <p className="text-[9px] uppercase tracking-wider text-slate-400 font-medium mb-1.5">
                Previously seen on
              </p>
              <div className="flex items-center gap-1.5">
                {[
                  { Icon: FaWhatsapp, label: "WhatsApp · 2h", color: "#25D366" },
                  { Icon: FaEnvelope, label: "Email · 1d", color: "#EA4335" },
                  { Icon: FaInstagram, label: "Instagram · 4d", color: "#E1306C" },
                ].map((s) => (
                  <span
                    key={s.label}
                    className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-1.5 py-0.5 text-[9px] text-slate-600"
                  >
                    <s.Icon style={{ color: s.color, width: 9, height: 9 }} />
                    {s.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 px-3 py-3 space-y-2 bg-slate-50/30 overflow-hidden">
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[85%] shadow-sm">
                  <p className="text-[10.5px] text-[#0F2A4A]">
                    Is order #4421 shipped yet?
                  </p>
                  <p className="text-[8px] text-slate-400 mt-0.5">9:41 AM</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-[#3B82F6] rounded-xl rounded-br-sm px-2.5 py-1.5 max-w-[85%] shadow-sm">
                  <p className="text-[10.5px] text-white">
                    Checking now — one moment, Jessica.
                  </p>
                  <p className="text-[8px] text-white/70 mt-0.5 text-right">9:42 AM</p>
                </div>
              </div>

              {/* Private note */}
              <div className="flex items-start gap-1.5 mt-2">
                <div className="h-4 w-4 rounded bg-amber-200 flex items-center justify-center shrink-0">
                  <AtSign className="h-2 w-2 text-amber-800" />
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg rounded-bl-sm px-2 py-1 max-w-[85%]">
                  <p className="text-[9px] font-medium text-amber-800 mb-0.5">
                    @sarah · private note
                  </p>
                  <p className="text-[10px] text-amber-900 leading-snug">
                    She's a VIP — order ships tomorrow, ping her with tracking.
                  </p>
                </div>
              </div>
            </div>

            {/* Composer */}
            <div className="border-t border-slate-200 bg-white">
              <div className="px-3 pt-2 flex items-center gap-2 text-[10px]">
                <span className="text-[#1D4ED8] font-medium border-b border-[#1D4ED8] pb-1">
                  Reply
                </span>
                <span className="text-slate-500 pb-1">Private Note</span>
              </div>
              <div className="px-3 py-2">
                <div className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5">
                  <span className="text-[10px] text-slate-400">
                    Reply via WhatsApp…
                  </span>
                </div>
              </div>
              <div className="px-3 pb-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  <Paperclip className="h-3 w-3" />
                  <Smile className="h-3 w-3" />
                  <Mic className="h-3 w-3" />
                </div>
                <button className="inline-flex items-center gap-1 text-[10px] font-medium bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white px-2 py-1 rounded-md">
                  <Send className="h-2.5 w-2.5" /> Send
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function RailStat({
  label,
  value,
  tone = "blue",
}: {
  label: string
  value: string
  tone?: "blue" | "emerald"
}) {
  const toneColor = tone === "emerald" ? "text-emerald-600" : "text-[#1D4ED8]"
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-slate-500">{label}</span>
      <span className={`text-[11px] font-semibold ${toneColor}`}>{value}</span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Section eyebrow
─────────────────────────────────────────────────────────────── */

function SectionEyebrow({ num, label }: { num: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <span className="text-[11px] font-mono text-slate-400">/ {num}</span>
      <span className="h-px w-8 bg-slate-300" />
      <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#3B82F6]">
        {label}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Alternating feature rows (pattern unique to Inbox)
─────────────────────────────────────────────────────────────── */

function FeatureRow({
  imageFirst,
  num,
  eyebrow,
  title,
  body,
  visual,
}: {
  imageFirst?: boolean
  num: string
  eyebrow: string
  title: string
  body: string
  visual: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      <div
        className={`lg:col-span-7 ${
          imageFirst ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div className="relative rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-sm p-6 lg:p-8 shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)] overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-50"
            style={{
              background:
                "radial-gradient(closest-side, rgba(96,165,250,0.3), transparent 70%)",
            }}
          />
          <div className="relative">{visual}</div>
        </div>
      </div>
      <div
        className={`lg:col-span-5 ${
          imageFirst ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <SectionEyebrow num={num} label={eyebrow} />
        <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight text-[#0F2A4A] leading-[1.1]">
          {title}
        </h3>
        <p className="mt-3 text-[15px] text-slate-500 leading-relaxed max-w-md">
          {body}
        </p>
      </div>
    </div>
  )
}

/* — Row 1 visual: chaos → order — */
function AppChaosVisual() {
  const apps = [
    { label: "WATI", color: "#25D366" },
    { label: "Help Scout", color: "#1292EE" },
    { label: "Twilio", color: "#F22F46" },
    { label: "Gmail", color: "#EA4335" },
    { label: "Slack DM", color: "#4A154B" },
    { label: "Intercom", color: "#0057FF" },
  ]
  return (
    <div className="grid grid-cols-2 gap-6 items-center">
      {/* Chaos side */}
      <div className="relative">
        <p className="text-[10px] uppercase tracking-wider font-medium text-slate-400 mb-3">
          Before
        </p>
        <div className="grid grid-cols-2 gap-2">
          {apps.map((a) => (
            <div
              key={a.label}
              className="relative rounded-lg border border-slate-200 bg-white px-2.5 py-2 shadow-sm"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-sm"
                  style={{ background: a.color }}
                />
                <span className="text-[10px] font-medium text-[#0F2A4A] truncate">
                  {a.label}
                </span>
              </div>
              <span className="mt-1 inline-flex items-center justify-center h-3.5 min-w-[14px] px-1 rounded-full bg-red-500/90 text-[8px] font-medium text-white">
                {Math.floor(Math.random() * 9) + 2}
              </span>
              <X className="absolute -top-1.5 -right-1.5 h-3 w-3 text-red-500 bg-white rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="hidden" />
      </div>

      {/* Order side */}
      <div>
        <p className="text-[10px] uppercase tracking-wider font-medium text-slate-400 mb-3">
          After
        </p>
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative rounded-2xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] p-5 text-white shadow-[0_20px_40px_-15px_rgba(59,130,246,0.5)]"
        >
          <Inbox className="h-7 w-7 mb-3" />
          <p className="text-base font-semibold">FloatChat</p>
          <p className="text-[11px] text-blue-100 mt-1">All 10 channels</p>
          <div className="mt-3 inline-flex items-center gap-1 text-[10px] bg-white/15 backdrop-blur rounded-full px-2 py-0.5">
            <Check className="h-2.5 w-2.5" /> One screen
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* — Row 2 visual: customer profile with channel timeline — */
function CustomerProfileVisual() {
  return (
    <div className="space-y-3">
      {/* Customer header */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
        <img
          src="https://i.pravatar.cc/80?img=47"
          alt="Jessica Chen"
          loading="lazy"
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-[#0F2A4A]">Jessica Chen</p>
          <p className="text-[11px] text-slate-500">
            VIP · 3 orders · Lifetime $1,420
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pl-4">
        <span className="absolute left-[5px] top-2 bottom-2 w-px bg-slate-200" />
        {[
          {
            Icon: FaWhatsapp,
            color: "#25D366",
            channel: "WhatsApp",
            label: "Is order #4421 shipped yet?",
            time: "2m ago",
          },
          {
            Icon: FaEnvelope,
            color: "#EA4335",
            channel: "Email",
            label: "Receipt for order #4419",
            time: "1d ago",
          },
          {
            Icon: FaInstagram,
            color: "#E1306C",
            channel: "Instagram DM",
            label: "Reply about new collection",
            time: "4d ago",
          },
          {
            Icon: Inbox,
            color: "#3B82F6",
            channel: "Live Chat",
            label: "Sizing question",
            time: "2w ago",
          },
        ].map((e, i) => (
          <div key={i} className="relative pl-4 pb-3 last:pb-0">
            <span
              className="absolute -left-[1px] top-0.5 h-3 w-3 rounded-full ring-2 ring-white"
              style={{ background: e.color }}
            />
            <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
              <div className="flex items-center gap-1.5 mb-0.5">
                <e.Icon style={{ color: e.color, width: 10, height: 10 }} />
                <span className="text-[9.5px] font-medium uppercase tracking-wider text-slate-500">
                  {e.channel}
                </span>
                <span className="ml-auto text-[9.5px] text-slate-400">
                  {e.time}
                </span>
              </div>
              <p className="text-[11.5px] text-[#0F2A4A] leading-snug">{e.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* — Row 3 visual: collaboration (assign + mention + private note) — */
function CollaborationVisual() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-[#0F2A4A]">Conversation #4421</p>
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-1.5 py-0.5">
            <span className="h-1 w-1 rounded-full bg-emerald-500" />
            Active
          </span>
        </div>
        <div className="flex -space-x-2">
          {[47, 32, 12].map((i) => (
            <img
              key={i}
              src={`https://i.pravatar.cc/40?img=${i}`}
              alt=""
              className="h-7 w-7 rounded-full ring-2 ring-white object-cover"
              loading="lazy"
            />
          ))}
          <span className="h-7 w-7 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-[9px] font-semibold text-slate-600">
            +4
          </span>
        </div>
      </div>

      {/* Mention */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/40 px-3 py-2.5">
        <div className="flex items-start gap-2">
          <img
            src="https://i.pravatar.cc/40?img=32"
            alt=""
            className="h-6 w-6 rounded-full object-cover"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <p className="text-[10.5px] text-[#0F2A4A]">
              <span className="font-semibold">Sarah K.</span>{" "}
              <span className="bg-[#3B82F6]/10 text-[#1D4ED8] font-medium px-1 rounded">
                @marcus
              </span>{" "}
              can you take this one? VIP customer.
            </p>
            <p className="text-[9px] text-slate-400 mt-0.5">2 minutes ago</p>
          </div>
        </div>
      </div>

      {/* Private note */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/60 px-3 py-2.5">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="h-5 w-5 rounded bg-amber-200 flex items-center justify-center">
            <AtSign className="h-2.5 w-2.5 text-amber-800" />
          </div>
          <p className="text-[10px] font-semibold text-amber-800 uppercase tracking-wider">
            Private note · not visible to customer
          </p>
        </div>
        <p className="text-[11px] text-amber-900 leading-snug">
          Order ships tomorrow per warehouse. Ping with tracking link by EOD.
        </p>
      </div>

      {/* Activity */}
      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 space-y-1.5">
        {[
          { name: "Sarah K.", action: "assigned to Marcus W.", time: "2m" },
          { name: "Marcus W.", action: "added tag VIP", time: "1m" },
          { name: "Marcus W.", action: "set priority High", time: "30s" },
        ].map((a, i) => (
          <div key={i} className="flex items-center gap-2 text-[10.5px]">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
            <span className="font-medium text-[#0F2A4A]">{a.name}</span>
            <span className="text-slate-500 truncate">{a.action}</span>
            <span className="ml-auto text-[9px] text-slate-400">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* — Row 4 visual: smart routing rule — */
function RoutingVisual() {
  const conditions = [
    { Icon: Tag, label: "Channel = WhatsApp", color: "#25D366" },
    { Icon: AtSign, label: "Language = English", color: "#3B82F6" },
    { Icon: Clock, label: "Hours 9am-5pm ET", color: "#7C3AED" },
  ]
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md">
            <Workflow className="h-3.5 w-3.5 text-white" />
          </div>
          <p className="text-sm font-semibold text-[#0F2A4A]">Auto-routing rule</p>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
          <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
          On
        </span>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          When all match
        </p>
        {conditions.map((c, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2.5 py-1.5"
          >
            <div
              className="h-5 w-5 rounded flex items-center justify-center shrink-0"
              style={{ background: `${c.color}15` }}
            >
              <c.Icon style={{ color: c.color }} className="h-3 w-3" />
            </div>
            <span className="text-[11px] font-medium text-[#0F2A4A]">{c.label}</span>
          </div>
        ))}
      </div>

      {/* Arrow + Outcome */}
      <div className="flex items-center justify-center gap-1.5 text-slate-400">
        <span className="h-px w-6 bg-slate-300" />
        <ArrowRight className="h-3 w-3" />
        <span className="h-px w-6 bg-slate-300" />
      </div>

      <div className="rounded-xl border border-[#3B82F6]/20 bg-gradient-to-br from-[#EAF2FF] to-[#F5F9FF] p-3">
        <p className="text-[10px] uppercase tracking-wider text-[#1D4ED8] font-semibold mb-2">
          Assign to
        </p>
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40?img=32"
            alt="Sarah K."
            className="h-7 w-7 rounded-full ring-2 ring-white object-cover"
            loading="lazy"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-[#0F2A4A]">Sarah K.</p>
            <p className="text-[9px] text-slate-500">Round-robin · US team</p>
          </div>
          <span className="text-[9px] text-slate-400">
            Avg <span className="font-medium text-[#0F2A4A]">1m 42s</span>
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Channel hub & spoke (10 channels around an inbox)
─────────────────────────────────────────────────────────────── */

const hubChannels: {
  Icon: IconCmp
  label: string
  available: string
  color: string
  x: string
  y: string
}[] = [
  { Icon: Inbox, label: "Live Chat", available: "Free", color: "#3B82F6", x: "50%", y: "6%" },
  { Icon: FaWhatsapp, label: "WhatsApp", available: "Free", color: "#25D366", x: "78%", y: "13%" },
  { Icon: FaEnvelope, label: "Email", available: "Free", color: "#EA4335", x: "94%", y: "35%" },
  { Icon: FaInstagram, label: "Instagram", available: "Starter", color: "#E1306C", x: "94%", y: "65%" },
  { Icon: FaFacebookMessenger, label: "Messenger", available: "Starter", color: "#0084FF", x: "78%", y: "87%" },
  { Icon: FaTelegram, label: "Telegram", available: "Starter", color: "#26A5E4", x: "50%", y: "94%" },
  { Icon: FaLine, label: "Line", available: "Starter", color: "#06C755", x: "22%", y: "87%" },
  { Icon: FaTiktok, label: "TikTok", available: "Starter", color: "#0F0F0F", x: "6%", y: "65%" },
  { Icon: Sparkles, label: "SMS", available: "Starter", color: "#7C3AED", x: "6%", y: "35%" },
  { Icon: Mic, label: "Voice", available: "Starter", color: "#0EA5E9", x: "22%", y: "13%" },
]

function ChannelsHub() {
  return (
    <div className="relative h-[440px] sm:h-[480px] rounded-3xl border border-slate-200/80 bg-white p-4 overflow-hidden">
      {/* ambient blob */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 w-64 h-64 rounded-full blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.35), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(165,243,252,0.4), transparent 70%)",
        }}
      />

      {/* Spokes */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        {hubChannels.map((c, i) => (
          <line
            key={i}
            x1="50%"
            y1="50%"
            x2={c.x}
            y2={c.y}
            stroke="#cbd5e1"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
        ))}
      </svg>

      {/* Center hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative">
          <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-[0_20px_40px_-15px_rgba(59,130,246,0.55)]">
            <Inbox className="h-9 w-9 text-white" />
          </div>
          <div className="absolute inset-0 rounded-3xl bg-[#3B82F6]/30 blur-2xl -z-10 animate-pulse" />
        </div>
        <p className="mt-3 text-center text-[11px] font-semibold text-[#0F2A4A]">
          FloatChat Inbox
        </p>
      </div>

      {/* Channel nodes */}
      {hubChannels.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
          style={{ left: c.x, top: c.y }}
        >
          <div className="h-11 w-11 rounded-2xl bg-white border border-slate-200 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)] flex items-center justify-center">
            <c.Icon style={{ color: c.color, width: 18, height: 18 }} />
          </div>
          <span className="text-[10px] font-medium text-[#0F2A4A] whitespace-nowrap">
            {c.label}
          </span>
          <span
            className={`text-[8.5px] font-medium uppercase tracking-wider px-1 rounded ${
              c.available === "Free"
                ? "text-emerald-700 bg-emerald-50"
                : "text-slate-500 bg-slate-100"
            }`}
          >
            {c.available}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQ items — preserved from current page
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Are all 10 channels really included?",
    answer:
      "Yes, on Starter and above. Voice and SMS still need phone numbers (paid add-ons) and per-minute or per-segment usage. WhatsApp is two-way only. No Business API marketing.",
  },
  {
    question: "How many agents can I add?",
    answer:
      "Free and Lite are 1 agent each. Starter 3, Growth 10, Pro 25, Enterprise 100. Extra agent: $12/month flat.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "No. FloatChat is web-only. Works in mobile browsers but no iOS/Android app.",
  },
  {
    question: "Can I customize the agent dashboard?",
    answer:
      "Yes. Custom views, filters, columns. Each agent saves their own setup.",
  },
]

const checklistItems = [
  "Tags, custom attributes, custom views",
  "Macros and canned responses",
  "Auto-assignment and round-robin (Growth)",
  "SSO + RBAC + audit logs (Pro)",
  "Working hours per inbox",
  "Profanity filter, agent signatures",
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function InboxPage() {
  useEffect(() => {
    document.title = "Shared Inbox Software. 10 Channels in One | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc)
      desc.setAttribute(
        "content",
        "Live chat, email, WhatsApp, voice, SMS, Instagram, Messenger, Telegram, Line, TikTok in one shared inbox. From $19.99/month for 3 agents.",
      )
  }, [])

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* ───── HERO ───── */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-[#F8FAFF] to-[#FFFFFF]">
          {/* Mesh blobs */}
          <div className="absolute inset-0 -z-20 pointer-events-none" aria-hidden="true">
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] rounded-full blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, #BFD4FF 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-10 -left-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, #A8C8FF 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-20 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, #A8E6F7 0%, transparent 70%)",
              }}
            />
          </div>
          <div
            className="absolute inset-0 -z-10 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(15,42,74,0.08) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 95%)",
            }}
            aria-hidden="true"
          />

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left content */}
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1B6BFF]/5 px-4 py-1.5 text-xs font-medium text-[#1B6BFF]"
                >
                  <Inbox className="h-3.5 w-3.5" />
                  Shared Inbox · 10 channels, 1 screen
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]"
                >
                  Ten channels.
                  <br />
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    One shared inbox.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Live chat, email, WhatsApp, voice, SMS, Instagram, Messenger,
                  Telegram, Line, and TikTok. Your team handles them all from one
                  screen.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "10 channels",
                    "Built for US teams",
                    "Capacity pricing",
                    "99.9% uptime",
                  ].map((b) => (
                    <span key={b} className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#1B6BFF]" />
                      {b}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-7 flex flex-col sm:flex-row items-start sm:items-center gap-3"
                >
                  <div className="relative">
                    <div
                      className="absolute inset-0 -z-10 rounded-full blur-xl opacity-70"
                      style={{
                        background:
                          "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
                      }}
                    />
                    <Link
                      to="/signup?plan=free"
                      className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] ring-4 ring-[#3B82F6]/15 transition-all"
                    >
                      Start Free
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={2.5}
                      />
                    </Link>
                  </div>
                  <Link
                    to="/demo"
                    className="inline-flex items-center justify-center h-12 px-7 rounded-full text-[15px] font-medium border border-slate-300 bg-white text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                  >
                    Book a Demo
                  </Link>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-4 text-sm text-slate-500"
                >
                  Starter plan unlocks all 10 channels at $19.99/month for 3 agents.
                </motion.p>
              </div>

              {/* Right interactive mockup */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7"
              >
                <MultiChannelInboxMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── WHY ONE INBOX — alternating feature rows ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#EEF2FF] via-white to-[#F5F7FF] overflow-hidden">
          <div
            className="absolute inset-0 -z-10 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(15,42,74,0.07) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage:
                "radial-gradient(ellipse 75% 60% at 50% 50%, black 30%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 75% 60% at 50% 50%, black 30%, transparent 95%)",
            }}
            aria-hidden="true"
          />

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-16">
              <BlurFade>
                <SectionEyebrow num="01" label="Why one inbox" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Why one inbox matters.
                </h2>
              </BlurFade>
            </div>

            <div className="space-y-20 lg:space-y-24">
              <BlurFade>
                <FeatureRow
                  imageFirst
                  num="01"
                  eyebrow="App-switching"
                  title="No more app-switching."
                  body="Stop bouncing between WATI, Help Scout, Twilio Console, and Gmail. Everything lands in one place."
                  visual={<AppChaosVisual />}
                />
              </BlurFade>
              <BlurFade>
                <FeatureRow
                  num="02"
                  eyebrow="Customer 360"
                  title="One customer profile."
                  body="See every conversation that customer has had with you, across every channel, in one timeline."
                  visual={<CustomerProfileVisual />}
                />
              </BlurFade>
              <BlurFade>
                <FeatureRow
                  imageFirst
                  num="03"
                  eyebrow="Collaboration"
                  title="Team collaboration."
                  body="Assign, mention, leave private notes, swap conversations. Your team operates as one unit."
                  visual={<CollaborationVisual />}
                />
              </BlurFade>
              <BlurFade>
                <FeatureRow
                  num="04"
                  eyebrow="Routing"
                  title="Smart routing."
                  body="Auto-assign by channel, language, tag, or business hours. Round-robin on Growth and above."
                  visual={<RoutingVisual />}
                />
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── ALL 10 CHANNELS — hub & spoke ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="02" label="The 10" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  All ten{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    channels.
                  </span>
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Free includes the three big ones. Starter unlocks the rest — same
                  inbox, same workflow.
                </p>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <BlurFade delay={0.1} className="lg:col-span-8">
                <ChannelsHub />
              </BlurFade>

              {/* Pull-quote — $19.99 */}
              <BlurFade delay={0.2} className="lg:col-span-4">
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-8 text-white overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
                  <div className="relative">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60">
                      Starter
                    </p>
                    <p className="mt-4 text-6xl lg:text-7xl font-medium tracking-tight">
                      $19
                      <span className="text-3xl lg:text-4xl text-white/70">.99</span>
                    </p>
                    <p className="mt-3 text-sm text-white/80 leading-relaxed">
                      All 10 channels for 3 agents. No per-channel add-ons.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur px-3 py-1.5 text-[11px] font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Switch from Free in one click
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── BUILT FOR SUPPORT TEAMS — compact checklist card ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
              <BlurFade className="col-span-12 lg:col-span-5">
                <SectionEyebrow num="03" label="For support teams" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Built for{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    support teams.
                  </span>
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Every dial your team needs to scale — from a single shared inbox to
                  enterprise audit trails.
                </p>
              </BlurFade>

              <BlurFade delay={0.15} className="col-span-12 lg:col-span-7">
                <div className="rounded-3xl border border-slate-200 bg-white p-7 lg:p-8 shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]">
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                    {checklistItems.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.35, delay: i * 0.06 }}
                        className="flex items-start gap-2.5"
                      >
                        <span className="mt-0.5 h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0 shadow-sm shadow-[#3B82F6]/40">
                          <Check
                            className="h-3 w-3 text-white"
                            strokeWidth={3}
                          />
                        </span>
                        <span className="text-sm text-[#0F2A4A] leading-relaxed">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── COMPARISON ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="04" label="At 10 agents" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Platform comparison.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Apples-to-apples at 10 seats. From each vendor's published pricing.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                          Platform
                        </th>
                        <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                          10 channels at 10 agents
                        </th>
                        <th className="text-right p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                          Monthly cost
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "Intercom 10 seats Essential",
                          channels: "6 channels",
                          total: "$290",
                        },
                        {
                          name: "Zendesk Suite Pro 10 seats",
                          channels: "8 channels",
                          total: "$1,150",
                        },
                        {
                          name: "Freshchat Pro 10 seats",
                          channels: "7 channels",
                          total: "$490",
                        },
                      ].map((row) => (
                        <tr
                          key={row.name}
                          className="border-b border-slate-100 hover:bg-slate-50/40 transition-colors"
                        >
                          <td className="p-4 font-medium text-[#0F2A4A]">
                            {row.name}
                          </td>
                          <td className="p-4 text-slate-500">{row.channels}</td>
                          <td className="p-4 text-right font-semibold text-[#0F2A4A]">
                            {row.total}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gradient-to-r from-[#EAF2FF] to-[#F5F9FF]">
                        <td className="p-4 font-semibold text-[#1D4ED8] flex items-center gap-2">
                          <Sparkles className="h-4 w-4" />
                          FloatChat Growth
                        </td>
                        <td className="p-4 text-[#1D4ED8] font-medium">
                          10 channels
                        </td>
                        <td className="p-4 text-right font-bold text-[#1D4ED8]">
                          $69
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Get all 10 channels in one inbox"
          body="WhatsApp, email, voice, SMS, Instagram, and more — unified."
          primaryLabel="Try Starter"
          primaryHref="/signup?plan=starter"
          secondaryLabel="See pricing"
          secondaryHref="/pricing"
        />

        {/* ───── TESTIMONIALS — homepage ───── */}
        <Testimonials />

        {/* ───── FAQ ───── */}
        <section
          id="faq"
          className="py-24 lg:py-32 bg-gradient-to-b from-white to-[#EEF2FF]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="Common questions"
              description="Channels, agents, customization — straight answers."
              footer={
                <p className="text-sm text-muted-foreground">
                  More questions?{" "}
                  <Link
                    to="/contact"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Talk to us
                  </Link>{" "}
                  or check the{" "}
                  <Link
                    to="/help"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Help Center
                  </Link>
                  .
                </p>
              }
            />
          </div>
        </section>

        {/* ───── FINAL CTA ───── */}
        <section className="relative overflow-hidden bg-white py-24 lg:py-32">
          <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl px-6 sm:px-10 py-14 lg:py-20 text-center overflow-hidden"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(237,233,254,0.65) 35%, rgba(219,234,254,0.55) 65%, rgba(207,250,254,0.6) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #A5F3FC 20%, #93C5FD 40%, #C4B5FD 60%, #F0ABFC 80%, transparent)",
                }}
              />
              <div
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(147,197,253,0.35), rgba(196,181,253,0.18) 50%, transparent 75%)",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-32 -right-20 w-[460px] h-[380px] opacity-50"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(240,171,252,0.35), transparent 70%)",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-24 -left-16 w-[400px] h-[340px] opacity-50"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(165,243,252,0.4), transparent 70%)",
                }}
                aria-hidden="true"
              />

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[11px] font-medium text-[#0F2A4A]">
                  10 channels firing into one screen
                </span>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-[11px] text-slate-500">avg reply 2m</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="relative inline-flex items-center gap-2 mb-5"
              >
                <span className="text-[11px] font-mono text-slate-400">/ START</span>
                <span className="h-px w-8 bg-slate-300" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#3B82F6]">
                  Free forever to start
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Try the inbox{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] via-50% to-[#8B5CF6] bg-clip-text text-transparent">
                  free.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Upgrade to Starter ($19.99) when you need all 10 channels.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
              >
                <Link
                  to="/signup?plan=free"
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] text-[15px] font-medium text-white hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] hover:scale-[1.02] transition-all duration-300"
                >
                  <Sparkles className="h-4 w-4" />
                  Start Free
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-slate-300 bg-white text-[15px] font-medium text-[#0F2A4A] hover:bg-slate-50 hover:border-slate-400 hover:scale-[1.02] transition-all duration-300"
                >
                  Book a Demo
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm px-6 py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] font-medium text-slate-600"
            >
              {[
                "10 channels on Starter",
                "Capacity pricing",
                "DigitalOcean NYC3",
                "99.9% uptime",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
