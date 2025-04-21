import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ReconciliationDetails } from "@/components/reconciliation-details"

export default function ReconciliationDetailPage({ params }: { params: { id: string } }) {
  return (
    <DashboardShell>
      <DashboardHeader heading={`Reconciliation #${params.id}`} text="Review and approve transaction matches.">
        <div className="flex gap-2">
          <Button variant="outline">Export</Button>
          <Button>Approve All</Button>
        </div>
      </DashboardHeader>
      <ReconciliationDetails id={params.id} />
    </DashboardShell>
  )
}
