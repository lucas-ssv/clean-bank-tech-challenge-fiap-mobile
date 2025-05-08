import {
  AddTransaction,
  AddTransactionParams,
} from '@/domain/usecases/transaction'

export class AddTransactionMock implements AddTransaction {
  async execute(transaction: AddTransactionParams): Promise<void> {}
}
