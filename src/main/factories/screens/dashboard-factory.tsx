import { Dashboard } from '@/presentation/screens'
import { makeAddTransaction } from '@/main/factories/usecases/screens/transaction'

export function MakeDashboard() {
  return <Dashboard addTransaction={makeAddTransaction()} />
}
