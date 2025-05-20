import { Investimentos } from '@/presentation/screens'
import { makeLoadTransactions } from '@/main/factories/usecases/screens/transaction'

export function MakeInvestimentos() {
  return <Investimentos loadTransactions={makeLoadTransactions()} />
}
