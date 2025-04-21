"use client"

import { useState } from "react"
import { CheckCircle, XCircle, AlertTriangle, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ReconciliationPieChart } from "@/components/reconciliation-pie-chart"

// Define types for our data
interface InternalRecord {
  "Transaction ID": string
  Date: string
  Description: string
  Amount: string
  amountNum?: number
}

interface BankRecord {
  "Bank Transaction ID": string
  Date: string
  Description: string
  Amount: string
  amountNum?: number
}

interface MatchResult {
  bankRecord: BankRecord
  internalRecord: InternalRecord | null
  matchConfidence: "high" | "medium" | "low" | "none"
  status: "matched" | "unmatched"
}

export function TransactionMatcher() {
  const [internalRecords, setInternalRecords] = useState<InternalRecord[]>([])
  const [bankRecords, setBankRecords] = useState<BankRecord[]>([])
  const [matchResults, setMatchResults] = useState<MatchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [processingComplete, setProcessingComplete] = useState(false)
  const [stats, setStats] = useState({
    totalTransactions: 0,
    matched: 0,
    unmatched: 0,
    matchRate: 0,
  })

  // Function to fetch and parse CSV data
  const fetchData = async () => {
    setLoading(true)
    setProgress(10)
    setError(null)

    try {
      // Fetch internal records
      const internalResponse = await fetch(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/simple_bank_reconciliation_data.xlsx%20-%20Internal%20Records-sUkQR0uN5R6ZMr4vkzf7C0LssvT77G.csv",
      )
      const internalText = await internalResponse.text()
      setProgress(30)

      // Fetch bank records
      const bankResponse = await fetch(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/simple_bank_reconciliation_data.xlsx%20-%20Bank%20Statement-oBJBZ4ITl9rhiqCMZZLj33AeqIJ06J.csv",
      )
      const bankText = await bankResponse.text()
      setProgress(50)

      // Parse CSV data
      const parsedInternalRecords = parseCSV(internalText) as InternalRecord[]
      const parsedBankRecords = parseCSV(bankText) as BankRecord[]

      // Add numeric amount field for easier comparison
      const processedInternalRecords = parsedInternalRecords.map((record) => ({
        ...record,
        amountNum: Number.parseFloat(record.Amount),
      }))

      const processedBankRecords = parsedBankRecords.map((record) => ({
        ...record,
        amountNum: Number.parseFloat(record.Amount),
      }))

      setInternalRecords(processedInternalRecords)
      setBankRecords(processedBankRecords)
      setProgress(70)

      // Match transactions
      const results = matchTransactions(processedBankRecords, processedInternalRecords)
      setMatchResults(results)
      setProgress(90)

      // Calculate statistics
      const matched = results.filter((r) => r.status === "matched").length
      const total = results.length
      const unmatched = total - matched
      const matchRate = Math.round((matched / total) * 100)

      setStats({
        totalTransactions: total,
        matched: matched,
        unmatched: unmatched,
        matchRate: matchRate,
      })

      setProgress(100)
      setProcessingComplete(true)
    } catch (err) {
      console.error("Error fetching or processing data:", err)
      setError("Failed to fetch or process the data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Parse CSV function
  const parseCSV = (csvText: string) => {
    const lines = csvText.split("\n")
    const headers = lines[0].split(",")

    return lines
      .slice(1)
      .filter((line) => line.trim() !== "")
      .map((line) => {
        const values = line.split(",")
        const record: Record<string, string> = {}

        headers.forEach((header, index) => {
          record[header.trim()] = values[index]?.trim() || ""
        })

        return record
      })
  }

  // Match transactions function
  const matchTransactions = (bankRecords: BankRecord[], internalRecords: InternalRecord[]): MatchResult[] => {
    return bankRecords.map((bankRecord) => {
      // Try to find exact matches first (amount and date)
      const exactMatches = internalRecords.filter(
        (ir) => Math.abs(ir.amountNum!) === Math.abs(bankRecord.amountNum!) && ir.Date === bankRecord.Date,
      )

      if (exactMatches.length === 1) {
        return {
          bankRecord,
          internalRecord: exactMatches[0],
          matchConfidence: "high",
          status: "matched",
        }
      }

      // Try to find amount matches with close dates (within 3 days)
      const amountMatches = internalRecords.filter((ir) => Math.abs(ir.amountNum!) === Math.abs(bankRecord.amountNum!))

      if (amountMatches.length >= 1) {
        // Find the closest date match
        const dateMatches = amountMatches.filter((ir) => {
          const bankDate = new Date(bankRecord.Date)
          const internalDate = new Date(ir.Date)
          const diffTime = Math.abs(bankDate.getTime() - internalDate.getTime())
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          return diffDays <= 3
        })

        if (dateMatches.length === 1) {
          return {
            bankRecord,
            internalRecord: dateMatches[0],
            matchConfidence: "medium",
            status: "matched",
          }
        }

        if (dateMatches.length > 1) {
          // If multiple matches, try to find one with similar description
          const descMatches = dateMatches.filter(
            (ir) =>
              ir.Description.toLowerCase().includes(bankRecord.Description.toLowerCase()) ||
              bankRecord.Description.toLowerCase().includes(ir.Description.toLowerCase()),
          )

          if (descMatches.length === 1) {
            return {
              bankRecord,
              internalRecord: descMatches[0],
              matchConfidence: "medium",
              status: "matched",
            }
          }

          // If still multiple matches, just take the first one but mark as low confidence
          if (dateMatches.length > 0) {
            return {
              bankRecord,
              internalRecord: dateMatches[0],
              matchConfidence: "low",
              status: "matched",
            }
          }
        }

        // If amount matches but dates are far apart, mark as low confidence
        if (amountMatches.length > 0) {
          return {
            bankRecord,
            internalRecord: amountMatches[0],
            matchConfidence: "low",
            status: "matched",
          }
        }
      }

      // No match found
      return {
        bankRecord,
        internalRecord: null,
        matchConfidence: "none",
        status: "unmatched",
      }
    })
  }

  // Format currency
  const formatCurrency = (amount: string) => {
    const num = Number.parseFloat(amount)
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num)
  }

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {!processingComplete ? (
        <Card className="border-[#3D0000]">
          <CardHeader>
            <CardTitle>Transaction Matching</CardTitle>
            <CardDescription>Match transactions between your bank statement and internal records.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {loading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing data...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" indicatorClassName="bg-[#950101]" />
              </div>
            )}

            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="mb-4 rounded-full bg-[#950101]/10 p-3">
                <CheckCircle className="h-6 w-6 text-[#950101]" />
              </div>
              <h3 className="mb-1 text-lg font-medium">Ready to Process</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Click the button below to start matching transactions between your bank statement and internal records.
              </p>
              <Button onClick={fetchData} disabled={loading} className="bg-[#950101] hover:bg-[#FF0000] text-white">
                Start Matching
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-[#3D0000]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalTransactions}</div>
              </CardContent>
            </Card>
            <Card className="border-[#3D0000]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Matched</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.matched}</div>
              </CardContent>
            </Card>
            <Card className="border-[#3D0000]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Unmatched</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.unmatched}</div>
              </CardContent>
            </Card>
            <Card className="border-[#3D0000]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Match Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.matchRate}%</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-[#3D0000]">
              <CardHeader>
                <CardTitle>Match Results</CardTitle>
                <CardDescription>Visual breakdown of transaction matching results</CardDescription>
              </CardHeader>
              <CardContent>
                <ReconciliationPieChart />
              </CardContent>
            </Card>
            <Card className="border-[#3D0000]">
              <CardHeader>
                <CardTitle>Match Confidence</CardTitle>
                <CardDescription>Confidence levels of matched transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#950101]"></div>
                      <span>High Confidence</span>
                    </div>
                    <span className="font-medium">
                      {matchResults.filter((r) => r.matchConfidence === "high").length} transactions
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#FF0000]"></div>
                      <span>Medium Confidence</span>
                    </div>
                    <span className="font-medium">
                      {matchResults.filter((r) => r.matchConfidence === "medium").length} transactions
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#3D0000]"></div>
                      <span>Low Confidence</span>
                    </div>
                    <span className="font-medium">
                      {matchResults.filter((r) => r.matchConfidence === "low").length} transactions
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                      <span>Unmatched</span>
                    </div>
                    <span className="font-medium">
                      {matchResults.filter((r) => r.matchConfidence === "none").length} transactions
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-[#3D0000]">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Transaction Details</CardTitle>
                <CardDescription>Review and approve transaction matches</CardDescription>
              </div>
              <Button className="bg-[#950101] hover:bg-[#FF0000]">
                <Download className="mr-2 h-4 w-4" />
                Export Results
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList className="bg-muted/20 border">
                  <TabsTrigger value="all" className="data-[state=active]:bg-[#950101] data-[state=active]:text-white">
                    All Transactions
                  </TabsTrigger>
                  <TabsTrigger
                    value="matched"
                    className="data-[state=active]:bg-[#950101] data-[state=active]:text-white"
                  >
                    Matched
                  </TabsTrigger>
                  <TabsTrigger
                    value="unmatched"
                    className="data-[state=active]:bg-[#950101] data-[state=active]:text-white"
                  >
                    Unmatched
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <div className="rounded-md border border-[#3D0000]">
                    <Table>
                      <TableHeader className="bg-[#000000] text-white">
                        <TableRow>
                          <TableHead className="text-white">Bank Transaction ID</TableHead>
                          <TableHead className="text-white">Date</TableHead>
                          <TableHead className="text-white">Description</TableHead>
                          <TableHead className="text-right text-white">Amount</TableHead>
                          <TableHead className="text-white">Status</TableHead>
                          <TableHead className="text-white">Internal Transaction ID</TableHead>
                          <TableHead className="text-white">Confidence</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {matchResults.slice(0, 20).map((result, index) => (
                          <TableRow key={index} className="hover:bg-[#950101]/5">
                            <TableCell className="font-medium">{result.bankRecord["Bank Transaction ID"]}</TableCell>
                            <TableCell>{formatDate(result.bankRecord.Date)}</TableCell>
                            <TableCell>{result.bankRecord.Description}</TableCell>
                            <TableCell className="text-right">
                              <span
                                className={
                                  Number.parseFloat(result.bankRecord.Amount) < 0 ? "text-[#FF0000]" : "text-green-500"
                                }
                              >
                                {formatCurrency(result.bankRecord.Amount)}
                              </span>
                            </TableCell>
                            <TableCell>
                              {result.status === "matched" ? (
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
                            <TableCell>
                              {result.internalRecord ? result.internalRecord["Transaction ID"] : "-"}
                            </TableCell>
                            <TableCell>
                              {result.matchConfidence === "high" && (
                                <span className="text-[#950101] font-medium">High</span>
                              )}
                              {result.matchConfidence === "medium" && (
                                <span className="text-[#FF0000] font-medium">Medium</span>
                              )}
                              {result.matchConfidence === "low" && (
                                <span className="text-[#3D0000] font-medium">Low</span>
                              )}
                              {result.matchConfidence === "none" && <span className="text-gray-500">None</span>}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="matched">
                  <div className="rounded-md border border-[#3D0000]">
                    <Table>
                      <TableHeader className="bg-[#000000] text-white">
                        <TableRow>
                          <TableHead className="text-white">Bank Transaction ID</TableHead>
                          <TableHead className="text-white">Date</TableHead>
                          <TableHead className="text-white">Description</TableHead>
                          <TableHead className="text-right text-white">Bank Amount</TableHead>
                          <TableHead className="text-white">Internal Transaction ID</TableHead>
                          <TableHead className="text-right text-white">Internal Amount</TableHead>
                          <TableHead className="text-white">Confidence</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {matchResults
                          .filter((result) => result.status === "matched")
                          .slice(0, 20)
                          .map((result, index) => (
                            <TableRow key={index} className="hover:bg-[#950101]/5">
                              <TableCell className="font-medium">{result.bankRecord["Bank Transaction ID"]}</TableCell>
                              <TableCell>{formatDate(result.bankRecord.Date)}</TableCell>
                              <TableCell>{result.bankRecord.Description}</TableCell>
                              <TableCell className="text-right">
                                <span
                                  className={
                                    Number.parseFloat(result.bankRecord.Amount) < 0
                                      ? "text-[#FF0000]"
                                      : "text-green-500"
                                  }
                                >
                                  {formatCurrency(result.bankRecord.Amount)}
                                </span>
                              </TableCell>
                              <TableCell>{result.internalRecord!["Transaction ID"]}</TableCell>
                              <TableCell className="text-right">
                                <span
                                  className={
                                    Number.parseFloat(result.internalRecord!.Amount) < 0
                                      ? "text-[#FF0000]"
                                      : "text-green-500"
                                  }
                                >
                                  {formatCurrency(result.internalRecord!.Amount)}
                                </span>
                              </TableCell>
                              <TableCell>
                                {result.matchConfidence === "high" && (
                                  <span className="text-[#950101] font-medium">High</span>
                                )}
                                {result.matchConfidence === "medium" && (
                                  <span className="text-[#FF0000] font-medium">Medium</span>
                                )}
                                {result.matchConfidence === "low" && (
                                  <span className="text-[#3D0000] font-medium">Low</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="unmatched">
                  <div className="rounded-md border border-[#3D0000]">
                    <Table>
                      <TableHeader className="bg-[#000000] text-white">
                        <TableRow>
                          <TableHead className="text-white">Bank Transaction ID</TableHead>
                          <TableHead className="text-white">Date</TableHead>
                          <TableHead className="text-white">Description</TableHead>
                          <TableHead className="text-right text-white">Amount</TableHead>
                          <TableHead className="text-white">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {matchResults
                          .filter((result) => result.status === "unmatched")
                          .slice(0, 20)
                          .map((result, index) => (
                            <TableRow key={index} className="hover:bg-[#950101]/5">
                              <TableCell className="font-medium">{result.bankRecord["Bank Transaction ID"]}</TableCell>
                              <TableCell>{formatDate(result.bankRecord.Date)}</TableCell>
                              <TableCell>{result.bankRecord.Description}</TableCell>
                              <TableCell className="text-right">
                                <span
                                  className={
                                    Number.parseFloat(result.bankRecord.Amount) < 0
                                      ? "text-[#FF0000]"
                                      : "text-green-500"
                                  }
                                >
                                  {formatCurrency(result.bankRecord.Amount)}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-[#3D0000] text-[#950101] hover:bg-[#950101] hover:text-white"
                                >
                                  Find Match
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button onClick={fetchData} className="w-full bg-[#950101] hover:bg-[#FF0000] text-white">
                Reprocess Data
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  )
}
