import { TransactionModel } from '@/domain/models/transaction'
import { TransactionDocumentModel } from '@/domain/models/transaction-document'

export interface LoadTransactions {
  execute: () => Promise<LoadTransactionsResult[]>
}

export type LoadTransactionsResult = TransactionModel &
  TransactionDocumentModel[]
