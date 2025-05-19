import { TransactionType } from '@/domain/models/transaction'

export interface UpdateTransaction {
  execute: (
    transactionId: string,
    transactionData: UpdateTransactionData,
  ) => Promise<void>
}

export type UpdateTransactionData = {
  transactionType?: TransactionType
  value?: number
  date?: Date
}
