import { TransactionModel, TransactionType } from '@/domain/models/transaction'
import { TransactionDocumentModel } from '@/domain/models/transaction-document'
import {
  LoadTransactions,
  LoadTransactionsResult,
} from '@/domain/usecases/transaction'

class LoadTransactionsImpl implements LoadTransactions {
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
    const { transactionId } = await this.loadTransactionsRepository.loadAll()
    await this.loadTransactionDocumentsRepository.loadByTransactionId(
      transactionId,
    )
    return []
  }
}

type LoadTransactionsRepositoryResult = {
  transactionId: string
  transactions: TransactionModel[]
}

interface LoadTransactionsRepository {
  loadAll: () => Promise<LoadTransactionsRepositoryResult>
}

class LoadTransactionsRepositoryMock implements LoadTransactionsRepository {
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

type LoadTransactionDocumentsRepositoryResult = TransactionDocumentModel[]

interface LoadTransactionDocumentsRepository {
  loadByTransactionId: (
    transactionId: string,
  ) => Promise<LoadTransactionDocumentsRepositoryResult>
}

class LoadTransactionDocumentsRepositoryMock
  implements LoadTransactionDocumentsRepository
{
  async loadByTransactionId(
    transactionId: string,
  ): Promise<LoadTransactionDocumentsRepositoryResult> {
    return Promise.resolve([])
  }
}

type SutTypes = {
  sut: LoadTransactionsImpl
  loadTransactionsRepositoryMock: LoadTransactionsRepositoryMock
  loadTransactionDocumentsRepositoryMock: LoadTransactionDocumentsRepositoryMock
}

const makeSut = (): SutTypes => {
  const loadTransactionsRepositoryMock = new LoadTransactionsRepositoryMock()
  const loadTransactionDocumentsRepositoryMock =
    new LoadTransactionDocumentsRepositoryMock()
  const sut = new LoadTransactionsImpl(
    loadTransactionsRepositoryMock,
    loadTransactionDocumentsRepositoryMock,
  )
  return {
    sut,
    loadTransactionsRepositoryMock,
    loadTransactionDocumentsRepositoryMock,
  }
}

describe('LoadTransactions usecase', () => {
  it('should call LoadTransactionsRepository', async () => {
    const { sut, loadTransactionsRepositoryMock } = makeSut()
    const loadSpy = jest.spyOn(loadTransactionsRepositoryMock, 'loadAll')

    await sut.execute()

    expect(loadSpy).toHaveBeenCalled()
  })

  it('should call LoadTransactionDocumentsRepository with correct transactionId', async () => {
    const { sut, loadTransactionDocumentsRepositoryMock } = makeSut()
    const loadSpy = jest.spyOn(
      loadTransactionDocumentsRepositoryMock,
      'loadByTransactionId',
    )

    await sut.execute()

    expect(loadSpy).toHaveBeenCalledWith('any_transaction_id')
  })
})
