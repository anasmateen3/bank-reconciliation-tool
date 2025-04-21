"use client"

import type React from "react"

import { useState } from "react"
import { FileUp, Upload, CheckCircle, AlertCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export function UploadBankStatement() {
  const [bankFile, setBankFile] = useState<File | null>(null)
  const [accountingFile, setAccountingFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [processingComplete, setProcessingComplete] = useState(false)
  const [matchResults, setMatchResults] = useState<{
    total: number
    matched: number
    unmatched: number
    matchRate: number
  } | null>(null)

  const handleBankFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBankFile(e.target.files[0])
    }
  }

  const handleAccountingFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAccountingFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!bankFile || !accountingFile) return

    setUploading(true)
    setUploadProgress(0)
    setUploadComplete(false)
    setProcessingComplete(false)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadComplete(true)

          // Simulate processing after upload completes
          setTimeout(() => {
            setProcessingComplete(true)
            setUploadSuccess(true)
            setMatchResults({
              total: 156,
              matched: 142,
              unmatched: 14,
              matchRate: 91,
            })
          }, 2000)

          return 100
        }
        return prev + 5
      })
    }, 150)
  }

  const resetUpload = () => {
    setBankFile(null)
    setAccountingFile(null)
    setUploading(false)
    setUploadProgress(0)
    setUploadComplete(false)
    setProcessingComplete(false)
    setUploadSuccess(false)
    setMatchResults(null)
  }

  return (
    <Card className="border-[#3D0000]">
      <CardHeader>
        <CardTitle>Upload Statements</CardTitle>
        <CardDescription>
          Upload your bank statement and accounting records to start the reconciliation process.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!processingComplete ? (
          <Tabs defaultValue="upload" className="space-y-4">
            <TabsList className="bg-muted/20 border">
              <TabsTrigger value="upload" className="data-[state=active]:bg-[#950101] data-[state=active]:text-white">
                Upload Files
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-[#950101] data-[state=active]:text-white">
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              <div className="grid w-full gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bank-file" className="text-base font-medium">
                    Bank Statement
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="bank-file"
                      type="file"
                      accept=".csv,.ofx,.qfx,.pdf,.xlsx"
                      onChange={handleBankFileChange}
                      className="flex-1 border-[#3D0000]"
                      disabled={uploading}
                    />
                    {bankFile && (
                      <Button onClick={() => setBankFile(null)} variant="outline" size="icon" disabled={uploading}>
                        <FileUp className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Supported formats: CSV, OFX, QFX, PDF, XLSX</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accounting-file" className="text-base font-medium">
                    Accounting Records
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="accounting-file"
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleAccountingFileChange}
                      className="flex-1 border-[#3D0000]"
                      disabled={uploading}
                    />
                    {accountingFile && (
                      <Button
                        onClick={() => setAccountingFile(null)}
                        variant="outline"
                        size="icon"
                        disabled={uploading}
                      >
                        <FileUp className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Supported formats: CSV, XLSX, XLS</p>
                </div>
              </div>

              {uploading && (
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between text-sm">
                    <span>{uploadComplete ? "Processing files..." : "Uploading files..."}</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" indicatorClassName="bg-[#950101]" />
                </div>
              )}
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="grid w-full gap-4">
                <div className="space-y-2">
                  <Label htmlFor="account">Account</Label>
                  <Select defaultValue="main" disabled={uploading}>
                    <SelectTrigger className="border-[#3D0000]">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main Operating Account</SelectItem>
                      <SelectItem value="payroll">Payroll Account</SelectItem>
                      <SelectItem value="savings">Savings Account</SelectItem>
                      <SelectItem value="tax">Tax Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="period">Statement Period</Label>
                  <Select defaultValue="april-2025" disabled={uploading}>
                    <SelectTrigger className="border-[#3D0000]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="april-2025">April 2025</SelectItem>
                      <SelectItem value="march-2025">March 2025</SelectItem>
                      <SelectItem value="february-2025">February 2025</SelectItem>
                      <SelectItem value="january-2025">January 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="matching-criteria">Matching Criteria</Label>
                  <Select defaultValue="amount-date-desc" disabled={uploading}>
                    <SelectTrigger className="border-[#3D0000]">
                      <SelectValue placeholder="Select matching criteria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amount-date-desc">Amount, Date & Description</SelectItem>
                      <SelectItem value="amount-date">Amount & Date Only</SelectItem>
                      <SelectItem value="amount-ref">Amount & Reference Number</SelectItem>
                      <SelectItem value="custom">Custom Rules</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="space-y-6">
            <Alert className={uploadSuccess ? "border-[#950101] bg-[#950101]/10" : "border-red-600 bg-red-600/10"}>
              <div className="flex items-center gap-2">
                {uploadSuccess ? (
                  <CheckCircle className="h-5 w-5 text-[#950101]" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )}
                <div>
                  <AlertTitle className={uploadSuccess ? "text-[#950101]" : "text-red-600"}>
                    {uploadSuccess ? "Files Processed Successfully" : "Processing Error"}
                  </AlertTitle>
                  <AlertDescription>
                    {uploadSuccess
                      ? "Your files have been uploaded and processed. Ready for reconciliation."
                      : "There was an error processing your files. Please try again."}
                  </AlertDescription>
                </div>
              </div>
            </Alert>

            {matchResults && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-[#3D0000]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{matchResults.total}</div>
                  </CardContent>
                </Card>
                <Card className="border-[#3D0000]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Matched</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{matchResults.matched}</div>
                  </CardContent>
                </Card>
                <Card className="border-[#3D0000]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Unmatched</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{matchResults.unmatched}</div>
                  </CardContent>
                </Card>
                <Card className="border-[#3D0000]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Match Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{matchResults.matchRate}%</div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button
                variant="outline"
                onClick={resetUpload}
                className="border-[#3D0000] text-[#950101] hover:bg-[#950101] hover:text-white"
              >
                Upload New Files
              </Button>
              <Link href="/reconciliation-processor">
                <Button className="bg-[#950101] hover:bg-[#FF0000]">
                  Process Reconciliation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
      {!processingComplete && (
        <CardFooter>
          <Button
            onClick={handleUpload}
            disabled={!bankFile || !accountingFile || uploading}
            className="w-full bg-[#950101] hover:bg-[#FF0000] text-white"
          >
            {uploading ? (
              <>Processing...</>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Statements
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
