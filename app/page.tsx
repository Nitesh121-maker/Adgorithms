import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Rocket, BarChart3, Server } from "lucide-react"
import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <SiteNavbar />

      <main>
        {/* Hero Section */}
        <section
          className="relative w-full text-white"
          style={{ backgroundColor: "#2563eb" }}
          aria-labelledby="hero-title"
        >
          <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
            <h1
              id="hero-title"
              className="text-pretty text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow"
            >
              Welcome to the Mini AdTech Platform
            </h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-white">
              A simplified ad-serving and analytics system inspired by InMobi's technology.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild className="uppercase font-semibold">
                <Link href="/ad-viewer">Try Ad Viewer</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="uppercase font-semibold bg-white text-blue-600 border-white hover:bg-white/90"
              >
                <Link href="/analytics">View Analytics</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mx-auto max-w-6xl px-4 py-14 md:py-16">
          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<Rocket className="h-6 w-6 text-cyan-500" aria-hidden="true" />}
              title="Ad Serving Engine"
              description="Serve the best ads based on user interests."
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6 text-cyan-500" aria-hidden="true" />}
              title="Real-Time Analytics"
              description="Track impressions, clicks, and CTR in real time."
            />
            <FeatureCard
              icon={<Server className="h-6 w-6 text-cyan-500" aria-hidden="true" />}
              title="Full-Stack Simulation"
              description="Frontend in Next.js + Backend in Java Spring Boot."
            />
          </div>
        </section>

        {/* About Section */}
        <section className="bg-gray-50 border-y border-gray-900/10">
          <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-pretty">About This Project</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-900/80">
              This project demonstrates a simplified version of an ad-tech system. It includes a Java backend for
              ad-serving and a Next.js frontend for visualization. Inspired by InMobi's large-scale ad-serving platform.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="group rounded-2xl border border-gray-900/10 bg-white p-6 shadow-lg shadow-blue-100 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50">{icon}</div>
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-gray-900/80">{description}</p>
    </div>
  )
}
