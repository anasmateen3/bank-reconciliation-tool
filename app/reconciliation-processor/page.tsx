import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { TransactionMatcher } from "@/components/transaction-matcher"

export default function ReconciliationProcessorPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Reconciliation Processor"
        text="Match and reconcile transactions between your bank statement and internal records."
      />
      <TransactionMatcher />
    </DashboardShell>
  )
}
