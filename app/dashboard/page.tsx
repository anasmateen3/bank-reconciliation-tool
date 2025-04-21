"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { RecentReconciliations } from "@/components/recent-reconciliations"
import { ReconciliationStats } from "@/components/reconciliation-stats"
import { UploadBankStatement } from "@/components/upload-bank-statement"
import { ReconciliationPieChart } from "@/components/reconciliation-pie-chart"
import { MonthlyTrendsChart } from "@/components/monthly-trends-chart"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["overview", "upload", "analytics"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="View your reconciliation status and start new reconciliations.">
        <Link href="/dashboard?tab=upload">
          <Button>New Reconciliation</Button>
        </Link>
      </DashboardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="upload">Upload Statements</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <ReconciliationStats />
          <RecentReconciliations />
        </TabsContent>
        <TabsContent value="upload" className="space-y-4">
          <UploadBankStatement />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reconciliation Analytics</CardTitle>
              <CardDescription>View detailed analytics about your reconciliation process.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="h-[300px] w-full">
                  <ReconciliationPieChart />
                </div>
                <div className="h-[300px] w-full">
                  <MonthlyTrendsChart />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
