import {
  LoadTransactions,
  LoadTransactionsResult,
} from '@/domain/usecases/transaction'

export class LoadTransactionsMock implements LoadTransactions {
  async execute(): Promise<LoadTransactionsResult[]> {
    return Promise.resolve([])
  }
}
