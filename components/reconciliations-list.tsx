"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CheckCircle, Clock, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Sample data for demonstration
const reconciliations = [
  {
    id: "REC-001",
    name: "April 2025 - Main Account",
    date: "2025-04-15",
    status: "completed",
    matches: 124,
    unmatched: 2,
    account: "Main Operating Account",
  },
  {
    id: "REC-002",
    name: "April 2025 - Payroll Account",
    date: "2025-04-14",
    status: "in-progress",
    matches: 45,
    unmatched: 8,
    account: "Payroll Account",
  },
  {
    id: "REC-003",
    name: "March 2025 - Main Account",
    date: "2025-03-31",
    status: "completed",
    matches: 156,
    unmatched: 0,
    account: "Main Operating Account",
  },
  {
    id: "REC-004",
    name: "March 2025 - Expense Account",
    date: "2025-03-30",
    status: "failed",
    matches: 23,
    unmatched: 12,
    account: "Expense Account",
  },
  {
    id: "REC-005",
    name: "February 2025 - Main Account",
    date: "2025-02-28",
    status: "completed",
    matches: 118,
    unmatched: 3,
    account: "Main Operating Account",
  },
  {
    id: "REC-006",
    name: "February 2025 - Payroll Account",
    date: "2025-02-28",
    status: "completed",
    matches: 42,
    unmatched: 0,
    account: "Payroll Account",
  },
  {
    id: "REC-007",
    name: "January 2025 - Main Account",
    date: "2025-01-31",
    status: "completed",
    matches: 132,
    unmatched: 5,
    account: "Main Operating Account",
  },
  {
    id: "REC-008",
    name: "January 2025 - Tax Account",
    date: "2025-01-31",
    status: "completed",
    matches: 15,
    unmatched: 0,
    account: "Tax Account",
  },
]

export function ReconciliationsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [filteredReconciliations, setFilteredReconciliations] = useState(reconciliations)

  useEffect(() => {
    let results = reconciliations

    // Apply search filter
    if (searchTerm) {
      results = results.filter(
        (rec) =>
          rec.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          rec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          rec.account.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      results = results.filter((rec) => rec.status === statusFilter)
    }

    setFilteredReconciliations(results)
  }, [searchTerm, statusFilter])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search reconciliations..."
            className="w-[300px] border-[#3D0000]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select defaultValue="all" value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] border-[#3D0000]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredReconciliations.length > 0 ? (
        <div className="rounded-md border border-[#3D0000]">
          <Table>
            <TableHeader className="bg-[#000000] text-white">
              <TableRow>
                <TableHead className="text-white">ID</TableHead>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Account</TableHead>
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Matches</TableHead>
                <TableHead className="text-white">Unmatched</TableHead>
                <TableHead className="text-right text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReconciliations.map((rec) => (
                <TableRow key={rec.id} className="hover:bg-[#950101]/5">
                  <TableCell className="font-medium">{rec.id}</TableCell>
                  <TableCell>{rec.name}</TableCell>
                  <TableCell>{rec.account}</TableCell>
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
        </div>
      ) : (
        <Alert className="bg-[#950101]/5 border-[#950101]">
          <AlertDescription>No reconciliations found matching your search criteria.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
