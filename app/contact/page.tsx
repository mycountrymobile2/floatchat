"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { toast } from "sonner"
import { Mail, Phone, MessageSquare, Users } from "lucide-react"

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.enum(["sales", "support", "partnership", "press", "other"]),
  message: z.string().min(10, "Please write at least 10 characters"),
})
type FormData = z.infer<typeof schema>

const contacts = [
  {
    title: "Sales",
    icon: Users,
    desc: "Enterprise plans, custom integrations, and HIPAA contracts.",
    items: [
      { label: "Email", href: "mailto:sales@floatchat.com", text: "sales@floatchat.com" },
    ],
    cta: { label: "Book a Demo", to: "/demo" },
  },
  {
    title: "Support",
    icon: MessageSquare,
    desc: "For existing customers needing help.",
    items: [
      { label: "Email", href: "mailto:support@floatchat.com", text: "support@floatchat.com" },
    ],
    cta: { label: "Help Center", to: "/help-center" },
  },
  {
    title: "Partnerships",
    icon: Mail,
    desc: "Integrations, agencies, BPOs.",
    items: [
      { label: "Email", href: "mailto:partnerships@floatchat.com", text: "partnerships@floatchat.com" },
    ],
  },
  {
    title: "Press",
    icon: Phone,
    desc: "Press and media inquiries.",
    items: [
      { label: "Email", href: "mailto:press@floatchat.com", text: "press@floatchat.com" },
    ],
  },
]

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact FloatChat — Sales, Support, Press"
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute("content", "Talk to sales for Enterprise pricing. Email support@floatchat.com for help. Press inquiries: press@floatchat.com.")
  }, [])

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { subject: "sales" },
  })

  async function onSubmit(data: FormData) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      toast.success("Message sent! We'll get back to you within one business day.")
      reset()
    } catch {
      toast.error("Something went wrong. Please email us directly.")
    }
  }

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Get in touch.
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                We usually reply within one business day. Enterprise teams get same-day response.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact cards */}
        <section className="py-8 lg:py-12 bg-muted/20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contacts.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <c.icon className="h-5 w-5 text-primary mb-3" />
                  <h2 className="text-lg font-semibold text-foreground mb-2">{c.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{c.desc}</p>
                  <ul className="space-y-1 text-sm mb-4">
                    {c.items.map((item) => (
                      <li key={item.text}>
                        <a href={item.href} className="text-foreground hover:text-primary transition-colors underline underline-offset-2">
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                  {c.cta && (
                    <Button size="sm" variant="outline" asChild>
                      <Link to={c.cta.to}>{c.cta.label}</Link>
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-2xl"
            >
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-8">
                Send us a message
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Jane Smith" {...register("name")} />
                    {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="jane@company.com" {...register("email")} />
                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="subject">Subject</Label>
                  <select
                    id="subject"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    {...register("subject")}
                  >
                    <option value="sales">Sales inquiry</option>
                    <option value="support">Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="press">Press</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us how we can help…"
                    {...register("message")}
                  />
                  {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
                </div>

                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Sending…" : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
