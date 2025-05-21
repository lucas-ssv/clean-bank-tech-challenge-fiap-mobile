import { TransactionModel, TransactionType } from '@/domain/models/transaction'

export type LoadTransactionsFilterParams = {
  transactionType?: TransactionType
  date?: Date
  minimumValue?: number
  maximumValue?: number
}

export interface LoadTransactionsRepository<T = any> {
  loadAll: (
    filters?: LoadTransactionsFilterParams,
  ) => Promise<TransactionModel<T>[]>
}
