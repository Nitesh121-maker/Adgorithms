import { NextResponse } from "next/server"

export async function GET() {
  // Static mock data to make the dashboard immediately functional.
  // Replace with your real analytics source when available.
  const ads = [
    { id: "DEV-101", category: "Technology", impressions: 12500, clicks: 310, ctr: (310 / 12500) * 100 },
    { id: "FASH-204", category: "Fashion", impressions: 9800, clicks: 196, ctr: (196 / 9800) * 100 },
    { id: "GAME-301", category: "Gaming", impressions: 15600, clicks: 468, ctr: (468 / 15600) * 100 },
    { id: "FIN-412", category: "Finance", impressions: 11200, clicks: 224, ctr: (224 / 11200) * 100 },
    { id: "TRAV-509", category: "Travel", impressions: 14100, clicks: 212, ctr: (212 / 14100) * 100 },
  ]

  return NextResponse.json({ ads })
}
