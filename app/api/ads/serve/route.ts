// Minimal mock API to serve ad items based on category
import { NextResponse } from "next/server"

const ADS = [
  {
    id: "t1",
    title: "Ship faster with DevSuite",
    description: "All-in-one toolkit for modern engineering teams. Plans start free.",
    imageUrl: "/developer-tool-ad.png",
    clickUrl: "https://example.com/devsuite",
    advertiser: "DevSuite",
    category: "technology",
  },
  {
    id: "f1",
    title: "Style that moves with you",
    description: "Breathable fabrics, timeless cuts. Discover the new summer collection.",
    imageUrl: "/fashion-ad-lookbook.png",
    clickUrl: "https://example.com/fashion",
    advertiser: "AeroWear",
    category: "fashion",
  },
  {
    id: "g1",
    title: "Conquer new worlds",
    description: "Next‑gen graphics and ultra‑low latency. Play the latest AAA titles now.",
    imageUrl: "/gaming-ad-sci-fi.png",
    clickUrl: "https://example.com/gaming",
    advertiser: "NovaPlay",
    category: "gaming",
  },
  {
    id: "fi1",
    title: "Grow your savings smarter",
    description: "Automated portfolios with human insight. Start with $10.",
    imageUrl: "/finance-ad-growth.png",
    clickUrl: "https://example.com/finance",
    advertiser: "OakVest",
    category: "finance",
  },
  {
    id: "tr1",
    title: "See more, spend less",
    description: "Flexible stays and curated experiences in 100+ countries.",
    imageUrl: "/travel-ad-beach.png",
    clickUrl: "https://example.com/travel",
    advertiser: "Roamly",
    category: "travel",
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")?.toLowerCase() || "all"

  const pool = category === "all" ? ADS : ADS.filter((a) => a.category === category)
  if (pool.length === 0) return NextResponse.json({ message: "No ads" }, { status: 404 })

  const ad = pool[Math.floor(Math.random() * pool.length)]
  return NextResponse.json(ad)
}
