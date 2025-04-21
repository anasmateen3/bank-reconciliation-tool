import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LearnMorePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-[#000000]">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold text-white flex items-center gap-2">
              <ArrowLeft className="h-5 w-5 text-[#FF0000]" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Understanding Bank Reconciliation</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Bank reconciliation is a critical financial process that ensures your accounting records match your bank
              statements. This process helps identify discrepancies, detect fraud, and maintain accurate financial
              reporting.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Why Bank Reconciliation Matters</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-[#950101] mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Accuracy:</strong> Ensures your financial records accurately reflect your actual financial
                  position
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-[#950101] mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Fraud Detection:</strong> Helps identify unauthorized transactions or potential fraud
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-[#950101] mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Error Identification:</strong> Catches accounting errors, duplicate entries, or missing
                  transactions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-[#950101] mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Compliance:</strong> Supports regulatory compliance and audit requirements
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-[#950101] mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Cash Flow Management:</strong> Provides accurate information for cash flow forecasting
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">The Traditional Reconciliation Process</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Traditionally, bank reconciliation has been a manual, time-consuming process:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Gather bank statements and internal accounting records</li>
              <li>Compare transactions line by line</li>
              <li>Identify matching transactions</li>
              <li>Investigate discrepancies</li>
              <li>Make adjusting entries</li>
              <li>Document the reconciliation</li>
            </ol>
            <p className="text-gray-600 dark:text-gray-400">
              This manual process is prone to errors, especially with high transaction volumes.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">How Automation Transforms Reconciliation</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-[#3D0000]">
                <CardHeader>
                  <CardTitle className="text-[#950101]">Time Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Reduce reconciliation time by up to 80% through automated matching algorithms and streamlined
                    workflows.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[#3D0000]">
                <CardHeader>
                  <CardTitle className="text-[#950101]">Improved Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Eliminate human error with precise matching algorithms that identify transactions based on multiple
                    criteria.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[#3D0000]">
                <CardHeader>
                  <CardTitle className="text-[#950101]">Better Visibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Gain real-time insights into your reconciliation status with dashboards and detailed reports.</p>
                </CardContent>
              </Card>
              <Card className="border-[#3D0000]">
                <CardHeader>
                  <CardTitle className="text-[#950101]">Audit Trails</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Maintain comprehensive audit trails of all reconciliation activities for compliance and review.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <Link href="/dashboard">
              <Button size="lg" className="bg-[#950101] hover:bg-[#FF0000] text-white">
                Start Using Our Reconciliation Tool
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0 bg-[#000000] text-white">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-gray-300">© 2025 BankReconcile. All rights reserved.</p>
          <nav className="flex gap-4 text-sm">
            <Link href="#" className="text-gray-300 hover:text-[#FF0000]">
              Terms
            </Link>
            <Link href="#" className="text-gray-300 hover:text-[#FF0000]">
              Privacy
            </Link>
            <Link href="#" className="text-gray-300 hover:text-[#FF0000]">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
