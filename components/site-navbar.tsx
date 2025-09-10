"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"

export function SiteNavbar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const linkClasses = (href: string) =>
    cn(
      "text-sm font-medium transition-colors",
      pathname === href ? "text-gray-900" : "text-gray-900/70 hover:text-gray-900",
    )

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-900/10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="inline-flex items-center gap-2" aria-label="Mini AdTech Platform Home">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent font-extrabold tracking-tight">
            Mini AdTech Platform
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/" className={linkClasses("/")}>
            Home
          </Link>
          <Link href="/ad-viewer" className={linkClasses("/ad-viewer")}>
            Ad Viewer
          </Link>
          <Link href="/analytics" className={linkClasses("/analytics")}>
            Analytics
          </Link>
          <Link href="/pricing" className={linkClasses("/pricing")}>
            Pricing
          </Link>

          {/* Auth controls */}
          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/post-ad">
                <Button size="sm">Post Ad</Button>
              </Link>
              <Button size="sm" variant="outline" onClick={logout} aria-label="Log out">
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button size="sm" variant="ghost">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default SiteNavbar
