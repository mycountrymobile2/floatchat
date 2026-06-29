"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
})
type FormData = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = "Reset your FloatChat password"
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/dashboard`,
      })
      if (error) throw error
      setSent(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong"
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 text-center">
            <Link to="/" className="text-2xl font-bold gradient-text inline-block mb-6">FloatChat</Link>

            {sent ? (
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle2 className="h-12 w-12 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Check your email</h1>
                <p className="text-sm text-muted-foreground mb-8">
                  We sent a password reset link to your inbox. Click the link to create a new password.
                </p>
                <p className="text-sm text-muted-foreground">
                  <Link to="/login" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
                    Back to sign in
                  </Link>
                </p>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-foreground mb-1">Reset your password</h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email and we'll send you a reset link.
                </p>
              </>
            )}
          </div>

          {!sent && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="jane@company.com" {...register("email")} />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>

              <Button type="submit" className="w-full h-11" disabled={loading}>
                {loading ? "Sending…" : "Send reset link"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                <Link to="/login" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
                  Back to sign in
                </Link>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
