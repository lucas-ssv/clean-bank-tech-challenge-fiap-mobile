import { TransactionModel, TransactionType } from '@/domain/models/transaction'
import { TransactionDocumentModel } from '@/domain/models/transaction-document'

export interface LoadTransactions {
  execute: (
    filters?: LoadTransactionsFilterParams,
  ) => Promise<LoadTransactionsResult[]>
}

export type LoadTransactionsFilterParams = {
  transactionType?: TransactionType
  date?: Date
  minimumValue?: number
  maximumValue?: number
}

export type LoadTransactionsResult<T = Date> = TransactionModel<T> & {
  documents: TransactionDocumentModel[]
}
