import type React from "react"
import SiteNavbar from "@/components/site-navbar"

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <SiteNavbar />
      <div className="flex-1">{children}</div>
      <footer className="border-t bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-muted-foreground">
          All rights reserved by Nitesh Chauhan
        </div>
      </footer>
    </div>
  )
}
