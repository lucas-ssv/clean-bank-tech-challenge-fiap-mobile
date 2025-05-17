import { Transacoes } from '@/presentation/screens'
import { makeLoadTransactions } from '@/main/factories/usecases/screens/transaction'

export function MakeTransacoes() {
  return <Transacoes loadTransactions={makeLoadTransactions()} />
}
