import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-900/10 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="text-sm text-gray-900/70">
            <ul className="flex items-center gap-4">
              <li>
                <Link href="/" className="hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/ad-viewer" className="hover:text-gray-900">
                  Ad Viewer
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-gray-900">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-gray-900">
                  Pricing
                </Link>
              </li>
            </ul>
          </nav>
          <p className="text-xs text-gray-900/70">© 2025 Mini AdTech Platform. Built with Java & Next.js.</p>
        </div>
      </div>
    </footer>
  )
}
