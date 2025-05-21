import { TransactionModel } from '@/domain/models/transaction'

export type LoadTransactionsByDateRepositoryResult = TransactionModel

export interface LoadTransactionsByDateRepository {
  loadByDate: (
    startDate: Date,
    endDate: Date,
  ) => Promise<LoadTransactionsByDateRepositoryResult[]>
}
