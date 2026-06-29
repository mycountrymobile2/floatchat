"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

// Bump this string whenever the AUP / Terms / Privacy materially changes — the
// version we log in aup_attestations is what proves which document version the
// user agreed to. Format: <doc-version>-<effective-date>.
const AUP_VERSION = "v2.0-2026-05-20"

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  attestation: z
    .boolean()
    .refine((v) => v === true, "You must agree to the AUP, Terms, and Privacy Policy to sign up."),
})
type FormData = z.infer<typeof schema>

async function logAttestation(email: string) {
  // Best-effort: log the attestation independently of the auth signup so the
  // record exists even if there's a transient supabase failure. Don't block UI.
  try {
    await fetch("/api/aup-attestation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        aup_version: AUP_VERSION,
        method: "signup_form",
      }),
    })
  } catch {
    // Swallow — we still want signup to succeed if logging fails.
  }
}

const perks = [
  "Free plan — no credit card",
  "Live chat, email & WhatsApp included",
  "AI Captain from $9.99",
  "Cancel anytime",
]

export default function SignupPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const plan = searchParams.get("plan") || "free"
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [attestationChecked, setAttestationChecked] = useState(false)

  useEffect(() => {
    document.title = "Create your FloatChat account — free forever"
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute("content", "Sign up free. No credit card. Live chat, email, and WhatsApp in one inbox.")
  }, [])

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { attestation: false },
  })

  async function onSubmit(data: FormData) {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: { data: { full_name: data.name, plan } },
      })
      if (error) throw error
      // Log the attestation in parallel with the redirect — non-blocking.
      logAttestation(data.email)
      toast.success("Check your email to confirm your account.")
      navigate("/dashboard")
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong"
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    if (!attestationChecked) {
      toast.error("Please agree to the AUP, Terms, and Privacy Policy first.")
      return
    }
    // Log attestation for OAuth flow too (we don't know their email yet, log
    // the placeholder "oauth_google" and update later via the auth callback).
    logAttestation("oauth_google_pending")
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })
    if (error) toast.error(error.message)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary/5 border-r border-border flex-col justify-between p-12">
        <Link to="/" aria-label="FloatChat home">
          <img src="/logo_floatchat.svg" alt="FloatChat" className="h-8 w-auto" />
        </Link>
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-foreground mb-8"
          >
            Start free. Grow at your pace.
          </motion.h2>
          <ul className="space-y-4">
            {perks.map((perk, i) => (
              <motion.li
                key={perk}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="flex items-center gap-3 text-foreground"
              >
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                {perk}
              </motion.li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link to="/" aria-label="FloatChat home">
              <img src="/logo_floatchat.svg" alt="FloatChat" className="h-8 w-auto" />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-foreground mb-1">
              {plan === "free" ? "Create your free account" : `Start your ${plan} plan`}
            </h1>
            <p className="text-sm text-muted-foreground mb-8">
              No credit card required. Cancel anytime.
            </p>

            {/* Google OAuth */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 gap-2 mb-6"
              onClick={handleGoogle}
              disabled={!attestationChecked}
              title={!attestationChecked ? "Agree to the AUP first" : undefined}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </Button>

            <div className="relative mb-6">
              <Separator />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="bg-background px-2 text-xs text-muted-foreground">or continue with email</span>
              </span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" placeholder="Jane Smith" {...register("name")} />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Work email</Label>
                <Input id="email" type="email" placeholder="jane@company.com" {...register("email")} />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPw ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    className="pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPw(!showPw)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
              </div>

              {/* AUP Attestation — required to enable Signup. The version string
                  is logged with the user's email so we can prove which version
                  of the policy they agreed to. */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox
                    id="attestation"
                    checked={attestationChecked}
                    onCheckedChange={(v) => {
                      const checked = v === true
                      setAttestationChecked(checked)
                      setValue("attestation", checked, { shouldValidate: true })
                    }}
                    className="mt-0.5"
                    aria-required="true"
                  />
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    I have read and agree to FloatChat's{" "}
                    <Link to="/aup" className="text-foreground underline underline-offset-2 hover:text-primary" target="_blank">Acceptable Use Policy</Link>,{" "}
                    <Link to="/terms" className="text-foreground underline underline-offset-2 hover:text-primary" target="_blank">Terms of Service</Link>, and{" "}
                    <Link to="/privacy" className="text-foreground underline underline-offset-2 hover:text-primary" target="_blank">Privacy Policy</Link>.
                  </span>
                </label>
                {errors.attestation && (
                  <p className="mt-2 text-xs text-destructive">{errors.attestation.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-11 gap-2"
                disabled={loading || !attestationChecked}
                title={!attestationChecked ? "Agree to the AUP first" : undefined}
              >
                {loading ? "Creating account…" : <>Create account <ArrowRight className="h-4 w-4" /></>}
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground lg:hidden">
              Already have an account?{" "}
              <Link to="/login" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">Sign in</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
