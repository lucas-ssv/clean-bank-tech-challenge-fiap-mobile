import { RemoveTransaction } from '@/domain/usecases/transaction'

export class RemoveTransactionMock implements RemoveTransaction {
  async execute(transactionId: string): Promise<void> {}
}
