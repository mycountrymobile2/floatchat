"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShoppingBag,
  ShoppingCart,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Package,
  Truck,
  Star,
  Tag,
  Megaphone,
  Send,
  Store,
  Users,
  Boxes,
  Repeat,
  Zap,
  BadgePercent,
  Plug,
  Inbox,
  MapPin,
  Clock,
  GitBranch,
  Layers,
} from "lucide-react"
import {
  SiWhatsapp,
  SiInstagram,
  SiMessenger,
  SiShopify,
} from "react-icons/si"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"
import { FaqSchema, JsonLd } from "@/components/json-ld"
import { usePageMeta } from "@/hooks/use-page-meta"

/* ─────────────────────────────────────────────────────────────
   Metadata
─────────────────────────────────────────────────────────────── */

export const metadata = {
  title: "Agentic AI for Retail & eCommerce | FloatChat",
  description:
    "Drive sales and support for retail and eCommerce with agentic AI, order updates, cart recovery, and broadcasting across every channel.",
}

/* ─────────────────────────────────────────────────────────────
   Section eyebrow — matches the rest of the site
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
   HERO VISUAL — a retail storefront conversation flow that cycles:
   shopper asks → agent shares an ORDER / SHIPPING-UPDATE card →
   a PRODUCT RECOMMENDATION card with price + "Add to cart" →
   then a CART-RECOVERY BROADCAST going out to the segment.
   Distinct from every other industry page: storefront feel.
─────────────────────────────────────────────────────────────── */

type ShopPhase = "ask" | "order" | "recommend" | "added" | "recover"

function RetailStorefrontMockup() {
  const [phase, setPhase] = useState<ShopPhase>("ask")

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase("ask")
        await wait(1400)
        if (cancelled) return
        setPhase("order")
        await wait(2400)
        if (cancelled) return
        setPhase("recommend")
        await wait(2600)
        if (cancelled) return
        setPhase("added")
        await wait(1800)
        if (cancelled) return
        setPhase("recover")
        await wait(3000)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const showOrder = phase === "order" || phase === "recommend" || phase === "added"
  const showRecommend = phase === "recommend" || phase === "added"
  const showAdded = phase === "added"
  const showRecover = phase === "recover"

  return (
    <div className="relative">
      {/* Glow behind */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.4), transparent 70%)",
        }}
      />

      {/* Floating GMV chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Cart recovered · $128.40
        </span>
      </motion.div>

      {/* Floating channel chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div className="h-4 w-4 rounded-full bg-[#25D366] flex items-center justify-center">
          <SiWhatsapp style={{ color: "#fff", width: 10, height: 10 }} />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          WhatsApp · sell + support
        </span>
      </motion.div>

      {/* Main window */}
      <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 font-mono text-[10px] text-slate-400 inline-flex items-center gap-1.5">
            <Store className="h-3 w-3" /> northlane.store · commerce
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Selling
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[460px]">
          {/* Catalog / store rail — hidden on phones */}
          <aside className="hidden md:flex md:col-span-4 border-r border-slate-200 bg-slate-50/50 flex-col">
            <div className="px-3 py-2.5 border-b border-slate-200">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Connected store
              </p>
            </div>
            <div className="px-3 py-3 space-y-2">
              <RailSource
                Icon={Boxes}
                label="Catalog"
                meta="2,140 SKUs · live"
                active={showRecommend}
              />
              <RailSource
                Icon={Package}
                label="Orders"
                meta="fulfilment API"
                active={showOrder}
              />
              <RailSource
                Icon={Tag}
                label="Promotions"
                meta="AUTUMN15 active"
                active={showRecover}
              />
            </div>
            <div className="mt-auto px-3 py-3 border-t border-slate-200 space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                This shopper
              </p>
              <RailStat label="Segment" value="Abandoned cart" tone="blue" />
              <RailStat label="Cart value" value="$128.40" tone="blue" />
              <RailStat
                label="Stage"
                value={showRecover ? "Nudged" : "Browsing"}
                tone={showRecover ? "emerald" : "blue"}
              />
            </div>
          </aside>

          {/* Conversation pane */}
          <section className="col-span-12 md:col-span-8 flex flex-col bg-white">
            {/* Shopper header */}
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/80?img=32"
                    alt="Shopper"
                    loading="lazy"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-1 ring-white" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#0F2A4A] leading-tight">
                    Sofia Almeida
                  </p>
                  <p className="text-[9px] text-slate-500">
                    WhatsApp · returning customer
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
                <Sparkles className="h-2.5 w-2.5" /> Agent selling
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 px-4 py-3 space-y-2 bg-slate-50/30 overflow-hidden">
              <AnimatePresence mode="wait">
                {!showRecover ? (
                  <motion.div
                    key="shop-track"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    {/* Shopper question */}
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[82%] shadow-sm">
                        <p className="text-[11px] text-[#0F2A4A] leading-snug">
                          Hi! Where&apos;s my order #NL-5573 — and do you have
                          the trail runners in a wide fit?
                        </p>
                        <p className="text-[8px] text-slate-400 mt-0.5">4:41 PM</p>
                      </div>
                    </div>

                    {/* ORDER / SHIPPING-UPDATE card */}
                    <AnimatePresence>
                      {showOrder && (
                        <motion.div
                          key="order-card"
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="flex items-start gap-1.5"
                        >
                          <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                            <Sparkles className="h-2.5 w-2.5 text-white" />
                          </div>
                          <div className="w-full max-w-[86%] rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#EAF2FF] border-b border-[#3B82F6]/15">
                              <Truck className="h-3 w-3 text-[#1D4ED8]" />
                              <span className="text-[9.5px] font-semibold text-[#1D4ED8]">
                                Order #NL-5573 · out for delivery
                              </span>
                              <span className="ml-auto font-mono text-[8px] text-slate-500">
                                today
                              </span>
                            </div>
                            <div className="px-2.5 py-2 space-y-1.5">
                              {[
                                { label: "Packed", done: true },
                                { label: "Shipped · DHL", done: true },
                                { label: "Arriving by 6 PM", done: false },
                              ].map((s) => (
                                <div
                                  key={s.label}
                                  className="flex items-center gap-2"
                                >
                                  <span
                                    className={`h-3.5 w-3.5 rounded-full flex items-center justify-center shrink-0 ${
                                      s.done
                                        ? "bg-emerald-500 text-white"
                                        : "bg-[#3B82F6] text-white"
                                    }`}
                                  >
                                    {s.done ? (
                                      <Check className="h-2 w-2" strokeWidth={3} />
                                    ) : (
                                      <MapPin className="h-2 w-2" />
                                    )}
                                  </span>
                                  <span className="text-[10px] text-[#0F2A4A]">
                                    {s.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* PRODUCT RECOMMENDATION card w/ price + Add to cart */}
                    <AnimatePresence>
                      {showRecommend && (
                        <motion.div
                          key="reco-card"
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="flex items-start gap-1.5"
                        >
                          <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                            <Sparkles className="h-2.5 w-2.5 text-white" />
                          </div>
                          <div className="w-full max-w-[86%] rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                            <div className="flex items-center gap-2 p-2.5">
                              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#EAF2FF] to-[#DDE8FF] flex items-center justify-center shrink-0 ring-1 ring-[#3B82F6]/10">
                                <ShoppingBag className="h-5 w-5 text-[#1D4ED8]" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-[10.5px] font-semibold text-[#0F2A4A] leading-tight truncate">
                                  Northlane Trail Runner — Wide
                                </p>
                                <div className="flex items-center gap-1 mt-0.5">
                                  {[0, 1, 2, 3].map((s) => (
                                    <Star
                                      key={s}
                                      className="h-2.5 w-2.5 text-slate-400 fill-slate-400"
                                    />
                                  ))}
                                  <Star className="h-2.5 w-2.5 text-slate-400" />
                                  <span className="text-[8px] text-slate-400 ml-0.5">
                                    412 reviews
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="text-[11px] font-bold text-[#0F2A4A]">
                                    $128.00
                                  </span>
                                  <span className="text-[9px] text-slate-400 line-through">
                                    $150
                                  </span>
                                  <span className="text-[8px] font-semibold text-emerald-600">
                                    in stock
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-semibold text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8]">
                              <ShoppingCart className="h-3 w-3" /> Add to cart
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Added confirmation */}
                    <AnimatePresence>
                      {showAdded && (
                        <motion.div
                          key="added"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-1.5 pl-7"
                        >
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                          <span className="text-[9.5px] font-medium text-emerald-600">
                            Added to cart · checkout link sent
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  /* CART-RECOVERY BROADCAST */
                  <motion.div
                    key="recover-track"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    <div className="rounded-lg border border-[#3B82F6]/25 bg-[#EAF2FF] px-2.5 py-2">
                      <div className="flex items-center gap-1.5">
                        <Megaphone className="h-3 w-3 text-[#1D4ED8]" />
                        <span className="text-[9.5px] font-semibold text-[#1D4ED8] uppercase tracking-wider">
                          Cart-recovery broadcast
                        </span>
                        <span className="ml-auto font-mono text-[8px] text-slate-500">
                          segment · 1,204
                        </span>
                      </div>
                      <p className="mt-1.5 text-[10px] text-[#0F2A4A] leading-snug">
                        Still thinking it over, Sofia? Your Trail Runners are
                        waiting — here&apos;s <span className="font-semibold">15% off</span> with
                        AUTUMN15 for the next 2 hours.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { Icon: SiWhatsapp, bg: "#25D366", label: "WhatsApp" },
                        { Icon: SiInstagram, bg: "#E4405F", label: "Instagram" },
                        { Icon: SiMessenger, bg: "#0084FF", label: "Messenger" },
                      ].map((c) => (
                        <div
                          key={c.label}
                          className="rounded-md border border-slate-200 bg-white px-1.5 py-2 flex flex-col items-center gap-1"
                        >
                          <span
                            className="h-5 w-5 rounded flex items-center justify-center"
                            style={{ background: c.bg }}
                          >
                            <c.Icon
                              style={{ color: "#fff", width: 11, height: 11 }}
                            />
                          </span>
                          <span className="text-[8px] font-medium text-[#0F2A4A]">
                            {c.label}
                          </span>
                          <span className="inline-flex items-center gap-0.5 text-[7.5px] text-emerald-600 font-medium">
                            <Check className="h-2 w-2" strokeWidth={3} /> sent
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between rounded-md bg-white border border-emerald-200 px-2.5 py-1.5">
                      <span className="inline-flex items-center gap-1.5 text-[9.5px] font-medium text-emerald-700">
                        <Repeat className="h-3 w-3" /> 68 carts recovered today
                      </span>
                      <span className="text-[9px] font-semibold text-[#0F2A4A]">
                        $8,720 back
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Composer */}
            <div className="border-t border-slate-200 bg-white px-3 py-2.5 flex items-center gap-2">
              <div className="flex-1 h-7 rounded-md bg-slate-50 border border-slate-200 px-2 flex items-center">
                <span className="text-[10px] text-slate-400">
                  Agent on · recommend, update, or broadcast…
                </span>
              </div>
              <button className="inline-flex items-center gap-1 text-[10px] font-medium bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white px-2.5 py-1 rounded-md">
                <Send className="h-3 w-3" /> Send
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function RailSource({
  Icon,
  label,
  meta,
  active,
}: {
  Icon: typeof Boxes
  label: string
  meta: string
  active?: boolean
}) {
  return (
    <motion.div
      animate={
        active
          ? {
              borderColor: "rgba(59,130,246,0.4)",
              boxShadow: "0 0 0 3px rgba(59,130,246,0.08)",
            }
          : {
              borderColor: "rgba(226,232,240,1)",
              boxShadow: "0 0 0 0 rgba(0,0,0,0)",
            }
      }
      transition={{ duration: 0.3 }}
      className="flex items-center gap-2 rounded-lg border bg-white px-2 py-1.5"
    >
      <div
        className={`h-6 w-6 rounded-md flex items-center justify-center shrink-0 ${
          active ? "bg-[#3B82F6]/10" : "bg-slate-100"
        }`}
      >
        <Icon
          className={`h-3 w-3 ${active ? "text-[#1D4ED8]" : "text-slate-500"}`}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium text-[#0F2A4A] truncate">{label}</p>
        <p className="text-[9px] text-slate-400 truncate">{meta}</p>
      </div>
      {active && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]"
        />
      )}
    </motion.div>
  )
}

function RailStat({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: "blue" | "emerald"
}) {
  const toneClass = {
    blue: "text-[#1D4ED8]",
    emerald: "text-emerald-600",
  }
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-slate-500">{label}</span>
      <span className={`text-[11px] font-semibold ${toneClass[tone]}`}>
        {value}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What you get" feature cards
─────────────────────────────────────────────────────────────── */

function OrderUpdatesVisual() {
  const steps = [
    { label: "Order placed", done: true },
    { label: "Shipped · tracking sent", done: true },
    { label: "Out for delivery", done: false, current: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Truck className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Order #NL-5573
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">auto-updates</span>
      </div>
      {steps.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span
            className={`h-4 w-4 rounded-full flex items-center justify-center shrink-0 ${
              s.done
                ? "bg-emerald-500 text-white"
                : s.current
                ? "bg-[#3B82F6] text-white"
                : "bg-slate-200 text-slate-500"
            }`}
          >
            {s.done ? (
              <Check className="h-2 w-2" strokeWidth={3} />
            ) : (
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            )}
          </span>
          <span className="text-[10px] text-[#0F2A4A]">{s.label}</span>
          {s.current && (
            <span className="ml-auto text-[8.5px] font-medium text-[#1D4ED8]">
              live
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function CartRecoveryVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/50 px-2 py-1.5">
        <ShoppingCart className="h-3 w-3 text-slate-500" />
        <span className="text-[10px] text-[#0F2A4A] truncate flex-1">
          Cart left at checkout · $128.40
        </span>
      </div>
      <div className="flex items-center justify-center text-slate-400">
        <ArrowRight className="h-3 w-3 rotate-90" />
      </div>
      <div className="rounded-md border border-[#3B82F6]/20 bg-[#EAF2FF] px-2 py-1.5">
        <div className="flex items-center gap-1.5">
          <BadgePercent className="h-3 w-3 text-[#1D4ED8]" />
          <span className="text-[9.5px] font-semibold text-[#1D4ED8]">
            Timed WhatsApp nudge · 15% off
          </span>
        </div>
        <p className="mt-1 text-[9px] text-[#0F2A4A] leading-snug">
          One tap back to a pre-filled cart. Recovered checkout, no discount hunt.
        </p>
      </div>
    </div>
  )
}

function ProductRecsVisual() {
  const items = [
    { label: "Trail Runner — Wide", price: "$128", match: "best fit" },
    { label: "Merino Trail Sock 3-pk", price: "$24", match: "pairs with" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          From your live catalog
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Boxes className="h-2.5 w-2.5" /> 2,140 SKUs
        </span>
      </div>
      {items.map((it) => (
        <div
          key={it.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5"
        >
          <div className="h-7 w-7 rounded-md bg-gradient-to-br from-[#EAF2FF] to-[#DDE8FF] flex items-center justify-center shrink-0 ring-1 ring-[#3B82F6]/10">
            <ShoppingBag className="h-3.5 w-3.5 text-[#1D4ED8]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium text-[#0F2A4A] truncate">
              {it.label}
            </p>
            <span className="text-[8px] text-slate-400">{it.match}</span>
          </div>
          <span className="text-[10px] font-bold text-[#0F2A4A] shrink-0">
            {it.price}
          </span>
        </div>
      ))}
    </div>
  )
}

function BroadcastVisual() {
  const channels = [
    { Icon: SiWhatsapp, bg: "#25D366", label: "WhatsApp" },
    { Icon: MessageChannelDot, bg: "#0F2A4A", label: "SMS" },
    { Icon: SiInstagram, bg: "#E4405F", label: "Instagram" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Megaphone className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Launch broadcast
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">1 send</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {channels.map((c) => (
          <div
            key={c.label}
            className="rounded-md border border-slate-200 bg-slate-50/40 px-1.5 py-2 flex flex-col items-center gap-1"
          >
            <span
              className="h-5 w-5 rounded flex items-center justify-center"
              style={{ background: c.bg }}
            >
              <c.Icon style={{ color: "#fff", width: 11, height: 11 }} />
            </span>
            <span className="text-[8px] font-medium text-[#0F2A4A]">
              {c.label}
            </span>
          </div>
        ))}
      </div>
      <div className="rounded-md bg-[#EAF2FF] border border-[#3B82F6]/20 px-2 py-1 flex items-center gap-1.5">
        <CheckCircle2 className="h-2.5 w-2.5 text-[#1D4ED8]" />
        <span className="text-[9px] text-[#0F2A4A]">
          Replies land back in one shared inbox
        </span>
      </div>
    </div>
  )
}

/* tiny inline SMS glyph so the broadcast tile has a real icon */
function MessageChannelDot({ style }: { style?: React.CSSProperties }) {
  return <Send style={style} />
}

/* ─────────────────────────────────────────────────────────────
   Channels
─────────────────────────────────────────────────────────────── */

type ChannelTile = {
  name: string
  detail: string
  bg: string
  Icon?: React.ComponentType<{ style?: React.CSSProperties }>
  Lucide?: typeof Send
}

const channels: ChannelTile[] = [
  { name: "WhatsApp", detail: "sell + support", bg: "#25D366", Icon: SiWhatsapp },
  { name: "SMS", detail: "order + promo", bg: "#0F2A4A", Lucide: Send },
  { name: "RCS", detail: "rich cards", bg: "#1D4ED8", Lucide: Layers },
  { name: "Web chat", detail: "on the storefront", bg: "#3B82F6", Lucide: Store },
  { name: "Instagram", detail: "shop DMs", bg: "#E4405F", Icon: SiInstagram },
  { name: "Messenger", detail: "DMs", bg: "#0084FF", Icon: SiMessenger },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Does it connect to my store?",
    answer:
      "Yes. FloatChat plugs into your commerce stack through 200+ integrations — Shopify, WooCommerce, Magento, BigCommerce, and the order, catalog, and CRM tools around them. The agent reads live product data, inventory, and order status, so answers and recommendations reflect what's actually in stock right now instead of a stale export.",
  },
  {
    question: "Can it recover abandoned carts?",
    answer:
      "Yes. When a shopper leaves before checkout, the agent follows up automatically on WhatsApp or SMS with a personalized nudge — the exact items they left, an optional timed incentive, and a one-tap link straight back to a pre-filled cart. You set the timing, the segments, and whether a discount is offered, and every recovered checkout is attributed so you can see the revenue.",
  },
  {
    question: "Which channels does it support?",
    answer:
      "WhatsApp, SMS, RCS, web chat, Instagram, and Messenger — all from one agent and one shared inbox. A shopper can ask about sizing on Instagram, get a shipping update over WhatsApp, and receive a launch broadcast by SMS, and it's all the same customer record and conversation history.",
  },
  {
    question: "Can the agent actually recommend products, not just answer FAQs?",
    answer:
      "It recommends and sells. Because it's agentic, it reasons over your live catalog to suggest the right size, color, or complementary item, shares a product card with price and reviews, adds it to the cart, and sends a checkout link — completing the sale in the chat instead of pointing the shopper back to a search bar.",
  },
  {
    question: "How does it handle order support and returns?",
    answer:
      "The agent looks up any order by number or phone, shares live tracking and delivery ETAs, and walks a shopper through a return or exchange end to end — generating the label and updating the order — inside the same thread. When something genuinely needs a human, it escalates with the full order context attached.",
  },
  {
    question: "How is broadcasting different from a bulk-SMS tool?",
    answer:
      "A blast tool sends and forgets. FloatChat broadcasts a launch or promo across WhatsApp, SMS, and RCS, and every reply comes straight back into the same shared inbox where the AI agent and your team can answer, recommend, and close — turning a one-way announcement into a two-way selling conversation.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Agentic AI for Retail & eCommerce",
  serviceType: "Agentic AI for retail and eCommerce sales and support automation",
  description:
    "Agentic AI for retail and eCommerce that recommends products from your live catalog, resolves order and shipping questions, recovers abandoned carts, and broadcasts campaigns across WhatsApp, SMS, RCS, web, Instagram, and Messenger from one shared inbox.",
  url: "https://www.floatchat.com/industry/retail",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Retail, eCommerce, and D2C brands",
  },
}

/* ─────────────────────────────────────────────────────────────
   Related links + cross-links
─────────────────────────────────────────────────────────────── */

const relatedCards = [
  {
    to: "/ai-agents/sales",
    Icon: ArrowUpRight,
    title: "Sales Agent",
    body: "Turns browsers into buyers — recommends, upsells, and closes in the chat.",
  },
  {
    to: "/ai-agents/customer-service",
    Icon: Package,
    title: "Customer Service Agent",
    body: "Resolves order, tracking, and returns questions 24/7 with full context.",
  },
  {
    to: "/channels/whatsapp-broadcasting",
    Icon: Megaphone,
    title: "WhatsApp Broadcasting",
    body: "Launch drops and promos to opted-in shoppers, with replies in one inbox.",
  },
  {
    to: "/products/omnichannel-inbox",
    Icon: Inbox,
    title: "Omnichannel Inbox",
    body: "Every channel, one shared inbox, one customer record for your team.",
  },
]

const relatedPills = [
  { to: "/agentic-ai", label: "Agentic AI", Icon: Sparkles },
  { to: "/channels/whatsapp", label: "WhatsApp", Icon: SiWhatsapp },
  { to: "/integrations", label: "Integrations", Icon: Plug },
  { to: "/compare", label: "Compare FloatChat", Icon: GitBranch },
  { to: "/pricing", label: "Pricing", Icon: Tag },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function RetailIndustryPage() {
  usePageMeta(metadata)

  return (
    <>
      <Header />
      <FaqSchema items={faqs} />
      <JsonLd schema={serviceSchema} />

      <main id="main-content" className="pt-20">
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
              <div className="lg:col-span-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1B6BFF]/5 px-4 py-1.5 text-xs font-medium text-[#1B6BFF]"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  Retail &amp; eCommerce · sell and support in one chat
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Agentic AI for retail and{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    eCommerce.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Drive sales and support across every channel with agents that
                  recommend from your catalog, resolve order questions, and
                  recover carts — then broadcast the next launch to bring
                  shoppers back.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Recommends from your catalog",
                    "Recovers abandoned carts",
                    "24/7 order support",
                    "Campaigns on every channel",
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
                    Get a Demo
                  </Link>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-4 text-sm text-slate-500"
                >
                  Built for D2C brands and online stores.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <RetailStorefrontMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RESULTS / STATS BAR ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                {
                  Icon: Boxes,
                  value: "Live",
                  label: "recommends from your catalog",
                },
                {
                  Icon: ShoppingCart,
                  value: "Auto",
                  label: "recovers abandoned carts",
                },
                {
                  Icon: Clock,
                  value: "24/7",
                  label: "order, tracking & returns support",
                },
                {
                  Icon: Megaphone,
                  value: "6",
                  label: "channels to broadcast campaigns",
                },
              ].map((s, i) => (
                <BlurFade key={s.label} delay={i * 0.08}>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                      <s.Icon className="h-5 w-5 text-[#1D4ED8]" />
                    </div>
                    <div>
                      <p className="text-2xl lg:text-3xl font-semibold text-[#0F2A4A] tabular-nums leading-none">
                        {s.value}
                      </p>
                      <p className="mt-1.5 text-[12.5px] text-slate-500 leading-snug">
                        {s.label}
                      </p>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── THE PROBLEM ───── */}
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <BlurFade className="lg:col-span-6">
                <SectionEyebrow num="01" label="The problem" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Shoppers want answers now. Your team can&apos;t be everywhere.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    A shopper hesitating over a size, a shipping cutoff, or a
                    return policy will not wait for business hours — they close
                    the tab. Every unanswered question at 11 PM, every full cart
                    left at checkout, and every &ldquo;where&apos;s my order?&rdquo;
                    is margin walking out the door.
                  </p>
                  <p>
                    Most stores bolt on a scripted chatbot that answers five FAQs
                    and stalls on everything else. It can&apos;t see your
                    inventory, can&apos;t recommend the right product, can&apos;t
                    check an order, and definitely can&apos;t bring back the cart
                    it just lost.
                  </p>
                  <p>
                    An{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      agentic AI for retail
                    </span>{" "}
                    handles the volume, recommends from your live catalog, and
                    keeps shoppers moving toward checkout — while your team
                    focuses on the conversations that grow order value.
                  </p>
                </div>
              </BlurFade>

              {/* chatbot vs agent contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      A scripted chatbot
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "Answers a few FAQs, then stalls",
                        "Blind to inventory and orders",
                        "Sends carts off to die silently",
                        "One channel, no follow-up",
                      ].map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-3">
                      An agent that sells
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Recommends from your live catalog",
                        "Reads orders, tracking, and stock",
                        "Recovers carts with a timed nudge",
                        "Sells and supports on every channel",
                      ].map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <Check
                            className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0"
                            strokeWidth={3}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── WHAT YOU GET ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="02" label="What you get" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One agent that sells and supports.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Four jobs, one agent, one shared inbox — wired into your store
                  and working around the clock.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Truck,
                  title: "Live order & shipping updates.",
                  body:
                    "Shoppers ask &ldquo;where&apos;s my order?&rdquo; and get an instant answer — real tracking, a delivery ETA, and self-serve returns or exchanges — pulled straight from your fulfilment system.",
                  visual: <OrderUpdatesVisual />,
                },
                {
                  Icon: ShoppingCart,
                  title: "Automatic cart recovery.",
                  body:
                    "When a checkout is abandoned, the agent follows up on WhatsApp or SMS with the exact items, an optional timed incentive, and a one-tap link back to a pre-filled cart.",
                  visual: <CartRecoveryVisual />,
                },
                {
                  Icon: Star,
                  title: "Product recommendations that convert.",
                  body:
                    "It reasons over your live catalog to suggest the right size, complementary item, or upsell — sharing a product card with price and reviews, then adding it to the cart.",
                  visual: <ProductRecsVisual />,
                },
                {
                  Icon: Megaphone,
                  title: "Broadcasting for every launch.",
                  body:
                    "Announce drops, sales, and restocks across WhatsApp, SMS, and RCS in one send — and every reply comes back into the same inbox to be answered and closed.",
                  visual: <BroadcastVisual />,
                },
              ].map((f, i) => (
                <BlurFade key={f.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30 shrink-0">
                        <f.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg lg:text-xl font-semibold text-[#0F2A4A] leading-tight">
                          {f.title}
                        </h3>
                        <p
                          className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: f.body }}
                        />
                      </div>
                    </div>
                    <div className="mt-5 flex-1 flex items-end">
                      <div className="w-full">{f.visual}</div>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── CHANNELS STRIP ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="03" label="Channels" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Every channel your shoppers use.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Sell, support, and broadcast from one agent — the same cart,
                  order, and history follow the shopper everywhere.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {channels.map((c) => (
                  <div
                    key={c.name}
                    className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-300 hover:shadow-[0_15px_30px_-15px_rgba(15,42,74,0.2)] transition-all duration-300 flex flex-col items-start gap-2.5"
                  >
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold shadow-md ring-1 ring-black/5"
                      style={{ background: c.bg }}
                    >
                      {c.Icon ? (
                        <c.Icon style={{ color: "#FFFFFF", width: 18, height: 18 }} />
                      ) : c.Lucide ? (
                        <c.Lucide className="h-[18px] w-[18px] text-white" />
                      ) : null}
                    </div>
                    <div className="min-w-0 w-full">
                      <p className="text-sm font-semibold text-[#0F2A4A] truncate">
                        {c.name}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                        {c.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── USE CASES / HOW IT FLOWS ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="How it flows" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  From first question to repeat customer.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  One conversation carries a shopper across the whole journey —
                  guided buying, order support, cart recovery, and the next
                  campaign that brings them back.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  Icon: ShoppingBag,
                  step: "Guided buying",
                  body:
                    "Pre-purchase questions and product recommendations answered right in the chat, from your live catalog.",
                },
                {
                  Icon: Package,
                  step: "Order support",
                  body:
                    "Tracking, delivery updates, returns, and exchanges handled automatically — no ticket queue.",
                },
                {
                  Icon: ShoppingCart,
                  step: "Cart recovery",
                  body:
                    "SMS and WhatsApp follow-ups with a timed nudge bring abandoned carts back to checkout.",
                },
                {
                  Icon: Megaphone,
                  step: "Campaigns",
                  body:
                    "Launches and promotions broadcast across SMS, WhatsApp, and RCS — replies land in one inbox.",
                },
              ].map((c, i) => (
                <BlurFade key={c.step} delay={0.05 + i * 0.08} className="h-full">
                  <div className="relative h-full rounded-3xl border border-slate-200/80 bg-gradient-to-b from-[#F5F7FF] to-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <span className="absolute top-5 right-6 font-mono text-[11px] text-slate-300">
                      0{i + 1}
                    </span>
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
                      <c.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-[#0F2A4A]">
                      {c.step}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-slate-500 leading-relaxed">
                      {c.body}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>

            {/* flow band */}
            <BlurFade delay={0.25}>
              <div className="mt-8 rounded-3xl border border-slate-200 bg-gradient-to-r from-[#EAF2FF] via-white to-[#EAF2FF] p-6 lg:p-7">
                <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-3">
                  {[
                    { Icon: Store, title: "Shopper arrives", note: "any channel" },
                    { Icon: Sparkles, title: "Agent recommends", note: "from live catalog" },
                    { Icon: ShoppingCart, title: "Adds to cart", note: "checkout link sent" },
                    { Icon: Repeat, title: "Wins them back", note: "recovery + broadcast" },
                  ].map((step, i, arr) => (
                    <div key={step.title} className="flex-1 flex items-center gap-3">
                      <div className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-4 py-3 w-full">
                        <div className="h-9 w-9 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                          <step.Icon className="h-[18px] w-[18px] text-[#1D4ED8]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-[#0F2A4A] leading-tight">
                            {step.title}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            {step.note}
                          </p>
                        </div>
                      </div>
                      {i < arr.length - 1 && (
                        <ArrowRight className="hidden md:block h-4 w-4 text-slate-300 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Turn conversations into carts — and carts into revenue."
          body="Connect your store, go live in days, and let one agent sell and support across every channel. No per-message fees."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── WHY FLOATCHAT ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="05" label="Why FloatChat" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Support and campaigns that know the same shopper.
                </h2>
              </BlurFade>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Zap,
                  title: "Instant help, higher conversion.",
                  body:
                    "Shoppers get accurate answers and the right recommendation at any hour — so hesitation turns into checkout instead of a closed tab.",
                },
                {
                  Icon: Users,
                  title: "Your team on high-value work.",
                  body:
                    "The agent absorbs the repetitive order and sizing questions, freeing your people for VIP shoppers and the conversations that grow order value.",
                },
                {
                  Icon: Layers,
                  title: "One record, sell to support.",
                  body:
                    "The AI agent, the shared inbox, and broadcasting run on one platform — so a support chat and a promo campaign know the same customer.",
                },
              ].map((b, i) => (
                <BlurFade key={b.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_10px_30px_-12px_rgba(15,42,74,0.08)]">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
                      <b.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-[#0F2A4A]">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                      {b.body}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>

            {/* Why FloatChat strip */}
            <BlurFade delay={0.2}>
              <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-7 lg:p-9 text-white relative overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                <div className="relative flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 mb-3">
                      One customer record
                    </p>
                    <p className="text-xl lg:text-2xl font-medium leading-snug max-w-3xl">
                      The AI agent, the inbox, and the broadcasting all share one
                      customer record — so a support chat and a promo campaign
                      know the same shopper, their cart, and their order history.
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center gap-3 rounded-2xl bg-white/10 border border-white/15 px-4 py-3">
                    <div className="h-9 w-9 rounded-xl bg-white/15 flex items-center justify-center">
                      <SiShopify style={{ color: "#fff", width: 18, height: 18 }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-tight">200+ integrations</p>
                      <p className="text-[11px] text-white/70">Shopify, Woo, Magento &amp; more</p>
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── RELATED LINKS ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="06" label="Explore more" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Everything your store needs, together.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Retail runs on the same platform as the agents, the inbox, and
                  the broadcasting — each one a click away.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedCards.map((a, i) => (
                <BlurFade key={a.to} delay={0.05 + i * 0.06} className="h-full">
                  <Link
                    to={a.to}
                    className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md">
                      <a.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#0F2A4A] group-hover:text-[#1D4ED8] transition-colors">
                      {a.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed flex-1">
                      {a.body}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1D4ED8]">
                      Learn more
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </BlurFade>
              ))}
            </div>

            {/* related pills */}
            <BlurFade delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-[12px] font-medium uppercase tracking-wider text-slate-400">
                  Related
                </span>
                {relatedPills.map((p) => (
                  <Link
                    key={p.to}
                    to={p.to}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-[#0F2A4A] hover:border-[#3B82F6]/40 hover:text-[#1D4ED8] transition-colors"
                  >
                    <p.Icon className="h-3.5 w-3.5" />
                    {p.label}
                  </Link>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section
          id="faq"
          className="py-24 lg:py-32 bg-gradient-to-b from-white to-[#EEF2FF]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="Retail & eCommerce questions"
              description="Straight answers about connecting your store, recovering carts, and selling across channels."
              footer={
                <p className="text-sm text-muted-foreground">
                  More questions?{" "}
                  <Link
                    to="/contact"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Talk to us
                  </Link>{" "}
                  or explore{" "}
                  <Link
                    to="/integrations"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    integrations
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
                  Selling and supporting across 6 channels right now
                </span>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-[11px] text-slate-500">live in days</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="relative inline-flex items-center gap-2 mb-5"
              >
                <span className="text-[11px] font-mono text-slate-400">/ START</span>
                <span className="h-px w-6 bg-slate-300" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#3B82F6]">
                  Built for retail &amp; eCommerce
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Sell and support with{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                  agentic AI.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Connect your store and let one agent recommend, resolve, and
                recover across every channel — while your team focuses on the
                shoppers that matter most.
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
                  Get a Demo
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
                "Recommends from your catalog",
                "Recovers abandoned carts",
                "24/7 order support",
                "Campaigns on every channel",
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
