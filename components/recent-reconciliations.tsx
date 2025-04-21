import Link from "next/link"
import { CheckCircle, Clock, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data for demonstration
const recentReconciliations = [
  {
    id: "REC-001",
    name: "April 2025 - Main Account",
    date: "2025-04-15",
    status: "completed",
    matches: 124,
    unmatched: 2,
  },
  {
    id: "REC-002",
    name: "April 2025 - Payroll Account",
    date: "2025-04-14",
    status: "in-progress",
    matches: 45,
    unmatched: 8,
  },
  {
    id: "REC-003",
    name: "March 2025 - Main Account",
    date: "2025-03-31",
    status: "completed",
    matches: 156,
    unmatched: 0,
  },
  {
    id: "REC-004",
    name: "March 2025 - Expense Account",
    date: "2025-03-30",
    status: "failed",
    matches: 23,
    unmatched: 12,
  },
]

export function RecentReconciliations() {
  return (
    <Card className="border-[#3D0000]">
      <CardHeader>
        <CardTitle>Recent Reconciliations</CardTitle>
        <CardDescription>You have {recentReconciliations.length} recent reconciliation processes.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Matches</TableHead>
              <TableHead>Unmatched</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentReconciliations.map((rec) => (
              <TableRow key={rec.id}>
                <TableCell className="font-medium">{rec.id}</TableCell>
                <TableCell>{rec.name}</TableCell>
                <TableCell>{rec.date}</TableCell>
                <TableCell>
                  {rec.status === "completed" && (
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-[#950101]" />
                      <span>Completed</span>
                    </div>
                  )}
                  {rec.status === "in-progress" && (
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-[#FF0000]" />
                      <span>In Progress</span>
                    </div>
                  )}
                  {rec.status === "failed" && (
                    <div className="flex items-center">
                      <XCircle className="mr-2 h-4 w-4 text-[#3D0000]" />
                      <span>Failed</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>{rec.matches}</TableCell>
                <TableCell>{rec.unmatched}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/reconciliations/${rec.id}`}>
                    <Button variant="ghost" size="sm" className="hover:text-[#950101]">
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Link href="/reconciliations" className="w-full">
          <Button
            variant="outline"
            className="w-full border-[#3D0000] text-[#950101] hover:bg-[#950101] hover:text-white"
          >
            View All Reconciliations
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
