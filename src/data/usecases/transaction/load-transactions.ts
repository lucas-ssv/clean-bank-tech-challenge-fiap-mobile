import { LoadTransactionsRepository } from '@/data/contracts/transaction'
import { LoadTransactionDocumentsRepository } from '@/data/contracts/transaction-document'
import {
  LoadTransactions,
  LoadTransactionsFilterParams,
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

  async execute(
    filters?: LoadTransactionsFilterParams,
  ): Promise<LoadTransactionsResult[]> {
    const transactions = await this.loadTransactionsRepository.loadAll(filters)
    const transactionsWithDocuments: LoadTransactionsResult[] = []

    for (const transaction of transactions) {
      const documents =
        await this.loadTransactionDocumentsRepository.loadByTransactionId(
          transaction.id,
        )
      transactionsWithDocuments.push({
        ...transaction,
        documents,
      })
    }

    return transactionsWithDocuments
  }
}
