import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Inbox, Bot, Phone, Users, MessageSquare, Zap, ArrowRight, ArrowUpRight,
  Search, Filter, Send, Star, Paperclip, Sparkles, CheckCircle2,
  PhoneIncoming, Mic, MoreVertical,
} from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import { FaWhatsapp, FaEnvelope, FaInstagram, FaFacebookMessenger, FaSlack, FaShopify } from "react-icons/fa"

/* ─────────────────────────────────────────────────────────────
   HERO CARD — full inbox dashboard mockup (3 panes)
─────────────────────────────────────────────────────────────── */

function InboxDashboard() {
  const [showAI, setShowAI] = useState(false)
  useEffect(() => {
    setShowAI(false)
    const t = setTimeout(() => setShowAI(true), 2400)
    const cycle = setInterval(() => {
      setShowAI(false)
      setTimeout(() => setShowAI(true), 2200)
    }, 6000)
    return () => { clearTimeout(t); clearInterval(cycle) }
  }, [])

  const navSections = [
    {
      label: "Conversations",
      items: [
        { name: "All Conversations", count: 142, active: true },
        { name: "Mentions", count: 4 },
        { name: "Participating", count: 12 },
        { name: "Unattended", count: 7 },
      ],
    },
  ]

  const channels = [
    { Icon: MessageSquare, label: "Live Chat" },
    { Icon: FaWhatsapp,    label: "WhatsApp"  },
    { Icon: FaEnvelope,    label: "Email"     },
  ]

  const labels = [
    { color: "#10B981", name: "support"  },
    { color: "#F59E0B", name: "billing"  },
    { color: "#EF4444", name: "urgent"   },
  ]

  const threads = [
    { name: "Jessica Chen",      preview: "Is my order #4421 shipped yet?", time: "2m",  channel: "WhatsApp",  color: "#25D366", unread: 2, active: true,  avatar: "https://i.pravatar.cc/80?img=47" },
    { name: "Marcus Williams",   preview: "Subscription renewal question",  time: "5m",  channel: "Email",     color: "#EA4335", unread: 1,               avatar: "https://i.pravatar.cc/80?img=12" },
    { name: "Ashley Rodriguez",  preview: "Hi! Can you help me with…",      time: "12m", channel: "Instagram", color: "#E1306C",                          avatar: "https://i.pravatar.cc/80?img=44" },
    { name: "Tyler Brooks",      preview: "Thanks for the quick reply!",    time: "1h",  channel: "Messenger", color: "#0084FF",                          avatar: "https://i.pravatar.cc/80?img=15" },
    { name: "Megan O'Connor",    preview: "Refund processed?",              time: "3h",  channel: "Email",     color: "#EA4335",                          avatar: "https://i.pravatar.cc/80?img=49" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="relative rounded-xl border border-slate-200 bg-white shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] overflow-hidden transition-shadow hover:shadow-[0_40px_80px_-30px_rgba(15,42,74,0.35)]"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <div className="ml-3 flex items-center gap-1.5 text-[10px] text-slate-400">
          <span className="font-mono">app.floatchat.com</span>
        </div>
      </div>

      <div className="grid grid-cols-12 min-h-[420px]">
        {/* Workspace sidebar */}
        <aside className="col-span-3 border-r border-slate-200 bg-slate-50/60 flex flex-col">
          {/* Workspace header */}
          <div className="px-3 py-2.5 border-b border-slate-200 flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
              <MessageSquare className="h-3 w-3 text-white" />
            </div>
            <span className="text-[11px] font-semibold text-[#0F2A4A]">FloatChat</span>
          </div>

          {/* Search */}
          <div className="px-3 pt-2.5">
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-md px-2 py-1">
              <Search className="h-3 w-3 text-slate-400" />
              <span className="text-[10px] text-slate-400">Search…</span>
            </div>
          </div>

          <div className="flex-1 px-2 py-2 space-y-3 overflow-hidden">
            <div className="space-y-0.5">
              <div className="px-2 flex items-center gap-1.5 text-[11px] text-[#0F2A4A] font-medium py-1">
                <Inbox className="h-3.5 w-3.5" /> My Inbox
              </div>
            </div>

            {navSections.map((section) => (
              <div key={section.label} className="space-y-0.5">
                <div className="px-2 py-1 text-[9px] uppercase tracking-wider text-slate-400 font-medium">
                  {section.label}
                </div>
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className={`flex items-center justify-between gap-2 px-2 py-1.5 rounded-md text-[11px] cursor-pointer ${
                      item.active ? "bg-[#3B82F6]/10 text-[#1D4ED8] font-medium" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span className="truncate">{item.name}</span>
                    <span className={`text-[9px] ${item.active ? "text-[#1D4ED8]" : "text-slate-400"}`}>{item.count}</span>
                  </div>
                ))}
              </div>
            ))}

            <div className="space-y-0.5">
              <div className="px-2 py-1 text-[9px] uppercase tracking-wider text-slate-400 font-medium">
                Channels
              </div>
              {channels.map((c) => (
                <div key={c.label} className="flex items-center gap-2 px-2 py-1 rounded-md text-[11px] text-slate-600 hover:bg-slate-100 cursor-pointer">
                  <c.Icon className="h-3 w-3" />
                  <span className="truncate">{c.label}</span>
                </div>
              ))}
            </div>

            <div className="space-y-0.5">
              <div className="px-2 py-1 text-[9px] uppercase tracking-wider text-slate-400 font-medium">
                Labels
              </div>
              {labels.map((l) => (
                <div key={l.name} className="flex items-center gap-2 px-2 py-1 rounded-md text-[11px] text-slate-600 hover:bg-slate-100 cursor-pointer">
                  <span className="h-2 w-2 rounded-full" style={{ background: l.color }} />
                  <span className="truncate">{l.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Agent footer */}
          <div className="px-3 py-2 border-t border-slate-200 flex items-center gap-2">
            <div className="relative">
              <img src="https://i.pravatar.cc/60?img=32" alt="Sarah Kim" loading="lazy" className="h-6 w-6 rounded-full object-cover" />
              <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-1 ring-white">
                <motion.span
                  className="absolute inset-0 rounded-full bg-emerald-500"
                  animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-medium text-[#0F2A4A] truncate leading-tight">Sarah Kim</p>
              <p className="text-[9px] text-slate-400 truncate">support@floatchat.com</p>
            </div>
          </div>
        </aside>

        {/* Thread list */}
        <section className="col-span-4 border-r border-slate-200 flex flex-col">
          <div className="px-3 py-2.5 border-b border-slate-200">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] font-semibold text-[#0F2A4A]">Conversations</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">Open</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Filter className="h-3 w-3" />
                <MoreVertical className="h-3 w-3" />
              </div>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="text-[#1D4ED8] font-medium border-b border-[#1D4ED8] pb-0.5">Mine <span className="text-[9px] text-slate-400 ml-0.5">5</span></span>
              <span className="text-slate-500">Unassigned <span className="text-[9px] text-slate-400 ml-0.5">3</span></span>
              <span className="text-slate-500">All <span className="text-[9px] text-slate-400 ml-0.5">{threads.length}</span></span>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            {threads.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 2 }}
                className={`flex items-start gap-2 px-3 py-2.5 border-b border-slate-100 cursor-pointer ${
                  t.active ? "bg-[#3B82F6]/5 border-l-2 border-l-[#3B82F6]" : "hover:bg-slate-50"
                }`}
              >
                <div className="relative shrink-0">
                  <img src={t.avatar} alt={t.name} loading="lazy" className="h-7 w-7 rounded-full object-cover ring-2 ring-white" />
                  <span
                    className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-1 ring-white"
                    style={{ background: t.color }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-[11px] font-medium text-[#0F2A4A] truncate">{t.name}</p>
                    <span className="text-[9px] text-slate-400">{t.time}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 truncate">{t.preview}</p>
                </div>
                {t.unread && (
                  <motion.span
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="h-4 min-w-[16px] px-1 rounded-full bg-[#3B82F6] text-[9px] font-medium text-white flex items-center justify-center"
                  >
                    {t.unread}
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Active conversation */}
        <section className="col-span-5 flex flex-col bg-white">
          {/* Header */}
          <div className="px-4 py-2 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <img src="https://i.pravatar.cc/80?img=47" alt="Jessica Chen" loading="lazy" className="h-7 w-7 rounded-full object-cover" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#25D366] ring-1 ring-white">
                  <motion.span
                    className="absolute inset-0 rounded-full bg-[#25D366]"
                    animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  />
                </span>
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#0F2A4A] leading-tight">Jessica Chen</p>
                <p className="text-[9px] text-emerald-600">● online · WhatsApp · Brooklyn, NY</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="text-[10px] font-medium border border-slate-200 rounded-md px-2 py-1 text-[#0F2A4A] hover:bg-slate-50">Resolve</button>
              <Star className="h-3.5 w-3.5 text-slate-400" />
              <MoreVertical className="h-3.5 w-3.5 text-slate-400" />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 px-3 py-3 space-y-2 bg-slate-50/40 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex justify-start"
            >
              <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[85%] shadow-sm">
                <p className="text-[10.5px] text-[#0F2A4A]">Hi! Is my order #4421 shipped yet? I ordered last Tuesday.</p>
                <p className="text-[8px] text-slate-400 mt-0.5">9:41 AM</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="flex justify-end"
            >
              <div className="bg-[#3B82F6] rounded-xl rounded-br-sm px-2.5 py-1.5 max-w-[85%] shadow-sm">
                <p className="text-[10.5px] text-white">Let me check that for you, Jessica — one moment!</p>
                <p className="text-[8px] text-white/70 mt-0.5 text-right">9:42 AM</p>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {!showAI ? (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-start gap-1.5"
                >
                  <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                    <Sparkles className="h-2.5 w-2.5 text-white" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5">
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]"
                          animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15, ease: "easeInOut" }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="reply"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-1.5"
                >
                  <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                    <Sparkles className="h-2.5 w-2.5 text-white" />
                  </div>
                  <div className="bg-[#EAF2FF] border border-[#3B82F6]/20 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[80%]">
                    <p className="text-[9px] text-[#1D4ED8] font-medium mb-0.5">Captain AI · suggested reply</p>
                    <p className="text-[10.5px] text-[#0F2A4A]">Hi Jessica! Order #4421 ships tomorrow morning via UPS. Tracking: 1Z999AA10123456784</p>
                    <div className="flex items-center gap-1.5 mt-1.5 pt-1.5 border-t border-[#3B82F6]/10">
                      <button className="text-[9px] font-medium bg-[#3B82F6] text-white px-2 py-0.5 rounded hover:bg-[#1D4ED8] transition-colors">Send</button>
                      <button className="text-[9px] text-slate-500">Edit</button>
                      <span className="ml-auto text-[8px] text-emerald-600 flex items-center gap-0.5">
                        <CheckCircle2 className="h-2.5 w-2.5" /> 98% match
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Reply composer */}
          <div className="border-t border-slate-200 bg-white">
            <div className="px-3 pt-2 flex items-center gap-2 text-[10px]">
              <span className="text-[#1D4ED8] font-medium border-b border-[#1D4ED8] pb-1">Reply</span>
              <span className="text-slate-500 pb-1">Private Note</span>
            </div>
            <div className="px-3 py-2">
              <div className="bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5">
                <span className="text-[10px] text-slate-400">Shift + enter for new line. Start with '/' for canned response.</span>
              </div>
            </div>
            <div className="px-3 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400">
                <Paperclip className="h-3.5 w-3.5" />
                <Mic className="h-3.5 w-3.5" />
                <Sparkles className="h-3.5 w-3.5 text-[#3B82F6]" />
              </div>
              <button className="inline-flex items-center gap-1 text-[10px] font-medium bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white px-2.5 py-1 rounded-md">
                <Send className="h-3 w-3" /> Send
              </button>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   AI — browser-style window with confident reply
─────────────────────────────────────────────────────────────── */

function AIPreview() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 4), 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-[0_18px_40px_-20px_rgba(15,42,74,0.22)]">
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-slate-200 bg-slate-50">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
        <span className="ml-2 text-[8px] font-mono text-slate-400">captain.ai</span>
      </div>
      <div className="p-3 space-y-2 min-h-[140px]">
        <div className="flex justify-end">
          <div className="bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] text-white rounded-xl rounded-tr-sm px-2.5 py-1.5 max-w-[75%] text-[10px] shadow-md shadow-[#3B82F6]/30">
            How do I get a refund?
          </div>
        </div>
        {phase >= 1 && (
          <div className="flex items-start gap-1.5">
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
              <Sparkles className="h-2.5 w-2.5 text-white" />
            </div>
            {phase === 1 ? (
              <div className="flex gap-1 bg-slate-100 rounded-full px-2.5 py-1.5">
                {[0, 150, 300].map((d) => (
                  <span key={d} className="h-1 w-1 rounded-full bg-[#3B82F6] animate-bounce" style={{ animationDelay: `${d}ms` }} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[75%] text-[10px] text-[#0F2A4A] shadow-sm">
                Refunds are processed within 3–5 business days to your original payment method.
              </div>
            )}
          </div>
        )}
        {phase >= 3 && (
          <div className="flex items-center gap-1.5 pl-7">
            <CheckCircle2 className="h-3 w-3 text-emerald-500" />
            <span className="text-[9px] font-medium text-emerald-600">Resolved · 98% confidence</span>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   VOICE — incoming call mockup
─────────────────────────────────────────────────────────────── */

function VoiceCallCard() {
  return (
    <div className="relative rounded-xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-4 text-white shadow-[0_18px_40px_-18px_rgba(29,78,216,0.55)] overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
      <div className="relative flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
          <PhoneIncoming className="h-4 w-4 text-white animate-pulse" />
        </div>
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-wider text-white/60">Incoming · Live Chat</p>
          <p className="text-[13px] font-medium">+1 (415) 555-0142</p>
        </div>
      </div>
      <div className="relative mt-3 flex items-center gap-1 h-8">
        {[3, 5, 8, 6, 10, 7, 9, 5, 11, 4, 8, 6, 9, 5].map((h, i) => (
          <span
            key={i}
            className="w-1 rounded-full bg-white/80"
            style={{
              height: `${h * 2.5}px`,
              animation: "voice-bar 1s ease-in-out infinite",
              animationDelay: `${i * 60}ms`,
            }}
          />
        ))}
      </div>
      <div className="relative mt-3 flex items-center justify-between">
        <span className="text-[10px] text-white/70">00:23</span>
        <div className="flex items-center gap-1.5">
          <span className="h-6 w-6 rounded-full bg-white/15 flex items-center justify-center">
            <Mic className="h-3 w-3" />
          </span>
          <span className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center">
            <Phone className="h-3 w-3 rotate-[135deg]" />
          </span>
        </div>
      </div>
      <style>{`
        @keyframes voice-bar {
          0%,100% { transform: scaleY(0.4); opacity: 0.7; }
          50%      { transform: scaleY(1);   opacity: 1;   }
        }
      `}</style>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   CAPACITY — pricing slider
─────────────────────────────────────────────────────────────── */

function CapacitySlider() {
  const plans = [
    { name: "Free Forever", price: 0,      tag: "Free",        feature: "Unlimited live chat + agents"  },
    { name: "Branded-Off",  price: 9.99,   tag: "$9.99",       feature: "Remove branding + 100 AI/mo"   },
    { name: "AI Starter",   price: 19.99,  tag: "$19.99",      feature: "1,000 AI replies + 10 channels" },
    { name: "AI Growth",    price: 49,     tag: "$49",         feature: "5,000 AI + 500 voice mins"     },
    { name: "AI Pro",       price: 129,    tag: "$129",        feature: "25,000 AI + SSO + audit logs"  },
    { name: "Enterprise",   price: 499,    tag: "$499",        feature: "Unlimited AI + SOC 2 + HIPAA"  },
  ]
  const [idx, setIdx] = useState(2)
  const plan = plans[idx]
  const percent = (idx / (plans.length - 1)) * 100

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_18px_40px_-20px_rgba(15,42,74,0.18)]">
      <div className="flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-medium text-[#1D4ED8] truncate">{plan.name}</p>
          <p className="text-[10px] text-slate-500 truncate mt-0.5">{plan.feature}</p>
        </div>
        <p className="text-2xl font-medium text-[#0F2A4A] tracking-tight shrink-0">
          {plan.price === 0 ? "Free" : <>${plan.price}<span className="text-[10px] font-normal text-slate-400">/mo</span></>}
        </p>
      </div>

      <div className="mt-4 relative">
        {/* Track */}
        <div className="relative h-1.5 rounded-full bg-slate-100">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8]"
            style={{ width: `${percent}%` }}
          />
          {/* Tick marks */}
          {plans.map((_, i) => (
            <span
              key={i}
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full ${
                i <= idx ? "bg-white shadow-sm" : "bg-slate-300"
              }`}
              style={{ left: `${(i / (plans.length - 1)) * 100}%` }}
            />
          ))}
          {/* Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-white border-2 border-[#3B82F6] shadow-md pointer-events-none transition-[left] duration-150"
            style={{ left: `${percent}%` }}
          />
        </div>
        {/* Real draggable range input (invisible, overlays track) */}
        <input
          type="range"
          min={0}
          max={plans.length - 1}
          step={1}
          value={idx}
          onChange={(e) => setIdx(Number(e.target.value))}
          aria-label="Plan tier"
          className="absolute inset-0 w-full h-6 -top-2 opacity-0 cursor-pointer"
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-1">
        {plans.map((p, i) => (
          <button
            key={p.name}
            onClick={() => setIdx(i)}
            className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md transition-colors ${
              idx === i ? "bg-[#3B82F6]/10 text-[#1D4ED8]" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {p.tag}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   CHANNELS — hub & spoke
─────────────────────────────────────────────────────────────── */

function ChannelsHub() {
  const items = [
    { Icon: FaWhatsapp,         color: "#25D366", x: "10%",  y: "12%" },
    { Icon: FaInstagram,        color: "#E1306C", x: "85%",  y: "12%" },
    { Icon: FaEnvelope,         color: "#EA4335", x: "10%",  y: "55%" },
    { Icon: FaFacebookMessenger,color: "#0084FF", x: "85%",  y: "55%" },
    { Icon: FaSlack,            color: "#4A154B", x: "30%",  y: "85%" },
    { Icon: FaShopify,          color: "#95BF47", x: "65%",  y: "85%" },
  ]
  return (
    <div className="relative h-[170px]">
      {/* center hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-lg shadow-[#3B82F6]/40">
          <Inbox className="h-5 w-5 text-white" />
        </div>
        <div className="absolute inset-0 rounded-2xl bg-[#3B82F6]/30 blur-xl -z-10 animate-pulse" />
      </div>

      {/* spokes */}
      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        {items.map((it, i) => (
          <line
            key={i}
            x1="50%" y1="50%"
            x2={it.x} y2={it.y}
            stroke="#cbd5e1"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
        ))}
      </svg>

      {/* nodes */}
      {items.map((it, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2 h-9 w-9 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center"
          style={{ left: it.x, top: it.y }}
        >
          <it.Icon style={{ color: it.color, width: 14, height: 14 }} />
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   AUTOMATION — flow with traveling particle
─────────────────────────────────────────────────────────────── */

function AutomationFlow() {
  const nodes = [
    { label: "Trigger",   sub: "New message",  dot: "bg-amber-400",   ring: "ring-amber-200" },
    { label: "Condition", sub: "After hours?", dot: "bg-[#3B82F6]",   ring: "ring-[#3B82F6]/30" },
    { label: "Action",    sub: "Auto Reply",   dot: "bg-emerald-500", ring: "ring-emerald-200" },
  ]
  return (
    <div className="rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-3 sm:p-4 overflow-hidden">
      <div className="flex flex-col gap-1.5">
        {nodes.map((n, i) => (
          <div key={i}>
            <div className={`rounded-lg border border-slate-200 bg-white px-2.5 py-2 shadow-[0_4px_12px_-6px_rgba(15,42,74,0.18)] ring-1 ${n.ring}`}>
              <div className="flex items-center gap-2 min-w-0">
                <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${n.dot}`} />
                <p className="text-[11px] font-medium text-[#0F2A4A] truncate">{n.label}</p>
                <span className="text-[9.5px] text-slate-400 ml-auto truncate">{n.sub}</span>
              </div>
            </div>
            {i < nodes.length - 1 && (
              <div className="flex items-center justify-center py-0.5 gap-1">
                <div className="h-3 w-px bg-slate-300" style={{ borderLeft: "1px dashed #cbd5e1" }} />
                <span className="h-1 w-1 rounded-full bg-[#3B82F6] animate-pulse" />
                <div className="h-3 w-px bg-slate-300" style={{ borderLeft: "1px dashed #cbd5e1" }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[9.5px] text-slate-500 pt-3 border-t border-slate-100">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
        <span className="text-slate-300">·</span>
        <span><span className="font-medium text-[#0F2A4A]">2,341×</span> this week</span>
        <span className="text-slate-300">·</span>
        <span>Avg <span className="font-medium text-[#0F2A4A]">0.4s</span></span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   SECTION
─────────────────────────────────────────────────────────────── */

export function Features() {
  return (
    <section
      id="features"
      className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-[#EEF2FF] via-white to-[#F5F7FF]"
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-40 -left-32 w-[520px] h-[520px] rounded-full blur-3xl opacity-50"
             style={{ background: "radial-gradient(closest-side, #BFD4FF 0%, transparent 70%)" }} />
        <div className="absolute bottom-20 -right-32 w-[520px] h-[520px] rounded-full blur-3xl opacity-50"
             style={{ background: "radial-gradient(closest-side, #A8C8FF 0%, transparent 70%)" }} />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(15,42,74,0.07) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 75% 60% at 50% 50%, black 30%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 50%, black 30%, transparent 95%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Editorial header */}
        <div className="grid grid-cols-12 gap-6 items-end mb-16">
          <BlurFade delay={0} className="col-span-12 lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="text-[11px] font-mono text-slate-400">/ 06</span>
              <span className="h-px w-8 bg-slate-300" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#3B82F6]">
                Our Features
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
              Less SaaS.{" "}
              <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                More inbox.
              </span>
            </h2>
          </BlurFade>
          <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
            <p className="text-base text-slate-500 leading-relaxed">
              Everything your team needs to talk to customers — chat, email, WhatsApp, voice, and AI — running in one inbox built for US teams.
            </p>
            <Link
              to="/features"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#1D4ED8] hover:gap-2 transition-all"
            >
              Explore the platform <ArrowUpRight className="h-4 w-4" />
            </Link>
          </BlurFade>
        </div>

        {/* HERO CARD */}
        <BlurFade delay={0.2}>
          <ShowcaseCard
            tag="01 — Unified inbox"
            title="A real free inbox."
            description="Live chat, email, WhatsApp, Instagram, and Messenger — every conversation in one place. Free forever, no credit card."
            href="/inbox"
            cta="Open the inbox"
            badge={{ label: "Free forever", tone: "emerald" }}
          >
            <div className="overflow-hidden h-[185px] sm:h-[330px] lg:h-auto">
              <div className="w-[760px] origin-top-left scale-[0.4] sm:scale-[0.72] lg:scale-100 lg:w-auto">
                <InboxDashboard />
              </div>
            </div>
          </ShowcaseCard>
        </BlurFade>

        {/* GRID — 12 cols, varied widths */}
        <div className="mt-6 grid grid-cols-12 gap-6">
          <BlurFade delay={0.25} className="col-span-12 lg:col-span-7">
            <ShowcaseCard
              compact
              tag="02 — AI Captain"
              title="AI from $9.99."
              description="Auto Reply, AI Chatbot, API access, and Webhooks bundled on Lite. No per-resolution fees."
              href="/ai-agent"
              cta="Meet Captain"
              badge={{ label: "98% match", tone: "blue" }}
            >
              <AIPreview />
            </ShowcaseCard>
          </BlurFade>

          <BlurFade delay={0.3} className="col-span-12 sm:col-span-6 lg:col-span-5">
            <ShowcaseCard
              compact
              tag="03 — Voice"
              title="Voice without markup."
              description="US local numbers from $5/mo. Outbound at $0.008/min."
              href="/voice"
              cta="See Voice"
            >
              <VoiceCallCard />
            </ShowcaseCard>
          </BlurFade>

          <BlurFade delay={0.35} className="col-span-12 sm:col-span-6 lg:col-span-4">
            <ShowcaseCard
              compact
              tag="04 — Pricing"
              title="Pricing that scales."
              description="From free forever to enterprise. Drag the slider — that's your monthly bill."
              href="/pricing"
              cta="View pricing"
            >
              <CapacitySlider />
            </ShowcaseCard>
          </BlurFade>

          <BlurFade delay={0.4} className="col-span-12 sm:col-span-6 lg:col-span-4">
            <ShowcaseCard
              compact
              tag="05 — Channels"
              title="10 channels, one screen."
              description="Every channel your customers use — funneled into one shared inbox."
              href="/integrations"
              cta="Browse channels"
            >
              <ChannelsHub />
            </ShowcaseCard>
          </BlurFade>

          <BlurFade delay={0.45} className="col-span-12 lg:col-span-4">
            <ShowcaseCard
              compact
              tag="06 — Automation"
              title="Automation built in."
              description="Auto Reply rules, after-hours messages, AI Chatbot — all on Lite."
              href="/automation"
              cta="Explore automation"
            >
              <AutomationFlow />
            </ShowcaseCard>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}

/* Reusable card shell */
function ShowcaseCard({
  tag,
  title,
  description,
  href,
  cta = "Learn more",
  badge,
  compact = false,
  children,
}: {
  tag: string
  title: string
  description: string
  href: string
  cta?: string
  badge?: { label: string; tone: "emerald" | "blue" | "amber" }
  compact?: boolean
  children: React.ReactNode
}) {
  const toneClass = {
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    blue: "bg-[#3B82F6]/10 text-[#1D4ED8] ring-[#3B82F6]/20",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
  }
  return (
    <div className="group relative flex flex-col h-full rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-sm p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300 overflow-hidden">
      {/* hairline */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)" }}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400">{tag}</span>
            {badge && (
              <span className={`text-[9.5px] font-medium px-1.5 py-0.5 rounded ring-1 ${toneClass[badge.tone]}`}>
                {badge.label}
              </span>
            )}
          </div>
          <h3 className={`font-medium tracking-tight text-[#0F2A4A] ${compact ? "text-xl" : "text-2xl lg:text-3xl"}`}>
            {title}
          </h3>
          <p className={`mt-2 text-slate-500 leading-relaxed ${compact ? "text-sm" : "text-base max-w-xl"}`}>
            {description}
          </p>
        </div>
      </div>

      <div className={`mt-6 ${compact ? "" : "lg:mt-8"} flex-1`}>
        {children}
      </div>

      <div className="mt-6 pt-5 border-t border-slate-100">
        <Link
          to={href}
          className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] hover:from-[#2563EB] hover:to-[#1E40AF] text-white text-[15px] font-medium transition-colors"
        >
          {cta}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  )
}
