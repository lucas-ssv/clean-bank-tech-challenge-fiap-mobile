import { RemoveTransactionImpl } from '@/data/usecases/transaction'
import { RemoveTransaction } from '@/domain/usecases/transaction'
import { TransactionFirebaseRepository } from '@/infra/repositories/firebase'

export function makeRemoveTransaction(): RemoveTransaction {
  const removeTransactionRepository = new TransactionFirebaseRepository()
  return new RemoveTransactionImpl(removeTransactionRepository)
}
