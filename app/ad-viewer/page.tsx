"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import AdViewer from "@/components/ad-viewer"

export default function AdViewerPage() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/" className="font-heading text-lg font-bold tracking-tight text-primary">
              Mini AdTech Platform
              <span className="sr-only">Home</span>
            </Link>
            {/* <div className="flex-1 max-w-xl">
              <form
                role="search"
                className="flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault()
                }}
              >
                <Input type="search" placeholder="Search ads, advertisers..." aria-label="Search" className="w-full" />
                <Button type="submit" variant="secondary">
                  Search
                </Button>
              </form>
            </div> */}
            <nav className="hidden sm:flex items-center gap-4">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/analytics" className="text-sm text-muted-foreground hover:text-foreground">
                Analytics
              </Link>
              {/* <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </Link> */}
              <Link href="/ad-viewer" className="text-sm text-muted-foreground hover:text-foreground">
                Ad Viewer
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-8">
        <AdViewer />
      </main>

      <footer className="border-t">
        <div className="container mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} AdTech. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
