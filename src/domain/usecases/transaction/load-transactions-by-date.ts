import { TransactionModel } from '@/domain/models/transaction'

export interface LoadTransactionsByDate {
  execute: (startDate: Date, endDate: Date) => Promise<TransactionModel[]>
}
