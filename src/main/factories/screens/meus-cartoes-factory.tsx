import { MeusCartoes } from '@/presentation/screens'
import { makeLoadTransactions } from '@/main/factories/usecases/screens/transaction'

export function MakeMeusCartoes() {
  return <MeusCartoes loadTransactions={makeLoadTransactions()} />
}
