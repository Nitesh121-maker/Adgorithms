import type React from "react"
import SiteNavbar from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
