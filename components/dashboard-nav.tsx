"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, FileText, Home, Settings, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2">
      <Link href="/dashboard">
        <Button
          variant={pathname === "/dashboard" ? "default" : "ghost"}
          className={`w-full justify-start ${pathname === "/dashboard" ? "bg-[#950101] hover:bg-[#FF0000]" : ""}`}
        >
          <Home className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </Link>
      <Link href="/reconciliations">
        <Button
          variant={pathname.includes("/reconciliations") ? "default" : "ghost"}
          className={`w-full justify-start ${pathname.includes("/reconciliations") ? "bg-[#950101] hover:bg-[#FF0000]" : ""}`}
        >
          <FileText className="mr-2 h-4 w-4" />
          Reconciliations
        </Button>
      </Link>
      <Link href="/reconciliation-processor">
        <Button
          variant={pathname === "/reconciliation-processor" ? "default" : "ghost"}
          className={`w-full justify-start ${pathname === "/reconciliation-processor" ? "bg-[#950101] hover:bg-[#FF0000]" : ""}`}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Processor
        </Button>
      </Link>
      <Link href="/reports">
        <Button
          variant={pathname === "/reports" ? "default" : "ghost"}
          className={`w-full justify-start ${pathname === "/reports" ? "bg-[#950101] hover:bg-[#FF0000]" : ""}`}
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          Reports
        </Button>
      </Link>
      <Link href="/settings">
        <Button
          variant={pathname === "/settings" ? "default" : "ghost"}
          className={`w-full justify-start ${pathname === "/settings" ? "bg-[#950101] hover:bg-[#FF0000]" : ""}`}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </Link>
    </nav>
  )
}
