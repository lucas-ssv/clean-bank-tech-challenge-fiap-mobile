import { TransactionModel } from '@/domain/models/transaction'

export type LoadTransactionsRepositoryResult<T = any> = {
  transactionId: string
  transactions: TransactionModel<T>[]
}

export interface LoadTransactionsRepository<T = any> {
  loadAll: () => Promise<LoadTransactionsRepositoryResult<T>>
}
