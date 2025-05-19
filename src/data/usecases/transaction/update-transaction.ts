import { UpdateTransactionRepository } from '@/data/contracts/transaction'
import {
  UpdateTransaction,
  UpdateTransactionData,
} from '@/domain/usecases/transaction'

export class UpdateTransactionImpl implements UpdateTransaction {
  private updateTransactionRepository: UpdateTransactionRepository

  constructor(updateTransactionRepository: UpdateTransactionRepository) {
    this.updateTransactionRepository = updateTransactionRepository
  }

  async execute(
    transactionId: string,
    transactionData: UpdateTransactionData,
  ): Promise<void> {
    await this.updateTransactionRepository.update(
      transactionId,
      transactionData,
    )
  }
}
