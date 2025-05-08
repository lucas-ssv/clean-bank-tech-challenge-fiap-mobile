import { AddTransactionImpl } from '@/data/usecases/transaction'
import { AddTransaction } from '@/domain/usecases/transaction'
import {
  TransactionDocumentFirebaseRepository,
  TransactionFirebaseRepository,
} from '@/infra/repositories/firebase'
import { UploadFirebaseService } from '@/infra/services/firebase'

export const makeAddTransaction = (): AddTransaction => {
  const transactionFirebaseRepository = new TransactionFirebaseRepository()
  const uploadTransactionDocumentService = new UploadFirebaseService()
  const transactionDocumentFirebaseRepository =
    new TransactionDocumentFirebaseRepository()
  return new AddTransactionImpl(
    transactionFirebaseRepository,
    uploadTransactionDocumentService,
    transactionDocumentFirebaseRepository,
  )
}
