import type { ReactNode } from "react"
import SiteNavbar from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <SiteNavbar />
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="border-t">
        <SiteFooter />
      </footer>
    </div>
  )
}
