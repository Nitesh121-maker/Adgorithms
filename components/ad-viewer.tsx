"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

type Category = "all" | "technology" | "fashion" | "gaming" | "finance" | "travel"

type AdItem = {
  id: string
  title: string
  tagline: string
  imageUrl: string
  clickUrl: string
  advertiser: string
  category: Category
}

const CATEGORIES: Category[] = ["all", "technology", "fashion", "gaming", "finance", "travel"]

// Static preview dataset to match design brief (images are included in /public)
const ADS: AdItem[] = [
  {
    id: "t1",
    title: "Ship faster with DevSuite",
    tagline: "All‑in‑one toolkit for modern teams.",
    imageUrl: "/technology-developer-tool-ad.png",
    clickUrl: "https://example.com/devsuite",
    advertiser: "DevSuite",
    category: "technology",
  },
  {
    id: "f1",
    title: "Summer Lookbook 2025",
    tagline: "Breathable fabrics, timeless cuts.",
    imageUrl: "/fashion-summer-lookbook-ad.png",
    clickUrl: "https://example.com/fashion",
    advertiser: "AeroWear",
    category: "fashion",
  },
  {
    id: "g1",
    title: "Conquer new worlds",
    tagline: "Next‑gen graphics and ultra‑low latency.",
    imageUrl: "/gaming-sci-fi-action-ad.png",
    clickUrl: "https://example.com/gaming",
    advertiser: "NovaPlay",
    category: "gaming",
  },
  {
    id: "fi1",
    title: "Grow your savings smarter",
    tagline: "Automated portfolios with human insight.",
    imageUrl: "/finance-growth-chart-ad.png",
    clickUrl: "https://example.com/finance",
    advertiser: "OakVest",
    category: "finance",
  },
  {
    id: "tr1",
    title: "See more, spend less",
    tagline: "Flexible stays and curated experiences.",
    imageUrl: "/travel-beach-sunset-ad.png",
    clickUrl: "https://example.com/travel",
    advertiser: "Roamly",
    category: "travel",
  },
]

export default function AdViewer() {
  const [active, setActive] = useState<Category>("all")
  const [clickingId, setClickingId] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const filtered = useMemo(() => (active === "all" ? ADS : ADS.filter((a) => a.category === active)), [active])

  async function handleClick(ad: AdItem) {
    setClickingId(ad.id)
    setError(null)
    setSuccess(null)
    try {
      // Save selected ad so /ad/open can render it
      window.localStorage.setItem("lastAd", JSON.stringify(ad))

      // best-effort click record (non-blocking UX)
      const res = await fetch("/api/ads/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: ad.id }),
      }).catch(() => null)

      if (res && !res.ok) {
        // record the error but continue to open the ad page
        setError(`Failed to register click (${res.status})`)
      } else {
        setSuccess(`Click recorded for ${ad.title}`)
        setTimeout(() => setSuccess(null), 2000)
      }

      // Navigate to internal ad display page with same header/footer
      router.push("/ad/open")
    } catch (e: any) {
      setError(e?.message ?? "Failed to register click")
      // Still navigate to show the ad
      router.push("/ad/open")
    } finally {
      setClickingId(null)
    }
  }

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="font-heading text-2xl tracking-tight text-pretty">Ad Viewer</h1>
        <p className="text-sm text-muted-foreground">
          Pick a category to explore sponsored creatives. Click a card to view details and record engagement.
        </p>
      </header>

      {/* Status banners */}
      {error && (
        <Alert variant="destructive" role="alert" aria-live="assertive">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert role="status" aria-live="polite">
          <AlertTitle>Ad clicked</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Category filter bar */}
      <div className="no-scrollbar -mx-4 overflow-x-auto px-4">
        <div className="flex items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat
            return (
              <Button
                key={cat}
                variant={isActive ? "default" : "secondary"}
                className={cn(
                  "capitalize",
                  isActive ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
                )}
                onClick={() => setActive(cat)}
                aria-pressed={isActive}
              >
                {cat}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Ad grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((ad) => (
          <Card
            key={ad.id}
            className="overflow-hidden bg-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-video">
              <Image
                src={ad.imageUrl || "/placeholder.svg?height=360&width=640&query=ad%20creative%20preview"}
                alt={`${ad.title} by ${ad.advertiser}`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                priority={false}
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-balance">{ad.title}</CardTitle>
                <Badge variant="secondary" className="capitalize">
                  {ad.category}
                </Badge>
              </div>
              <CardDescription className="text-pretty">{ad.tagline}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge>Sponsored</Badge>
                <p className="text-sm text-muted-foreground">by {ad.advertiser}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleClick(ad)}
                disabled={clickingId === ad.id}
                aria-busy={clickingId === ad.id}
              >
                {clickingId === ad.id ? "Opening..." : "Open Ad"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
