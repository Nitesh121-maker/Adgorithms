"use client"

import type React from "react"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"

type Category = "technology" | "fashion" | "gaming" | "finance" | "travel"

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "technology", label: "Technology" },
  { value: "fashion", label: "Fashion" },
  { value: "gaming", label: "Gaming" },
  { value: "finance", label: "Finance" },
  { value: "travel", label: "Travel" },
]

type FormState = {
  category: Category | ""
  sponsoredBy: string
  heading: string
  imageFolder: string
}

export function PostAdForm({
  className,
}: {
  className?: string
}) {
  const router = useRouter()
  const { user } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>({
    category: "",
    sponsoredBy: "",
    heading: "",
    imageFolder: "",
  })

  // If not logged in, redirect to /login (client-side guard, demo-friendly)
  useEffect(() => {
    if (!user) {
      router.replace("/login")
    }
  }, [user, router])

  const isValid = useMemo(() => {
    return (
      !!form.category &&
      form.sponsoredBy.trim().length > 0 &&
      form.heading.trim().length > 0 &&
      form.imageFolder.trim().length > 0
    )
  }, [form])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!isValid) {
      setError("Please fill in all required fields.")
      return
    }
    if (!user) {
      setError("You must be logged in to post an ad.")
      router.replace("/login")
      return
    }

    try {
      setSubmitting(true)

      // Persist to localStorage as a demo backend
      const key = "user_ads"
      const existingRaw = typeof window !== "undefined" ? localStorage.getItem(key) : null
      const existing: any[] = existingRaw ? JSON.parse(existingRaw) : []

      const newAd = {
        id: `AD-${Date.now()}`,
        userId: user?.id || user?.email || "demo-user",
        category: form.category,
        sponsoredBy: form.sponsoredBy.trim(),
        heading: form.heading.trim(),
        imageFolder: form.imageFolder.trim(), // path or folder name as provided
        createdAt: new Date().toISOString(),
      }

      const next = [newAd, ...existing]
      localStorage.setItem(key, JSON.stringify(next))

      setSuccess("Ad posted successfully.")
      setForm({
        category: "",
        sponsoredBy: "",
        heading: "",
        imageFolder: "",
      })
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong while posting the ad.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className={cn("max-w-xl w-full", className)}>
      <CardHeader>
        <CardTitle className="text-balance">Post a New Ad</CardTitle>
        <CardDescription>Only logged-in users can post ads.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={form.category || undefined}
                onValueChange={(val: Category) => setForm((f) => ({ ...f, category: val }))}
              >
                <SelectTrigger id="category" aria-label="Category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="sponsoredBy">Sponsored by</Label>
              <Input
                id="sponsoredBy"
                placeholder="e.g., Acme Inc."
                value={form.sponsoredBy}
                onChange={(e) => setForm((f) => ({ ...f, sponsoredBy: e.target.value }))}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="heading">Heading</Label>
              <Input
                id="heading"
                placeholder="e.g., Supercharge your workflow"
                value={form.heading}
                onChange={(e) => setForm((f) => ({ ...f, heading: e.target.value }))}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="imageFolder">Image folder</Label>
              <Input
                id="imageFolder"
                placeholder="e.g., /images/ads/technology"
                value={form.imageFolder}
                onChange={(e) => setForm((f) => ({ ...f, imageFolder: e.target.value }))}
                required
              />
              <p className="text-xs text-muted-foreground">
                Provide a folder path or identifier where the ad’s images are stored.
              </p>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" role="alert">
              <AlertTitle>Submission error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert role="status">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-end">
            <Button type="submit" disabled={!isValid || submitting} aria-busy={submitting}>
              {submitting ? "Posting..." : "Post Ad"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default PostAdForm
