import { RemoveTransactionRepository } from '@/data/contracts/transaction'

export class RemoveTransactionRepositoryMock
  implements RemoveTransactionRepository
{
  async remove(transactionId: string): Promise<void> {}
}
