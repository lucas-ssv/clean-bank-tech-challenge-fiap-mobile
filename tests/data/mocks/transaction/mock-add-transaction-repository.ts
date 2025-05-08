import {
  AddTransactionRepository,
  AddTransactionRepositoryParams,
} from '@/data/contracts/transaction'

export class AddTransactionRepositoryStub implements AddTransactionRepository {
  async add(transaction: AddTransactionRepositoryParams): Promise<string> {
    return Promise.resolve('any_transaction_id')
  }
}
