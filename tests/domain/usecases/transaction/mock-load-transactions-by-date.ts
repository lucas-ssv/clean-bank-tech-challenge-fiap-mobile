import { TransactionModel, TransactionType } from '@/domain/models/transaction'
import { LoadTransactionsByDate } from '@/domain/usecases/transaction'

export class LoadTransactionsByDateStub implements LoadTransactionsByDate {
  async execute(startDate: Date, endDate: Date): Promise<TransactionModel[]> {
    return [
      {
        date: new Date(),
        transactionType: TransactionType.CAMBIO_DE_MOEDA,
        value: 100,
        userUID: 'any_user_uid',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
  }
}
