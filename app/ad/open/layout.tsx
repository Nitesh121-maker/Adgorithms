import type { ReactNode } from "react"
import SiteNavbar from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"

export default function OpenAdLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="mx-auto max-w-6xl px-4">
          <SiteNavbar />
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <SiteFooter />
        </div>
      </footer>
    </div>
  )
}
