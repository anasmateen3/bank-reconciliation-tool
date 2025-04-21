import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ReconciliationsList } from "@/components/reconciliations-list"

export default function ReconciliationsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Reconciliations" text="Manage and review all your reconciliation processes.">
        <Link href="/dashboard?tab=upload">
          <Button>New Reconciliation</Button>
        </Link>
      </DashboardHeader>
      <ReconciliationsList />
    </DashboardShell>
  )
}
