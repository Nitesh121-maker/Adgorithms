// Minimal mock endpoint to record clicks
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  // In a real app, persist click { id, timestamp, ip, userAgent } to your datastore.
  // Here, we just acknowledge.
  if (!body?.id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 })
  return NextResponse.json({ ok: true })
}
