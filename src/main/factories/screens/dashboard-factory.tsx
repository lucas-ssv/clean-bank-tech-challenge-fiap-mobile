import { Dashboard } from '@/presentation/screens'
import {
  makeAddTransaction,
  makeLoadTransactions,
  makeLoadTransactionsByDate,
} from '@/main/factories/usecases/screens/transaction'

export function MakeDashboard() {
  return (
    <Dashboard
      addTransaction={makeAddTransaction()}
      loadTransactionsByDate={makeLoadTransactionsByDate()}
      loadTransactions={makeLoadTransactions()}
    />
  )
}
