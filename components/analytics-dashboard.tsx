"use client"

import { useEffect } from "react"
import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
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
} from "recharts"

type AdStat = {
  id: string
  category: string
  impressions: number
  clicks: number
}

const fetcher = async (url: string): Promise<AdStat[]> => {
  const r = await fetch(url, { cache: "no-store" })
  if (!r.ok) throw new Error(`Request failed (${r.status})`)
  const json = await r.json()
  return Array.isArray(json) ? json : (json?.ads ?? [])
}

const COLORS = ["#2563eb", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444"]

export default function AnalyticsDashboard() {
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

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-pretty bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Ad Performance Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">Live metrics refresh every 10 seconds.</p>
      </header>

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
    </section>
  )
}
