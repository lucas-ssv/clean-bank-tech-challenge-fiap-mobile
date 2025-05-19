import { UpdateTransactionImpl } from '@/data/usecases/transaction'
import { TransactionFirebaseRepository } from '@/infra/repositories/firebase'

export function makeUpdateTransaction() {
  const updateTransactionRepository = new TransactionFirebaseRepository()
  return new UpdateTransactionImpl(updateTransactionRepository)
}
