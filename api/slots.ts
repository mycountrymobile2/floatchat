/**
 * Returns the demo slots that are already booked, so the /demo wizard can grey
 * them out. Each entry is a `slot_key` — the absolute UTC instant of a booked
 * date/time/timezone (see api/book-demo.ts).
 *
 * Public (no auth) — it only exposes which slots are taken, no personal data.
 *
 * Env: DATABASE_URL — injected by the Vercel Postgres integration.
 */
import { neon } from "@neondatabase/serverless"

export default async function handler(_req: any, res: any) {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
  if (!connectionString) {
    res.status(200).json({ booked: [] })
    return
  }

  try {
    const sql = neon(connectionString)
    // Self-healing: ensure the column exists so a fresh DB doesn't error.
    await sql`ALTER TABLE demo_bookings ADD COLUMN IF NOT EXISTS slot_key TEXT`
    const rows = await sql`
      SELECT DISTINCT slot_key FROM demo_bookings
      WHERE slot_key IS NOT NULL AND slot_key >= ${new Date(Date.now() - 864e5).toISOString()}
    `
    res.status(200).json({ booked: rows.map((r: any) => r.slot_key) })
  } catch {
    // Best-effort — if the lookup fails the wizard still works, just without
    // greying out taken slots (the booking endpoint still blocks conflicts).
    res.status(200).json({ booked: [] })
  }
}
