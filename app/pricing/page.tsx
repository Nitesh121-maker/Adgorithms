"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, MapPin } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

const indiaPlans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for getting started",
    features: ["1 Campaign / month", "500 Impressions", "Basic Analytics"],
    popular: false,
  },
  {
    name: "Starter",
    price: "₹499",
    period: "month",
    description: "Great for small businesses",
    features: ["10,000 Impressions OR 2,000 Clicks", "Category Targeting", "Analytics Dashboard"],
    popular: true,
  },
  {
    name: "Growth",
    price: "₹1,999",
    period: "month",
    description: "Scale your advertising",
    features: ["50,000 Impressions + 10,000 Clicks", "Advanced Analytics + CTR Insights", "Email Support"],
    popular: false,
  },
  {
    name: "Pro",
    price: "₹4,999",
    period: "month",
    description: "Enterprise-grade features",
    features: ["200,000 Impressions", "Geo-Targeting + A/B Testing", "Dedicated Account Manager"],
    popular: false,
  },
]

const internationalPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: ["1 Campaign / month", "500 Impressions", "Basic Analytics"],
    popular: false,
  },
  {
    name: "Starter",
    price: "$15",
    period: "month",
    description: "Great for small businesses",
    features: ["5,000 Impressions OR 1,000 Clicks", "Category Targeting", "Analytics Dashboard"],
    popular: true,
  },
  {
    name: "Growth",
    price: "$50",
    period: "month",
    description: "Scale your advertising",
    features: ["20,000 Impressions + 5,000 Clicks", "Advanced Analytics + CTR Insights", "Email Support"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$150",
    period: "month",
    description: "Enterprise-grade features",
    features: ["100,000 Impressions", "Geo-Targeting + A/B Testing", "Dedicated Account Manager"],
    popular: false,
  },
]

function detectUserRegion(): "india" | "international" {
  // Check timezone first
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  if (timezone.includes("Asia/Kolkata") || timezone.includes("Asia/Calcutta")) {
    return "india"
  }

  // Check locale as fallback
  const locale = navigator.language || navigator.languages?.[0] || ""
  if (locale.includes("hi") || locale.includes("IN")) {
    return "india"
  }

  return "international"
}

export default function PricingPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [detectedRegion, setDetectedRegion] = useState<"india" | "international">("international")
  const [isDetecting, setIsDetecting] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      const region = detectUserRegion()
      setDetectedRegion(region)
      setIsDetecting(false)
    }
  }, [user, loading, router])

  if (loading || isDetecting) {
    return (
      <div className="py-12 px-4">
        <div className="mx-auto max-w-6xl text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const currentPlans = detectedRegion === "india" ? indiaPlans : internationalPlans
  const regionFlag = detectedRegion === "india" ? "🇮🇳" : "🌍"
  const regionName = detectedRegion === "india" ? "India" : "International"

  return (
    <div className="py-12 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-4">
            Choose Your Plan – Grow Your Reach with Adgorithms
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Select the perfect plan for your advertising needs. Scale your campaigns and reach your target audience
            effectively.
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>
              Showing {regionFlag} {regionName} pricing based on your location
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {currentPlans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">Most Popular</Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period !== "forever" && <span className="text-muted-foreground">/{plan.period}</span>}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.name === "Free" ? "outline" : "default"}>
                  {plan.name === "Free" ? "Start Free" : "Upgrade Now"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center bg-muted/50 rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-2">Not sure which plan is right for you?</h3>
          <p className="text-muted-foreground mb-4">
            Our team is here to help you choose the perfect plan for your business needs.
          </p>
          <Button size="lg">Contact Us</Button>
        </div>
      </div>
    </div>
  )
}
