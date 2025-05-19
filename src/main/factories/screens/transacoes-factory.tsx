import { Transacoes } from '@/presentation/screens'
import {
  makeLoadTransactions,
  makeUpdateTransaction,
} from '@/main/factories/usecases/screens/transaction'

export function MakeTransacoes() {
  return (
    <Transacoes
      loadTransactions={makeLoadTransactions()}
      updateTransaction={makeUpdateTransaction()}
    />
  )
}
