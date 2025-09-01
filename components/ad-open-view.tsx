"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type AdItem = {
  id: string
  title?: string
  tagline?: string
  imageUrl?: string
  clickUrl?: string
  advertiser?: string
  category?: "all" | "technology" | "fashion" | "gaming" | "finance" | "travel"
  description?: string
}

export default function AdOpenView() {
  const router = useRouter()
  const [ad, setAd] = React.useState<AdItem | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem("lastAd")
      if (raw) setAd(JSON.parse(raw) as AdItem)
    } catch (e) {
      // console.log("[v0] Failed to parse lastAd:", e)
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="h-6 w-40 bg-muted rounded" />
          <div className="h-4 w-64 bg-muted rounded mt-2" />
        </CardHeader>
        <CardContent>
          <div className="aspect-video w-full bg-muted rounded mb-4" />
          <div className="h-4 w-3/4 bg-muted rounded mb-2" />
          <div className="h-4 w-1/2 bg-muted rounded" />
        </CardContent>
      </Card>
    )
  }

  if (!ad) {
    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Ad not found</CardTitle>
          <CardDescription>Open an ad from the Ad Viewer first.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => router.push("/ad-viewer")}>Go to Ad Viewer</Button>
        </CardContent>
      </Card>
    )
  }

  const {
    id,
    title = "Sponsored Content",
    advertiser = "Sponsored",
    category,
    tagline,
    description,
    imageUrl,
    clickUrl,
  } = ad

  return (
    <Card className="max-w-4xl mx-auto shadow-sm">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Sponsored</Badge>
            {category ? <Badge className="capitalize">{category}</Badge> : null}
          </div>
          <span className="text-xs text-muted-foreground">Ad ID: {id}</span>
        </div>
        <CardTitle className="text-pretty">{title}</CardTitle>
        <CardDescription className="text-pretty">
          {advertiser}
          {tagline ? ` • ${tagline}` : ""}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="w-full overflow-hidden rounded-lg border bg-card">
          <div className="aspect-video relative">
            <Image
              src={imageUrl || "/placeholder.svg?height=540&width=960&query=ad%20creative%2016x9"}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 960px"
              priority
            />
          </div>
        </div>

        {description ? (
          <>
            <p className="text-muted-foreground text-pretty leading-relaxed">{description}</p>
            <Separator />
          </>
        ) : null}

        <div className="flex flex-col sm:flex-row gap-3">
          {clickUrl ? (
            <Link href={clickUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button className="w-full">Open advertiser site</Button>
            </Link>
          ) : null}
          <Button variant="secondary" className="w-full sm:w-auto" onClick={() => router.push("/ad-viewer")}>
            Back to Ad Viewer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
