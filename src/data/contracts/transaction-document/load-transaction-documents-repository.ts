import { TransactionDocumentModel } from '@/domain/models/transaction-document'

export type LoadTransactionDocumentsRepositoryResult =
  TransactionDocumentModel[]

export interface LoadTransactionDocumentsRepository {
  loadByTransactionId: (
    transactionId: string,
  ) => Promise<LoadTransactionDocumentsRepositoryResult>
}
