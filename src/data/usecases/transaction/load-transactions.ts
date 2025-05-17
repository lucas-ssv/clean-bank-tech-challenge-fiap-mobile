import { LoadTransactionsRepository } from '@/data/contracts/transaction'
import { LoadTransactionDocumentsRepository } from '@/data/contracts/transaction-document'
import {
  LoadTransactions,
  LoadTransactionsResult,
} from '@/domain/usecases/transaction'

export class LoadTransactionsImpl implements LoadTransactions {
  private loadTransactionsRepository
  private loadTransactionDocumentsRepository

  constructor(
    loadTransactionsRepository: LoadTransactionsRepository,
    loadTransactionDocumentsRepository: LoadTransactionDocumentsRepository,
  ) {
    this.loadTransactionDocumentsRepository = loadTransactionDocumentsRepository
    this.loadTransactionsRepository = loadTransactionsRepository
  }

  async execute(): Promise<LoadTransactionsResult[]> {
    const { transactionId, transactions } =
      await this.loadTransactionsRepository.loadAll()
    const documents =
      await this.loadTransactionDocumentsRepository.loadByTransactionId(
        transactionId,
      )
    return transactions.map((transaction) => ({
      ...transaction,
      documents,
    }))
  }
}
