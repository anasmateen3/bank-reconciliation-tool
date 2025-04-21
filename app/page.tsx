import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart3, FileText, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-[#000000]">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-[#FF0000]" />
            <h1 className="text-xl font-bold text-white">BankReconcile</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-white hover:text-[#FF0000]">
              Dashboard
            </Link>
            <Link href="/reconciliations" className="text-sm font-medium text-white hover:text-[#FF0000]">
              Reconciliations
            </Link>
            <Link href="/reports" className="text-sm font-medium text-white hover:text-[#FF0000]">
              Reports
            </Link>
            <Link href="/login">
              <Button size="sm" className="bg-[#950101] hover:bg-[#FF0000] text-white">
                Sign In
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Automated Bank Reconciliation
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Streamline your financial reconciliation process with our powerful automated tool. Match transactions,
                identify discrepancies, and close your books faster.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/login">
                  <Button className="bg-[#950101] hover:bg-[#FF0000] text-white">
                    Start Reconciling
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/learn-more">
                  <Button
                    variant="outline"
                    className="border-[#950101] text-[#950101] hover:bg-[#3D0000] hover:text-white"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg"
                alt="Bank Reconciliation Dashboard"
                className="rounded-lg object-cover"
                width={500}
                height={400}
              />
            </div>
          </div>
        </section>
        <section className="container py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-[#000000]">
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <Card className="border-[#3D0000] dark:border-[#950101]">
              <CardHeader>
                <Upload className="h-10 w-10 text-[#FF0000]" />
                <CardTitle className="mt-4">Upload Statements</CardTitle>
                <CardDescription>
                  Import bank statements and accounting data in various formats including CSV, OFX, and QFX.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-[#3D0000] dark:border-[#950101]">
              <CardHeader>
                <FileText className="h-10 w-10 text-[#FF0000]" />
                <CardTitle className="mt-4">Automatic Matching</CardTitle>
                <CardDescription>
                  Our intelligent algorithm matches transactions based on amount, date, and description.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-[#3D0000] dark:border-[#950101]">
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-[#FF0000]" />
                <CardTitle className="mt-4">Detailed Reports</CardTitle>
                <CardDescription>
                  Generate comprehensive reconciliation reports and identify discrepancies at a glance.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
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
