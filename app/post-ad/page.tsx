"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type DraftAd = {
  heading: string
  sponsoredBy: string
  imageData: string // base64 data URL stored locally for demo
  imageName?: string
  category: "technology" | "fashion" | "gaming" | "finance" | "travel" | ""
  destination: string
  description: string
}

const CATEGORY_OPTIONS = [
  { value: "technology", label: "Technology" },
  { value: "fashion", label: "Fashion" },
  { value: "gaming", label: "Gaming" },
  { value: "finance", label: "Finance" },
  { value: "travel", label: "Travel" },
] as const

export default function PostAdPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState<DraftAd>({
    heading: "",
    sponsoredBy: "",
    imageData: "",
    imageName: "",
    category: "",
    destination: "",
    description: "",
  })

  useEffect(() => {
    if (!user) {
      router.replace("/login")
    }
  }, [user, router])

  function handleChange<K extends keyof DraftAd>(key: K, value: DraftAd[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Basic validations
    const isImage = file.type.startsWith("image/")
    const tooLarge = file.size > 5 * 1024 * 1024 // 5MB
    if (!isImage) {
      alert("Please select a valid image file.")
      return
    }
    if (tooLarge) {
      alert("Image must be 5MB or smaller.")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setForm((prev) => ({
        ...prev,
        imageData: result,
        imageName: file.name,
      }))
    }
    reader.readAsDataURL(file)
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return

    // Basic guard for required fields
    if (
      !form.heading.trim() ||
      !form.sponsoredBy.trim() ||
      !form.imageData ||
      !form.category ||
      !form.destination.trim()
    ) {
      return
    }

    setSaving(true)
    saveToLocalStorage(form)
    setSaving(false)
    router.push("/ad-viewer")
  }

  function saveToLocalStorage(ad: DraftAd) {
    const key = "user_ads"
    const raw = typeof window !== "undefined" ? localStorage.getItem(key) : null
    const list = raw ? (JSON.parse(raw) as DraftAd[]) : []
    list.unshift(ad)
    localStorage.setItem(key, JSON.stringify(list))
  }

  if (!user) return null

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="backdrop-blur-xl bg-background/60 border border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-balance">Post a new ad</CardTitle>
            <CardDescription>Fill in the details below. Only logged-in users can post ads.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="heading">Heading</Label>
                <Input
                  id="heading"
                  placeholder="e.g., Supercharge your workflow"
                  value={form.heading}
                  onChange={(e) => handleChange("heading", e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="sponsoredBy">Sponsored by</Label>
                <Input
                  id="sponsoredBy"
                  placeholder="e.g., Acme Inc."
                  value={form.sponsoredBy}
                  onChange={(e) => handleChange("sponsoredBy", e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(val) => handleChange("category", val as DraftAd["category"])}
                >
                  <SelectTrigger id="category" aria-label="Category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="adImage">Ad image</Label>
                <Input
                  id="adImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  aria-describedby="adImageHelp"
                />
                <p id="adImageHelp" className="text-xs text-muted-foreground">
                  Upload a JPG/PNG/SVG/WebP (max 5MB). We’ll store it locally for this demo.
                </p>

                {form.imageData ? (
                  <div className="mt-2">
                    <div className="text-xs text-muted-foreground">Selected: {form.imageName || "image"}</div>
                    <img
                      src={form.imageData || "/placeholder.svg"}
                      alt="Ad preview"
                      className="mt-2 aspect-video w-full rounded-md border object-cover"
                    />
                  </div>
                ) : null}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="destination">Destination URL</Label>
                <Input
                  id="destination"
                  type="url"
                  placeholder="https://example.com"
                  value={form.destination}
                  onChange={(e) => handleChange("destination", e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Optional short copy to describe the ad."
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>

              <Button type="submit" disabled={saving} aria-busy={saving}>
                {saving ? "Posting..." : "Post Ad"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
