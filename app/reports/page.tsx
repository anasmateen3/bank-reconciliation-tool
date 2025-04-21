"use client"

import { useState } from "react"
import { Calendar, Download, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { RevenueChart } from "@/components/revenue-chart"
import { ReconciliationPieChart } from "@/components/reconciliation-pie-chart"
import { MonthlyTrendsChart } from "@/components/monthly-trends-chart"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("last-30")
  const [accountFilter, setAccountFilter] = useState("all")

  return (
    <DashboardShell>
      <DashboardHeader heading="Reports" text="View detailed analytics and reports for your reconciliation processes.">
        <Button className="bg-[#950101] hover:bg-[#FF0000]">
          <Download className="mr-2 h-4 w-4" />
          Export Reports
        </Button>
      </DashboardHeader>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#950101]" />
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px] border-[#3D0000]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7">Last 7 days</SelectItem>
              <SelectItem value="last-30">Last 30 days</SelectItem>
              <SelectItem value="last-90">Last 90 days</SelectItem>
              <SelectItem value="year-to-date">Year to date</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#950101]" />
          <Select value={accountFilter} onValueChange={setAccountFilter}>
            <SelectTrigger className="w-[200px] border-[#3D0000]">
              <SelectValue placeholder="Filter by account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Accounts</SelectItem>
              <SelectItem value="main">Main Operating Account</SelectItem>
              <SelectItem value="payroll">Payroll Account</SelectItem>
              <SelectItem value="savings">Savings Account</SelectItem>
              <SelectItem value="tax">Tax Account</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted/20 border">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#950101] data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="reconciliation"
            className="data-[state=active]:bg-[#950101] data-[state=active]:text-white"
          >
            Reconciliation Status
          </TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-[#950101] data-[state=active]:text-white">
            Monthly Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-[#3D0000]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reconciliations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+8% from previous period</p>
              </CardContent>
            </Card>
            <Card className="border-[#3D0000]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Matched Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,432</div>
                <p className="text-xs text-muted-foreground">+12% from previous period</p>
              </CardContent>
            </Card>
            <Card className="border-[#3D0000]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unmatched Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68</div>
                <p className="text-xs text-muted-foreground">-5% from previous period</p>
              </CardContent>
            </Card>
            <Card className="border-[#3D0000]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Match Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95.5%</div>
                <p className="text-xs text-muted-foreground">+2.3% from previous period</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-[#3D0000]">
              <CardHeader>
                <CardTitle>Reconciliation Status</CardTitle>
                <CardDescription>Distribution of reconciliation statuses</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ReconciliationPieChart />
              </CardContent>
            </Card>
            <Card className="border-[#3D0000]">
              <CardHeader>
                <CardTitle>Transaction Volume</CardTitle>
                <CardDescription>Total transaction volume by account</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <RevenueChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reconciliation" className="space-y-4">
          <Card className="border-[#3D0000]">
            <CardHeader>
              <CardTitle>Reconciliation Performance</CardTitle>
              <CardDescription>Detailed breakdown of reconciliation performance by account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ReconciliationPieChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card className="border-[#3D0000]">
            <CardHeader>
              <CardTitle>Monthly Reconciliation Trends</CardTitle>
              <CardDescription>View trends in reconciliation performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <MonthlyTrendsChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
