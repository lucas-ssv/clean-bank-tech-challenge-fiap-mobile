import { TransactionModel } from '@/domain/models/transaction'

export type LoadTransactionsRepositoryResult<T = Date> = {
  transactionId: string
  transactions: TransactionModel<T>[]
}

export interface LoadTransactionsRepository<T = Date> {
  loadAll: () => Promise<LoadTransactionsRepositoryResult<T>>
}
