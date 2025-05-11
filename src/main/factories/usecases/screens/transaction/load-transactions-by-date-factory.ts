import { LoadTransactionByDateImpl } from '@/data/usecases/transaction'
import { LoadTransactionsByDate } from '@/domain/usecases/transaction'
import { TransactionFirebaseRepository } from '@/infra/repositories/firebase'

export const makeLoadTransactionsByDate = (): LoadTransactionsByDate => {
  const loadTransactionsByDateRepository = new TransactionFirebaseRepository()
  return new LoadTransactionByDateImpl(loadTransactionsByDateRepository)
}
