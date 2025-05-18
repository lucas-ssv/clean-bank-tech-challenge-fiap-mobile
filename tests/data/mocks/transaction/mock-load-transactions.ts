import {
  LoadTransactionsFilterParams,
  LoadTransactionsRepository,
} from '@/data/contracts/transaction'
import { TransactionModel, TransactionType } from '@/domain/models/transaction'

export class LoadTransactionsRepositoryMock
  implements LoadTransactionsRepository
{
  async loadAll(
    filters?: LoadTransactionsFilterParams,
  ): Promise<TransactionModel<any>[]> {
    return Promise.resolve([
      {
        id: 'any_transaction_id',
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
