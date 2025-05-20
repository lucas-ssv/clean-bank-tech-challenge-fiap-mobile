import { Servicos } from '@/presentation/screens'
import { makeLoadTransactions } from '@/main/factories/usecases/screens/transaction'

export function MakeServicos() {
  return <Servicos loadTransactions={makeLoadTransactions()} />
}
