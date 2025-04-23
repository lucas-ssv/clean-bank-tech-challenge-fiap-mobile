import { TransactionType } from '@/domain/usecases/transaction'

export type AddTransactionRepositoryParams = {
  transactionType: TransactionType
  date: Date
  value: number
  userUID: string
}

export interface AddTransactionRepository {
  add: (transaction: AddTransactionRepositoryParams) => Promise<string>
}
