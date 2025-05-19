import { TransactionType } from '@/domain/models/transaction'

export type UpdateTransactionRepositoryData = {
  transactionType?: TransactionType
  value?: number
  date?: Date
}

export interface UpdateTransactionRepository {
  update: (
    transactionId: string,
    transactionData: UpdateTransactionRepositoryData,
  ) => Promise<void>
}
