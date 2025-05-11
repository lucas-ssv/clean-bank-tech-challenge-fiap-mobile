import {
  LoadTransactionsByDateRepository,
  LoadTransactionsByDateRepositoryResult,
} from '@/data/contracts/transaction'
import { TransactionType } from '@/domain/models/transaction'

export class LoadTransactionsByDateRepositoryMock
  implements LoadTransactionsByDateRepository
{
  async loadByDate(
    startDate: Date,
    endDate: Date,
  ): Promise<LoadTransactionsByDateRepositoryResult[]> {
    return Promise.resolve([
      {
        date: new Date(),
        transactionType: TransactionType.CAMBIO_DE_MOEDA,
        value: 100,
        userUID: 'any_user_uid',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  }
}
