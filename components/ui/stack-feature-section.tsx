import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  FaWhatsapp, FaInstagram, FaSlack, FaGoogle,
  FaShopify, FaTelegram, FaStripeS,
} from "react-icons/fa"
import {
  SiZapier, SiHubspot, SiSalesforce, SiTwilio,
  SiFacebook, SiStripe, SiTiktok, SiGoogleanalytics,
} from "react-icons/si"
import { MessageSquare } from "lucide-react"

const iconConfigs: Array<{
  Icon?: React.ElementType
  color: string
  label: string
}> = [
  { Icon: FaWhatsapp,          color: "#25D366", label: "WhatsApp"        },
  { Icon: FaShopify,           color: "#96BF48", label: "Shopify"         },
  { Icon: FaSlack,             color: "#4A154B", label: "Slack"           },
  { Icon: SiHubspot,           color: "#FF7A59", label: "HubSpot"         },
  { Icon: FaInstagram,         color: "#E1306C", label: "Instagram"       },
  { Icon: SiZapier,            color: "#FF4A00", label: "Zapier"          },
  { Icon: SiSalesforce,        color: "#00A1E0", label: "Salesforce"      },
  { Icon: FaGoogle,            color: "#DB4437", label: "Google"          },
  { Icon: SiFacebook,          color: "#1877F2", label: "Facebook"        },
  { Icon: SiTwilio,            color: "#F22F46", label: "Twilio"          },
  { Icon: FaTelegram,          color: "#26A5E4", label: "Telegram"        },
  { Icon: SiStripe,            color: "#635BFF", label: "Stripe"          },
  { Icon: SiTiktok,            color: "#010101", label: "TikTok"          },
  { Icon: SiGoogleanalytics,   color: "#E37400", label: "Analytics"       },
]

const orbitCount = 3
const orbitGap = 8
const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount)

export function StackFeatureSection() {
  return (
    <section className="relative max-w-6xl mx-auto my-16 lg:my-24 flex items-center justify-between h-[26rem] sm:h-[30rem] border border-border bg-card overflow-hidden rounded-3xl shadow-sm">

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #006AFF0F 1px, transparent 1px), linear-gradient(to bottom, #006AFF0F 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Left side: Heading and CTA */}
      <div className="relative w-full sm:w-1/2 z-10 px-8 lg:px-12">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          50+ integrations
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground leading-tight">
          Connect your entire stack.
        </h2>
        <p className="text-muted-foreground mb-6 max-w-sm text-sm sm:text-base leading-relaxed">
          FloatChat connects to WhatsApp, Shopify, HubSpot, Salesforce, Zapier, Slack, and 50+ tools — right out of the box.
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <Button asChild size="lg" className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
            <Link to="/signup?plan=free">Start Free</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/docs">View API Docs</Link>
          </Button>
        </div>
      </div>

      {/* Right side: Orbit rings — cropped at left edge */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-1/2 flex items-center justify-start overflow-hidden pointer-events-none">
        <div className="relative w-[50rem] h-[50rem] translate-x-[48%] flex items-center justify-center">

          {/* Center */}
          <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 shadow-lg flex items-center justify-center z-10">
            <MessageSquare className="w-9 h-9 text-primary" />
          </div>

          {/* Orbit rings */}
          {[...Array(orbitCount)].map((_, orbitIdx) => {
            const size = `${12 + orbitGap * (orbitIdx + 1)}rem`
            const angleStep = (2 * Math.PI) / iconsPerOrbit
            const duration = 18 + orbitIdx * 8
            const iconsSlice = iconConfigs.slice(
              orbitIdx * iconsPerOrbit,
              orbitIdx * iconsPerOrbit + iconsPerOrbit
            )

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border border-dashed border-border/60"
                style={{
                  width: size,
                  height: size,
                  animation: `fc-orbit-spin ${duration}s linear infinite`,
                }}
              >
                {iconsSlice.map((cfg, iconIdx) => {
                  const angle = iconIdx * angleStep
                  const x = 50 + 50 * Math.cos(angle)
                  const y = 50 + 50 * Math.sin(angle)

                  return (
                    <div
                      key={iconIdx}
                      className="absolute bg-card rounded-full p-1.5 shadow-md border border-border"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                        // counter-rotate so icons stay upright
                        animation: `fc-orbit-counter ${duration}s linear infinite`,
                      }}
                      title={cfg.label}
                    >
                      {cfg.Icon && (
                        <cfg.Icon
                          className="w-6 h-6 sm:w-7 sm:h-7"
                          style={{ color: cfg.color }}
                          aria-label={cfg.label}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes fc-orbit-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes fc-orbit-counter {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
      `}</style>
    </section>
  )
}
