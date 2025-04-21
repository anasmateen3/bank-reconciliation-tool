"use client"

import { useState } from "react"
import { CheckCircle, Filter, XCircle, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { RadioGroup, RadioItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

// Sample data for demonstration
const sampleTransactions = [
  {
    id: "T001",
    date: "2025-04-01",
    description: "Office Supplies Inc",
    amount: -245.67,
    status: "matched",
    matchConfidence: "high",
    bankRef: "REF123456",
    accountingRef: "INV-2025-0401",
  },
  {
    id: "T002",
    date: "2025-04-02",
    description: "Client Payment - ABC Corp",
    amount: 1500.0,
    status: "matched",
    matchConfidence: "high",
    bankRef: "REF789012",
    accountingRef: "PMT-2025-0402",
  },
  {
    id: "T003",
    date: "2025-04-03",
    description: "Monthly Rent",
    amount: -2000.0,
    status: "matched",
    matchConfidence: "high",
    bankRef: "REF345678",
    accountingRef: "EXP-2025-0403",
  },
  {
    id: "T004",
    date: "2025-04-05",
    description: "Internet Service Provider",
    amount: -89.99,
    status: "matched",
    matchConfidence: "medium",
    bankRef: "REF901234",
    accountingRef: "EXP-2025-0405",
  },
  {
    id: "T005",
    date: "2025-04-08",
    description: "Client Payment - XYZ Ltd",
    amount: 3250.0,
    status: "unmatched",
    matchConfidence: "none",
    bankRef: "REF567890",
    accountingRef: "",
  },
  {
    id: "T006",
    date: "2025-04-10",
    description: "Staff Lunch",
    amount: -125.45,
    status: "matched",
    matchConfidence: "low",
    bankRef: "REF123789",
    accountingRef: "EXP-2025-0410",
  },
  {
    id: "T007",
    date: "2025-04-12",
    description: "Software Subscription",
    amount: -49.99,
    status: "unmatched",
    matchConfidence: "none",
    bankRef: "REF456012",
    accountingRef: "",
  },
  {
    id: "T008",
    date: "2025-04-15",
    description: "Client Payment - DEF Inc",
    amount: 1875.5,
    status: "matched",
    matchConfidence: "high",
    bankRef: "REF789345",
    accountingRef: "PMT-2025-0415",
  },
]

export function ReconciliationDetails({ id }: { id: string }) {
  const [transactions, setTransactions] = useState(sampleTransactions)
  const [exportFormat, setExportFormat] = useState("csv")

  const approveTransaction = (transactionId: string) => {
    setTransactions(
      transactions.map((t) => (t.id === transactionId ? { ...t, status: "matched", matchConfidence: "high" } : t)),
    )
  }

  const rejectTransaction = (transactionId: string) => {
    setTransactions(
      transactions.map((t) => (t.id === transactionId ? { ...t, status: "unmatched", matchConfidence: "none" } : t)),
    )
  }

  const matchedTransactions = transactions.filter((t) => t.status === "matched")
  const unmatchedTransactions = transactions.filter((t) => t.status === "unmatched")

  const handleExport = () => {
    // In a real application, this would generate and download the file
    // For this demo, we'll just show a toast notification
    toast({
      title: "Export Successful",
      description: `Reconciliation data exported as .${exportFormat} file.`,
      duration: 3000,
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-[#3D0000]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.length}</div>
          </CardContent>
        </Card>
        <Card className="border-[#3D0000]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Matched</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{matchedTransactions.length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((matchedTransactions.length / transactions.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        <Card className="border-[#3D0000]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unmatched</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unmatchedTransactions.length}</div>
            <p className="text-xs text-muted-foreground">Requiring manual review</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="bg-muted/20 border">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#950101] data-[state=active]:text-white">
              All Transactions
            </TabsTrigger>
            <TabsTrigger value="matched" className="data-[state=active]:bg-[#950101] data-[state=active]:text-white">
              Matched
            </TabsTrigger>
            <TabsTrigger value="unmatched" className="data-[state=active]:bg-[#950101] data-[state=active]:text-white">
              Unmatched
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Input placeholder="Search transactions..." className="w-[250px] border-[#3D0000]" />
            <Button variant="outline" size="icon" className="border-[#3D0000]">
              <Filter className="h-4 w-4 text-[#950101]" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#950101] hover:bg-[#FF0000]">
                  <Download className="mr-2 h-4 w-4" />
                  Export Results
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Export Reconciliation Data</DialogTitle>
                  <DialogDescription>Choose a format to export your reconciliation data.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <RadioGroup value={exportFormat} onValueChange={setExportFormat} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioItem value="csv" id="csv" />
                      <Label htmlFor="csv">CSV Format (.csv)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioItem value="xlsx" id="xlsx" />
                      <Label htmlFor="xlsx">Excel Format (.xlsx)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioItem value="pdf" id="pdf" />
                      <Label htmlFor="pdf">PDF Format (.pdf)</Label>
                    </div>
                  </RadioGroup>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button className="bg-[#950101] hover:bg-[#FF0000]" onClick={handleExport}>
                      Export
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <div className="rounded-md border border-[#3D0000]">
            <Table>
              <TableHeader className="bg-[#000000] text-white">
                <TableRow>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Description</TableHead>
                  <TableHead className="text-right text-white">Amount</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Bank Ref</TableHead>
                  <TableHead className="text-white">Accounting Ref</TableHead>
                  <TableHead className="text-right text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-[#950101]/5">
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="text-right">
                      <span className={transaction.amount < 0 ? "text-[#FF0000]" : "text-green-500"}>
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {transaction.status === "matched" ? (
                        <div className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-[#950101]" />
                          <span>Matched</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <XCircle className="mr-2 h-4 w-4 text-[#FF0000]" />
                          <span>Unmatched</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{transaction.bankRef}</TableCell>
                    <TableCell>{transaction.accountingRef || "-"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => approveTransaction(transaction.id)}
                          disabled={transaction.status === "matched"}
                          className="border-[#3D0000] text-[#950101] hover:bg-[#950101] hover:text-white"
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => rejectTransaction(transaction.id)}
                          disabled={transaction.status === "unmatched"}
                          className="border-[#3D0000] text-[#950101] hover:bg-[#950101] hover:text-white"
                        >
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="matched" className="space-y-4">
          <div className="rounded-md border border-[#3D0000]">
            <Table>
              <TableHeader className="bg-[#000000] text-white">
                <TableRow>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Description</TableHead>
                  <TableHead className="text-right text-white">Amount</TableHead>
                  <TableHead className="text-white">Match Confidence</TableHead>
                  <TableHead className="text-white">Bank Ref</TableHead>
                  <TableHead className="text-white">Accounting Ref</TableHead>
                  <TableHead className="text-right text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {matchedTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-[#950101]/5">
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="text-right">
                      <span className={transaction.amount < 0 ? "text-[#FF0000]" : "text-green-500"}>
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {transaction.matchConfidence === "high" && "High"}
                      {transaction.matchConfidence === "medium" && "Medium"}
                      {transaction.matchConfidence === "low" && "Low"}
                    </TableCell>
                    <TableCell>{transaction.bankRef}</TableCell>
                    <TableCell>{transaction.accountingRef}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => rejectTransaction(transaction.id)}
                        className="border-[#3D0000] text-[#950101] hover:bg-[#950101] hover:text-white"
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="unmatched" className="space-y-4">
          <div className="rounded-md border border-[#3D0000]">
            <Table>
              <TableHeader className="bg-[#000000] text-white">
                <TableRow>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Description</TableHead>
                  <TableHead className="text-right text-white">Amount</TableHead>
                  <TableHead className="text-white">Bank Ref</TableHead>
                  <TableHead className="text-right text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unmatchedTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-[#950101]/5">
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="text-right">
                      <span className={transaction.amount < 0 ? "text-[#FF0000]" : "text-green-500"}>
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>{transaction.bankRef}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => approveTransaction(transaction.id)}
                          className="border-[#3D0000] text-[#950101] hover:bg-[#950101] hover:text-white"
                        >
                          Approve
                        </Button>
                        <Select>
                          <SelectTrigger className="w-[180px] border-[#3D0000]">
                            <SelectValue placeholder="Match with..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="manual">Manual Match</SelectItem>
                            <SelectItem value="new">Create New Entry</SelectItem>
                            <SelectItem value="ignore">Ignore Transaction</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
