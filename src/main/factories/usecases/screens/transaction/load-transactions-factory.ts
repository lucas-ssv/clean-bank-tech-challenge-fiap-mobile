import { LoadTransactionsImpl } from '@/data/usecases/transaction'
import { LoadTransactions } from '@/domain/usecases/transaction'
import {
  TransactionDocumentFirebaseRepository,
  TransactionFirebaseRepository,
} from '@/infra/repositories/firebase'

export const makeLoadTransactions = (): LoadTransactions => {
  const loadTransactionsRepository = new TransactionFirebaseRepository()
  const loadTransactionDocumentsRepository =
    new TransactionDocumentFirebaseRepository()
  return new LoadTransactionsImpl(
    loadTransactionsRepository,
    loadTransactionDocumentsRepository,
  )
}
