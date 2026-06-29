"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail,
  Check,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Inbox,
  AtSign,
  Forward,
  Tag,
  Workflow,
  Star,
  Paperclip,
  Send,
  ChevronRight,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"

/* ─────────────────────────────────────────────────────────────
   Hero mockup: shared email inbox + collision indicator
─────────────────────────────────────────────────────────────── */

const DRAFT_REPLY =
  "Hi Jessica! Order #4421 ships tomorrow morning via UPS. Free delivery to NYC — ETA 2 days. Tracking: 1Z999AA10123456784."

type EmailPhase = "idle" | "typing" | "sent"

function SharedEmailMockup() {
  const [phase, setPhase] = useState<EmailPhase>("idle")
  const [draftIdx, setDraftIdx] = useState(0)

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

    const run = async () => {
      while (!cancelled) {
        setPhase("idle")
        setDraftIdx(0)
        await wait(1100)
        if (cancelled) return

        setPhase("typing")
        for (let i = 1; i <= DRAFT_REPLY.length; i++) {
          if (cancelled) return
          setDraftIdx(i)
          await wait(22 + Math.random() * 22)
        }
        await wait(700)
        if (cancelled) return

        setPhase("sent")
        await wait(1800)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const isTyping = phase === "typing"
  const isSent = phase === "sent"

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.35), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
          <Mail className="h-2.5 w-2.5 text-white" />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          support@atelierlinen.com
        </span>
      </motion.div>

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
          3 agents online
        </span>
      </motion.div>

      {/* Window */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 text-[10px] font-mono text-slate-400">
            app.floatchat.com · email
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[420px]">
          {/* Thread list — hidden on phones */}
          <aside className="hidden md:flex md:col-span-4 border-r border-slate-200 bg-slate-50/40 flex-col">
            <div className="px-3 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <p className="text-[11px] font-semibold text-[#0F2A4A]">
                support@
              </p>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-500">
                14 open
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              {[
                {
                  name: "Jessica Chen",
                  subj: "Order #4421 question",
                  preview: "Hi! Wondering if you ship to NYC...",
                  time: "2m",
                  unread: true,
                  active: true,
                  who: { name: "Sarah", img: 32, color: "#3B82F6" },
                },
                {
                  name: "Marcus Williams",
                  subj: "Subscription renewal",
                  preview: "Just got the renewal notice, want to…",
                  time: "12m",
                  who: { name: "Marcus W.", img: 12 },
                },
                {
                  name: "Ashley Rodriguez",
                  subj: "Receipt copy",
                  preview: "Could you send me a copy of the receipt…",
                  time: "1h",
                },
                {
                  name: "Tyler Brooks",
                  subj: "Thanks!",
                  preview: "Just wanted to say thanks for the quick…",
                  time: "3h",
                },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                  className={`flex items-start gap-2 px-3 py-2.5 border-b border-slate-100 ${
                    t.active
                      ? "bg-[#3B82F6]/5 border-l-2 border-l-[#3B82F6]"
                      : "hover:bg-white"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p
                        className={`text-[11px] truncate ${
                          t.unread
                            ? "font-semibold text-[#0F2A4A]"
                            : "font-medium text-slate-600"
                        }`}
                      >
                        {t.name}
                      </p>
                      <span className="text-[9px] text-slate-400 shrink-0">
                        {t.time}
                      </span>
                    </div>
                    <p
                      className={`text-[10.5px] truncate ${
                        t.unread ? "text-[#0F2A4A] font-medium" : "text-slate-500"
                      }`}
                    >
                      {t.subj}
                    </p>
                    <p className="text-[9.5px] text-slate-400 truncate">
                      {t.preview}
                    </p>
                  </div>
                  {t.who && (
                    <div className="shrink-0 flex flex-col items-end gap-0.5">
                      <img
                        src={`https://i.pravatar.cc/30?img=${t.who.img}`}
                        alt=""
                        className="h-5 w-5 rounded-full ring-2 ring-white object-cover"
                        loading="lazy"
                      />
                      {t.unread && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" />
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </aside>

          {/* Active email + collision */}
          <section className="col-span-12 md:col-span-8 flex flex-col bg-white">
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-200">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#0F2A4A] truncate">
                    Order #4421 question
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Jessica Chen &lt;jessica@example.com&gt;
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[9.5px] font-medium text-emerald-700">
                    <Tag className="h-2.5 w-2.5" /> shipping
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-1.5 py-0.5 text-[9.5px] font-medium text-amber-700">
                    <Star className="h-2.5 w-2.5" /> VIP
                  </span>
                </div>
              </div>

              {/* Assigned row */}
              <div className="flex items-center justify-between text-[10.5px]">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Assigned to</span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="relative">
                      <img
                        src="https://i.pravatar.cc/30?img=32"
                        alt=""
                        className="h-5 w-5 rounded-full ring-2 ring-white object-cover"
                        loading="lazy"
                      />
                      {isTyping && (
                        <motion.span
                          className="absolute inset-0 rounded-full ring-2 ring-amber-500"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                        />
                      )}
                    </span>
                    <span className="font-semibold text-[#0F2A4A]">Sarah K.</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <ChevronRight className="h-3 w-3" />
                  <span>SLA · 2h 14m left</span>
                </div>
              </div>
            </div>

            {/* Email body */}
            <div className="flex-1 px-4 py-3 space-y-3 bg-slate-50/30 overflow-hidden">
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-300 to-rose-400 ring-1 ring-white" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10.5px] font-medium text-[#0F2A4A]">
                      Jessica Chen
                    </p>
                  </div>
                  <span className="text-[9px] text-slate-400">9:41 AM</span>
                </div>
                <p className="text-[11px] text-[#0F2A4A] leading-snug">
                  Hi! Wondering if you ship to NYC and what the ETA is for order
                  #4421?
                </p>
              </div>

              {/* Collision banner / Sent confirmation */}
              <AnimatePresence mode="wait">
                {isTyping && (
                  <motion.div
                    key="collision"
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-lg border border-amber-200 bg-amber-50/80 px-3 py-2 flex items-center gap-2"
                  >
                    <div className="relative h-5 w-5 rounded-full overflow-hidden ring-2 ring-amber-400 shrink-0">
                      <img
                        src="https://i.pravatar.cc/30?img=32"
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-[10.5px] flex-1">
                      <span className="font-semibold text-amber-800">Sarah K.</span>{" "}
                      <span className="text-amber-700">is typing in the composer</span>
                    </p>
                    <div className="flex items-center gap-0.5">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="h-1 w-1 rounded-full bg-amber-600"
                          animate={{ y: [0, -2, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: d * 0.12,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {isSent && (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-lg border border-emerald-200 bg-emerald-50/80 px-3 py-2 flex items-center gap-2"
                  >
                    <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </div>
                    <p className="text-[10.5px] flex-1">
                      <span className="font-semibold text-emerald-800">Sarah K.</span>{" "}
                      <span className="text-emerald-700">replied · 9:42 AM</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Private note */}
              <div className="rounded-lg border border-slate-200 bg-yellow-50/80 px-3 py-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="h-4 w-4 rounded bg-amber-200 flex items-center justify-center">
                    <AtSign className="h-2.5 w-2.5 text-amber-800" />
                  </div>
                  <span className="text-[9.5px] font-semibold text-amber-800 uppercase tracking-wider">
                    Private note · @marcus
                  </span>
                </div>
                <p className="text-[10.5px] text-amber-900 leading-snug">
                  Shipping warehouse confirmed — UPS picks up tomorrow 7am.
                </p>
              </div>
            </div>

            {/* Composer */}
            <div className="border-t border-slate-200 bg-white px-3 py-2.5">
              <div className="flex items-center gap-2 text-[10px] mb-1.5">
                <span className="text-[#1D4ED8] font-medium border-b border-[#1D4ED8] pb-0.5">
                  Reply
                </span>
                <span className="text-slate-500">Private Note</span>
                <span className="ml-auto inline-flex items-center gap-1 text-[10px]">
                  {isTyping ? (
                    <span className="font-semibold text-amber-700">
                      Sarah is typing…
                    </span>
                  ) : (
                    <span className="text-slate-400 inline-flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-[#3B82F6]" />
                      Captain copilot
                    </span>
                  )}
                </span>
              </div>

              <div
                className={`rounded-md px-2 py-1.5 mb-2 min-h-[44px] border transition-colors ${
                  isTyping
                    ? "bg-amber-50/40 border-amber-200"
                    : isSent
                    ? "bg-emerald-50/40 border-emerald-200"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <AnimatePresence mode="wait">
                  {phase === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[10px] text-slate-400"
                    >
                      Reply to Jessica…
                    </motion.span>
                  )}
                  {phase === "typing" && (
                    <motion.p
                      key="typing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[10.5px] text-[#0F2A4A] leading-snug"
                    >
                      {DRAFT_REPLY.slice(0, draftIdx)}
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="inline-block w-[1.5px] h-3 align-middle bg-[#1D4ED8] ml-0.5"
                      />
                    </motion.p>
                  )}
                  {phase === "sent" && (
                    <motion.p
                      key="sent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[10.5px] text-emerald-700/80 leading-snug italic"
                    >
                      Reply sent · clearing composer…
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  <Paperclip className="h-3 w-3" />
                  <span className="text-[9px]">2 attachments</span>
                </div>
                <AnimatePresence mode="wait">
                  {isSent ? (
                    <motion.span
                      key="sent-btn"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                      className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md"
                    >
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      Sent
                    </motion.span>
                  ) : (
                    <motion.button
                      key="send-btn"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                      className="inline-flex items-center gap-1 text-[10px] font-medium bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white px-2.5 py-1 rounded-md"
                    >
                      <Send className="h-2.5 w-2.5" /> Send reply
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>
        </div>
      </div>
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
   Vertical timeline (unique pattern for Email)
─────────────────────────────────────────────────────────────── */

const steps = [
  {
    Icon: Forward,
    title: "Forward your support@ address.",
    body:
      "Set up a forwarding rule from Gmail, Outlook, or any provider. Emails land in FloatChat instead of an agent's inbox.",
    side: "right" as const,
    visual: <ForwardingVisual />,
  },
  {
    Icon: AtSign,
    title: "Assign to a team member.",
    body:
      "Anyone on the team can pick it up, assign it, or hand it off.",
    side: "left" as const,
    visual: <AssignVisual />,
  },
  {
    Icon: Mail,
    title: "Add private notes.",
    body:
      "Discuss internally without the customer seeing it. Reply when ready.",
    side: "right" as const,
    visual: <PrivateNoteVisual />,
  },
  {
    Icon: Workflow,
    title: "Automate the boring stuff.",
    body:
      "Auto-tag by subject keyword. Auto-route by sender domain. Auto-close stale conversations after 7 days.",
    side: "left" as const,
    visual: <AutomationVisual />,
  },
]

function ForwardingVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
        Gmail forwarding rule
      </div>
      <div className="rounded-md border border-slate-200 bg-slate-50/60 px-2.5 py-1.5">
        <p className="font-mono text-[10px] text-[#0F2A4A]">
          <span className="text-slate-400">to:</span> support@atelierlinen.com
        </p>
      </div>
      <div className="flex items-center justify-center text-slate-400">
        <ArrowRight className="h-3 w-3" />
      </div>
      <div className="rounded-md border border-[#3B82F6]/30 bg-[#3B82F6]/5 px-2.5 py-1.5">
        <p className="font-mono text-[10px] text-[#1D4ED8]">
          inbox-a7f9@floatchat.com
        </p>
      </div>
      <p className="text-[9.5px] text-slate-500 leading-relaxed">
        Drops cleanly into Gmail, Outlook, Zoho, Fastmail.
      </p>
    </div>
  )
}

function AssignVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between text-[10px]">
        <span className="font-medium text-[#0F2A4A]">Order #4421 question</span>
        <span className="text-slate-400">unassigned</span>
      </div>
      <div className="flex items-center gap-2 rounded-md bg-slate-50 border border-slate-200 px-2 py-1.5">
        <span className="text-[10px] text-slate-500">Assign to</span>
        <div className="flex -space-x-1.5 ml-auto">
          {[32, 12, 47, 44].map((i, idx) => (
            <motion.img
              key={i}
              animate={
                idx === 0
                  ? { scale: [1, 1.1, 1], boxShadow: ["0 0 0 0 #3B82F6", "0 0 0 4px rgba(59,130,246,0.2)", "0 0 0 0 #3B82F6"] }
                  : {}
              }
              transition={{ duration: 1.6, repeat: Infinity }}
              src={`https://i.pravatar.cc/30?img=${i}`}
              alt=""
              className="h-6 w-6 rounded-full ring-2 ring-white object-cover"
              loading="lazy"
            />
          ))}
        </div>
      </div>
      <div className="rounded-md border border-emerald-200 bg-emerald-50/60 px-2.5 py-1.5 flex items-center gap-2">
        <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
        <p className="text-[10px] text-emerald-700 font-medium">
          Assigned to Sarah K.
        </p>
      </div>
    </div>
  )
}

function PrivateNoteVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="rounded-md bg-amber-50 border border-amber-200 px-2.5 py-2">
        <div className="flex items-center gap-1.5 mb-1">
          <AtSign className="h-3 w-3 text-amber-700" />
          <span className="text-[9px] font-semibold text-amber-800 uppercase tracking-wider">
            Private · @sarah
          </span>
        </div>
        <p className="text-[10.5px] text-amber-900 leading-snug">
          Shipping confirmed for tomorrow — feel free to send the tracking number.
        </p>
      </div>
      <div className="text-[9px] text-slate-400 text-center">
        Customer doesn't see this
      </div>
      <div className="rounded-md bg-white border border-slate-200 px-2.5 py-2">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[9px] font-semibold text-[#0F2A4A] uppercase tracking-wider">
            Reply
          </span>
        </div>
        <p className="text-[10.5px] text-[#0F2A4A] leading-snug">
          Hi Jessica! Your order ships tomorrow morning. Tracking on the way.
        </p>
      </div>
    </div>
  )
}

function AutomationVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5 mb-1">
        <Workflow className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[10px] font-semibold text-[#0F2A4A]">
          Automation rules
        </span>
        <span className="ml-auto inline-flex items-center gap-1 text-[9px] font-medium text-emerald-700">
          <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
          3 active
        </span>
      </div>
      {[
        { match: "subject ~ refund", action: "tag · refunds" },
        { match: "from @enterprise.com", action: "route · Marcus" },
        { match: "no reply 7d", action: "auto-close" },
      ].map((r, i) => (
        <div
          key={i}
          className="flex items-center gap-1.5 text-[9.5px] font-mono"
        >
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-600">
            {r.match}
          </span>
          <ArrowRight className="h-2.5 w-2.5 text-slate-400 shrink-0" />
          <span className="rounded bg-[#3B82F6]/10 text-[#1D4ED8] px-1.5 py-0.5 font-medium">
            {r.action}
          </span>
        </div>
      ))}
    </div>
  )
}

function StepRow({
  step,
  idx,
  total,
}: {
  step: (typeof steps)[number]
  idx: number
  total: number
}) {
  const isRight = step.side === "right"
  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
      {/* Number marker (desktop, centered timeline) */}
      <div className="hidden lg:flex lg:col-span-2 justify-center relative">
        <div className="relative z-10 h-14 w-14 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center text-white text-lg font-semibold shadow-[0_15px_30px_-10px_rgba(59,130,246,0.5)]">
          {idx + 1}
        </div>
        {/* connecting line below — hidden on last */}
        {idx < total - 1 && (
          <div
            className="absolute top-14 bottom-[-80px] left-1/2 w-px bg-gradient-to-b from-[#3B82F6]/30 to-transparent"
            aria-hidden
          />
        )}
      </div>

      {/* Visual + text — swap order based on side */}
      <div
        className={`lg:col-span-5 ${isRight ? "lg:order-2" : "lg:order-3"}`}
      >
        <div className="lg:hidden flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center text-white text-sm font-semibold">
            {idx + 1}
          </div>
          <step.Icon className="h-4 w-4 text-[#3B82F6]" />
        </div>
        <h3 className="text-2xl font-semibold tracking-tight text-[#0F2A4A] leading-tight">
          {step.title}
        </h3>
        <p className="mt-3 text-[14.5px] text-slate-500 leading-relaxed max-w-md">
          {step.body}
        </p>
      </div>
      <div
        className={`lg:col-span-5 ${isRight ? "lg:order-3" : "lg:order-2"}`}
      >
        <div className="relative rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]">
          {step.visual}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQ + content
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Can I send emails from my own domain?",
    answer:
      'You can send replies from a FloatChat-controlled email address. Custom email "from" domain is not supported on any tier.',
  },
  {
    question: "How many email inboxes can I have?",
    answer:
      "Free: 1. Lite: 2. Starter: 5. Growth: 25. Pro: 100. Enterprise: unlimited.",
  },
  {
    question: "Does it work with Gmail and Outlook?",
    answer:
      "Yes. Forward to your unique FloatChat email address. Replies go from FloatChat. Original email thread stays intact.",
  },
  {
    question: "What about HTML formatting and attachments?",
    answer:
      "Both supported. File size limits scale with plan: 10 MB Free to 100 MB Pro.",
  },
]

const inTheBox = [
  { text: "Shared email inbox", note: "Free" },
  { text: "Conversation assignment + reassignment", note: "Free" },
  { text: "Internal notes and @mentions", note: "Free" },
  { text: "Email signatures per agent", note: "Free" },
  { text: "Auto-tag / auto-route / auto-close", note: "Starter+" },
  { text: "SLA management", note: "Growth+" },
  { text: "AI Captain on emails", note: "Starter+" },
  { text: "Custom HTML email templates", note: "Starter+" },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function EmailPage() {
  useEffect(() => {
    document.title = "Team Email Inbox. Without the Outlook Feel | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc)
      desc.setAttribute(
        "content",
        "Shared email inbox with assignments, internal notes, automation. Replaces Front and Help Scout for half the price. From $19.99/month.",
      )
  }, [])

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* ───── HERO ───── */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-[#F8FAFF] to-[#FFFFFF]">
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
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1B6BFF]/5 px-4 py-1.5 text-xs font-medium text-[#1B6BFF]"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Shared inbox · email on Free
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]"
                >
                  Team email that doesn't feel like{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    Outlook.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Shared inbox with assignments, internal notes, and automation.
                  Replaces Front and Help Scout for half the price.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Email on Free",
                    "Assignments + notes",
                    "Automation rules",
                    "Email signatures",
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
                  Free plan includes 1 email inbox. Upgrade to Starter for
                  unlimited inboxes and full team collaboration.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7"
              >
                <SharedEmailMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── HOW IT WORKS — vertical timeline ───── */}
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
                <SectionEyebrow num="01" label="The flow" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  How it works.
                </h2>
              </BlurFade>
            </div>

            <div className="space-y-16 lg:space-y-24 relative">
              {steps.map((s, i) => (
                <BlurFade key={i}>
                  <StepRow step={s} idx={i} total={steps.length} />
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── WHAT'S IN THE BOX ───── */}
        <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
              <BlurFade className="col-span-12 lg:col-span-5">
                <SectionEyebrow num="02" label="On every plan" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  What's in the{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    box.
                  </span>
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Free gives you the basics. Starter and above unlock automation,
                  SLAs, AI Captain, and custom templates.
                </p>
              </BlurFade>

              <BlurFade delay={0.15} className="col-span-12 lg:col-span-7">
                <div className="rounded-3xl border border-slate-200 bg-white p-7 lg:p-8 shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]">
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                    {inTheBox.map((item, i) => (
                      <motion.li
                        key={item.text}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.35, delay: i * 0.05 }}
                        className="flex items-start gap-2.5"
                      >
                        <span className="mt-0.5 h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0 shadow-sm shadow-[#3B82F6]/40">
                          <Check className="h-3 w-3 text-white" strokeWidth={3} />
                        </span>
                        <span className="flex-1 text-sm text-[#0F2A4A] leading-relaxed">
                          {item.text}
                          <span
                            className={`ml-1.5 inline-flex items-center px-1.5 py-0 rounded text-[10px] font-medium uppercase tracking-wider ${
                              item.note === "Free"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-[#3B82F6]/10 text-[#1D4ED8]"
                            }`}
                          >
                            {item.note}
                          </span>
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
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="03" label="At 10 seats" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Platform comparison.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Same job, very different bills.
                </p>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <BlurFade delay={0.1} className="lg:col-span-8 h-full">
                <div className="h-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            Platform
                          </th>
                          <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            10 seats / mo
                          </th>
                          <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            Scope
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            name: "Help Scout Standard",
                            cost: "$250",
                            scope: "Email-only",
                          },
                          {
                            name: "Front Growth",
                            cost: "$590",
                            scope: "Multi-channel inbox",
                          },
                          {
                            name: "Missive",
                            cost: "$140",
                            scope: "Email-led",
                          },
                        ].map((row) => (
                          <tr
                            key={row.name}
                            className="border-b border-slate-100 hover:bg-slate-50/40 transition-colors"
                          >
                            <td className="p-4 font-medium text-[#0F2A4A]">
                              {row.name}
                            </td>
                            <td className="p-4 text-slate-500">{row.cost}</td>
                            <td className="p-4 text-slate-500">{row.scope}</td>
                          </tr>
                        ))}
                        <tr className="bg-gradient-to-r from-[#EAF2FF] to-[#F5F9FF]">
                          <td className="p-4 font-semibold text-[#1D4ED8]">
                            <span className="inline-flex items-center gap-2">
                              <Sparkles className="h-4 w-4" />
                              FloatChat Growth
                            </span>
                          </td>
                          <td className="p-4 text-[#1D4ED8] font-semibold">
                            $69
                          </td>
                          <td className="p-4 text-[#1D4ED8] font-semibold">
                            10 channels incl. email
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.2} className="lg:col-span-4">
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-8 text-white overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
                  <div className="relative">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60">
                      Vs Front
                    </p>
                    <p className="mt-4 text-6xl lg:text-7xl font-medium tracking-tight">
                      88<span className="text-3xl lg:text-4xl text-white/70">%</span>
                    </p>
                    <p className="mt-3 text-sm text-white/80 leading-relaxed">
                      Cheaper than Front Growth at 10 seats.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur px-3 py-1.5 text-[11px] font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Same email features, fewer dollars
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Add a team email inbox"
          body="Shared inbox for support@ that works like Slack, not Outlook."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="See pricing"
          secondaryHref="/pricing"
        />

        {/* ───── TESTIMONIALS ───── */}
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
              description="Forwarding, inboxes, formatting — straight answers."
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
                  Forward your support@ in 5 minutes
                </span>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-[11px] text-slate-500">no migration</span>
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
                  Free, no credit card
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Try shared email{" "}
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
                One email inbox on Free. Unlimited inboxes from Starter.
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
                "Email on Free",
                "Assignments + private notes",
                "Automation rules",
                "AI Captain (Starter+)",
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
