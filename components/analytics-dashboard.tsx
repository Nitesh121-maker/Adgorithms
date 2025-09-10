"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Plus, TrendingUp, Users, Eye } from "lucide-react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts"

type AdStat = {
  id: string
  category: string
  impressions: number
  clicks: number
}

type UserPost = {
  id: string
  title: string
  category: string
  sponsoredBy: string
  impressions: number
  clicks: number
  ctr: number
  createdAt: string
  status: "active" | "paused" | "draft"
}

const mockUserPosts: UserPost[] = [
  {
    id: "USR-001",
    title: "Revolutionary AI Tool Launch",
    category: "Technology",
    sponsoredBy: "TechCorp Inc",
    impressions: 15420,
    clicks: 462,
    ctr: 3.0,
    createdAt: "2024-01-15",
    status: "active",
  },
  {
    id: "USR-002",
    title: "Summer Fashion Collection",
    category: "Fashion",
    sponsoredBy: "StyleBrand",
    impressions: 12800,
    clicks: 384,
    ctr: 3.0,
    createdAt: "2024-01-10",
    status: "active",
  },
]

const mockTimeAnalytics = {
  day: [
    { period: "Mon", impressions: 1200, clicks: 36, visitors: 890 },
    { period: "Tue", impressions: 1450, clicks: 43, visitors: 1020 },
    { period: "Wed", impressions: 1680, clicks: 50, visitors: 1180 },
    { period: "Thu", impressions: 1320, clicks: 40, visitors: 950 },
    { period: "Fri", impressions: 1890, clicks: 57, visitors: 1340 },
    { period: "Sat", impressions: 2100, clicks: 63, visitors: 1500 },
    { period: "Sun", impressions: 1780, clicks: 53, visitors: 1280 },
  ],
  month: [
    { period: "Jan", impressions: 45000, clicks: 1350, visitors: 32000 },
    { period: "Feb", impressions: 52000, clicks: 1560, visitors: 37000 },
    { period: "Mar", impressions: 48000, clicks: 1440, visitors: 34000 },
  ],
  year: [
    { period: "2022", impressions: 480000, clicks: 14400, visitors: 340000 },
    { period: "2023", impressions: 620000, clicks: 18600, visitors: 440000 },
    { period: "2024", impressions: 145000, clicks: 4350, visitors: 103000 },
  ],
}

const mockDemographics = [
  { ageGroup: "18-24", percentage: 25, count: 12500 },
  { ageGroup: "25-34", percentage: 35, count: 17500 },
  { ageGroup: "35-44", percentage: 22, count: 11000 },
  { ageGroup: "45-54", percentage: 12, count: 6000 },
  { ageGroup: "55+", percentage: 6, count: 3000 },
]

const COLORS = ["#2563eb", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444"]

const fetcher = async (url: string): Promise<AdStat[]> => {
  const r = await fetch(url, { cache: "no-store" })
  if (!r.ok) throw new Error(`Request failed (${r.status})`)
  const json = await r.json()
  return Array.isArray(json) ? json : (json?.ads ?? [])
}

export default function AnalyticsDashboard() {
  const { user } = useAuth()
  const [timePeriod, setTimePeriod] = useState<"day" | "month" | "year">("day")

  const { data, error, isLoading, mutate } = useSWR<AdStat[]>("/api/analytics", fetcher, {
    revalidateOnFocus: false,
  })

  useEffect(() => {
    const id = setInterval(() => {
      mutate()
    }, 10000)
    return () => clearInterval(id)
  }, [mutate])

  const rows: (AdStat & { ctr: number })[] =
    (data ?? []).map((d) => ({
      ...d,
      ctr: d.impressions > 0 ? (d.clicks / d.impressions) * 100 : 0,
    })) ?? []

  const nf = new Intl.NumberFormat()

  const AccountSection = () => {
    const topPosts = mockUserPosts.sort((a, b) => b.impressions - a.impressions).slice(0, 10)

    const timeData = mockTimeAnalytics[timePeriod]

    return (
      <div className="space-y-6">
        {/* User Dashboard Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">My Account Dashboard</h2>
            <p className="text-muted-foreground">Welcome back, {user?.name || user?.email}</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create New Ad
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Total Impressions</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {mockUserPosts.reduce((sum, post) => sum + post.impressions, 0).toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Total Clicks</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {mockUserPosts.reduce((sum, post) => sum + post.clicks, 0).toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">Active Ads</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {mockUserPosts.filter((post) => post.status === "active").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium">Avg CTR</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {(mockUserPosts.reduce((sum, post) => sum + post.ctr, 0) / mockUserPosts.length).toFixed(2)}%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Top 10 Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Performing Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Impressions</TableHead>
                  <TableHead className="text-right">Clicks</TableHead>
                  <TableHead className="text-right">CTR</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.category}</TableCell>
                    <TableCell>
                      <Badge variant={post.status === "active" ? "default" : "secondary"}>{post.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{post.impressions.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{post.clicks.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{post.ctr.toFixed(2)}%</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => (window.location.href = `/edit-ad/${post.id}`)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Time-based Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Performance Over Time</CardTitle>
                <Select value={timePeriod} onValueChange={(value: "day" | "month" | "year") => setTimePeriod(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Daily</SelectItem>
                    <SelectItem value="month">Monthly</SelectItem>
                    <SelectItem value="year">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeData}>
                  <XAxis dataKey="period" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="impressions" stroke="#2563eb" strokeWidth={2} />
                  <Line type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Demographics */}
          <Card>
            <CardHeader>
              <CardTitle>Visitor Demographics (Age Groups)</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockDemographics}
                    dataKey="percentage"
                    nameKey="ageGroup"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {mockDemographics.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <RechartsTooltip formatter={(v: any) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-pretty bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Ad Performance Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">Live metrics refresh every 10 seconds.</p>
      </header>

      {/* Tabs for Analytics and Account sections */}
      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="analytics">Analytics Overview</TabsTrigger>
          <TabsTrigger value="account">My Account</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="rounded-xl shadow-lg">
            <CardHeader className="px-6 pt-6 pb-0">
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="px-6 py-6">
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-5 w-36" />
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="grid grid-cols-5 gap-3">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-28" />
                        <Skeleton className="h-5 w-20 justify-self-end" />
                        <Skeleton className="h-5 w-16 justify-self-end" />
                        <Skeleton className="h-5 w-16 justify-self-end" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : error ? (
                <p className="text-sm text-red-600">Failed to load analytics.</p>
              ) : rows.length === 0 ? (
                <p className="text-sm text-muted-foreground">No data available.</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b">
                        <TableHead className="font-semibold text-primary">Ad ID</TableHead>
                        <TableHead className="font-semibold text-primary">Category</TableHead>
                        <TableHead className="text-right font-semibold text-primary">Impressions</TableHead>
                        <TableHead className="text-right font-semibold text-primary">Clicks</TableHead>
                        <TableHead className="text-right font-semibold text-primary">CTR (%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.map((row, idx) => (
                        <TableRow
                          key={row.id}
                          className={`transition-colors hover:bg-muted/50 ${idx % 2 === 0 ? "bg-muted/30" : ""}`}
                        >
                          <TableCell className="font-medium">{row.id}</TableCell>
                          <TableCell>{row.category}</TableCell>
                          <TableCell className="text-right">{nf.format(row.impressions)}</TableCell>
                          <TableCell className="text-right">{nf.format(row.clicks)}</TableCell>
                          <TableCell className="text-right">{row.ctr.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="rounded-xl shadow-lg">
              <CardHeader className="px-6 pt-6 pb-0">
                <CardTitle>Impressions per Ad</CardTitle>
              </CardHeader>
              <CardContent className="px-6 py-8 h-80">
                {isLoading ? (
                  <Skeleton aria-busy="true" className="h-full w-full rounded-lg" />
                ) : rows.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rows}>
                      <XAxis dataKey="id" />
                      <YAxis />
                      <RechartsTooltip />
                      <Bar dataKey="impressions" fill="#2563eb" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-sm text-muted-foreground">No data to display.</p>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-lg">
              <CardHeader className="px-6 pt-6 pb-0">
                <CardTitle>CTR by Ad (%)</CardTitle>
              </CardHeader>
              <CardContent className="px-6 py-8 h-80">
                {isLoading ? (
                  <Skeleton aria-busy="true" className="h-full w-full rounded-lg" />
                ) : rows.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={rows} dataKey="ctr" nameKey="id" innerRadius={60} outerRadius={90} paddingAngle={2}>
                        {rows.map((_, idx) => (
                          <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <RechartsTooltip formatter={(v: any) => `${Number(v).toFixed(2)}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-sm text-muted-foreground">No data to display.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="account">
          <AccountSection />
        </TabsContent>
      </Tabs>
    </section>
  )
}
