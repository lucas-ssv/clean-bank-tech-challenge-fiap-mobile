import {
  LoadTransactionsRepository,
  LoadTransactionsRepositoryResult,
} from '@/data/contracts/transaction'
import { TransactionType } from '@/domain/models/transaction'

export class LoadTransactionsRepositoryMock
  implements LoadTransactionsRepository
{
  loadAll(): Promise<LoadTransactionsRepositoryResult> {
    return Promise.resolve({
      transactionId: 'any_transaction_id',
      transactions: [
        {
          date: new Date(),
          transactionType: TransactionType.CAMBIO_DE_MOEDA,
          value: 100,
          userUID: 'any_user_uid',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })
  }
}
