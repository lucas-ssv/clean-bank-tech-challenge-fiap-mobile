import { TransactionModel } from '@/domain/models/transaction'

export type LoadTransactionsRepositoryResult = {
  transactionId: string
  transactions: TransactionModel[]
}

export interface LoadTransactionsRepository {
  loadAll: () => Promise<LoadTransactionsRepositoryResult>
}
