"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  FaWhatsapp, FaInstagram, FaFacebookMessenger, FaTelegram,
  FaEnvelope, FaPhone, FaSlack, FaShopify,
} from "react-icons/fa"
import {
  SiTiktok, SiLine, SiHubspot, SiSalesforce,
  SiZapier, SiJira, SiTwilio, SiStripe, SiN8N,
} from "react-icons/si"
import { MessageSquare, ArrowRight } from "lucide-react"

type IconCell = { Icon: React.ElementType; color: string; name: string }
type Cell = IconCell | "hub"

/* 6 cols × 3 rows = 18 cells — hub at index 8 (row 1, col 2) */
const items: Cell[] = [
  { Icon: FaWhatsapp,          color: "#25D366", name: "WhatsApp"   },
  { Icon: FaFacebookMessenger, color: "#0084FF", name: "Messenger"  },
  { Icon: FaInstagram,         color: "#E1306C", name: "Instagram"  },
  { Icon: FaShopify,           color: "#96BF48", name: "Shopify"    },
  { Icon: FaTelegram,          color: "#26A5E4", name: "Telegram"   },
  { Icon: FaEnvelope,          color: "#EA4335", name: "Email"      },
  { Icon: SiHubspot,           color: "#FF7A59", name: "HubSpot"    },
  { Icon: FaSlack,             color: "#4A154B", name: "Slack"      },
  "hub",
  { Icon: SiSalesforce,        color: "#00A1E0", name: "Salesforce" },
  { Icon: FaPhone,             color: "#8B5CF6", name: "Voice"      },
  { Icon: SiZapier,            color: "#FF4A00", name: "Zapier"     },
  { Icon: SiStripe,            color: "#635BFF", name: "Stripe"     },
  { Icon: SiLine,              color: "#06C755", name: "Line"       },
  { Icon: SiTwilio,            color: "#F22F46", name: "Twilio"     },
  { Icon: SiTiktok,            color: "#010101", name: "TikTok"     },
  { Icon: SiJira,              color: "#0052CC", name: "Jira"       },
  { Icon: SiN8N,               color: "#EA4B71", name: "n8n"        },
]

const OCTAGON = "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)"

const stats = [
  { value: "10+", label: "Native channels" },
  { value: "50+", label: "Integrations"    },
  { value: "1",   label: "Unified inbox"   },
]


export function Omnichannel() {
  return (
    <section id="channels" className="py-6 lg:py-8 bg-gradient-to-b from-[#EEF2FF] to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-0 rounded-3xl border border-border bg-card overflow-hidden shadow-sm px-8 lg:px-14 py-14 lg:py-0 lg:min-h-[480px]">

          {/* Dot grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right,#006AFF0A 1px,transparent 1px)," +
                "linear-gradient(to bottom,#006AFF0A 1px,transparent 1px)",
              backgroundSize: "44px 44px",
            }}
            aria-hidden="true"
          />
          {/* Fade: keep left text clean */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 55% 100% at 8% 50%, #FAFCFF 38%, transparent 100%)" }}
            aria-hidden="true"
          />

          {/* ── Left: text ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full lg:w-[40%] shrink-0"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Omnichannel inbox
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              Every channel.<br />
              <span className="gradient-text">One inbox.</span>
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-7 max-w-sm">
              WhatsApp, email, Instagram, voice, SMS, TikTok and more — unified with
              tools like Shopify, HubSpot, Zapier and Salesforce.
            </p>

            <div className="flex gap-8 mb-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 flex-wrap mb-8">
              <Button asChild className="shadow-md shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                <Link to="/integrations">
                  View all integrations <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/inbox">Explore Inbox</Link>
              </Button>
            </div>

          </motion.div>

          {/* ── Right: octagon icon grid ── */}
          <div className="relative z-10 flex-1 min-w-0 flex items-center justify-center py-10 lg:py-12 lg:pl-8">
            <div className="grid grid-cols-6 gap-3 lg:gap-4">
              {items.map((cell, idx) => {
                const delay = 0.03 + idx * 0.03

                if (cell === "hub") {
                  return (
                    <motion.div
                      key="hub"
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
                      className="w-16 h-16 lg:w-[76px] lg:h-[76px] flex items-center justify-center shadow-lg shadow-primary/30"
                      style={{
                        background: "linear-gradient(135deg, #006AFF, #3B82F6)",
                        clipPath: OCTAGON,
                      }}
                    >
                      <MessageSquare style={{ width: 28, height: 28, color: "#fff" }} />
                    </motion.div>
                  )
                }

                const { Icon, color, name } = cell
                return (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay, ease: "easeOut" }}
                    title={name}
                    className="w-16 h-16 lg:w-[76px] lg:h-[76px] bg-white border-2 border-slate-100 flex items-center justify-center cursor-default hover:border-slate-200 hover:scale-105 transition-transform duration-200"
                    style={{ clipPath: OCTAGON }}
                  >
                    <Icon style={{ color, width: 28, height: 28 }} aria-label={name} />
                  </motion.div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
