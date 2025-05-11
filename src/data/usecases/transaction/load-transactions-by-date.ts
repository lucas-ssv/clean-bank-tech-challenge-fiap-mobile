import { LoadTransactionsByDateRepository } from '@/data/contracts/transaction'
import { TransactionModel } from '@/domain/models/transaction'
import { LoadTransactionsByDate } from '@/domain/usecases/transaction'

export class LoadTransactionByDateImpl implements LoadTransactionsByDate {
  private loadTransactionsByDateRepository

  constructor(
    loadTransactionsByDateRepository: LoadTransactionsByDateRepository,
  ) {
    this.loadTransactionsByDateRepository = loadTransactionsByDateRepository
  }

  async execute(startDate: Date, endDate: Date): Promise<TransactionModel[]> {
    const transactions = await this.loadTransactionsByDateRepository.loadByDate(
      startDate,
      endDate,
    )
    return transactions
  }
}
