import {
  UpdateTransactionRepository,
  UpdateTransactionRepositoryData,
} from '@/data/contracts/transaction'

export class UpdateTransactionRepositoryMock
  implements UpdateTransactionRepository
{
  async update(
    transactionId: string,
    transactionData: UpdateTransactionRepositoryData,
  ): Promise<void> {}
}
