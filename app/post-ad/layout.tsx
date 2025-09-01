import type { ReactNode } from "react"
import SiteNavbar from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"

export default function PostAdLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <SiteNavbar />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  )
}
