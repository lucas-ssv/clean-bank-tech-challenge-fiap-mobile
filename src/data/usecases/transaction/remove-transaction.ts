import { RemoveTransactionRepository } from '@/data/contracts/transaction'
import { RemoveTransaction } from '@/domain/usecases/transaction'

export class RemoveTransactionImpl implements RemoveTransaction {
  private removeTransactionRepository

  constructor(removeTransactionRepository: RemoveTransactionRepository) {
    this.removeTransactionRepository = removeTransactionRepository
  }

  async execute(transactionId: string): Promise<void> {
    await this.removeTransactionRepository.remove(transactionId)
  }
}
