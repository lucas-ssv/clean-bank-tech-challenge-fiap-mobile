import {
  UpdateTransaction,
  UpdateTransactionData,
} from '@/domain/usecases/transaction'

export class UpdateTransactionMock implements UpdateTransaction {
  async execute(
    transactionId: string,
    transactionData: UpdateTransactionData,
  ): Promise<void> {}
}
