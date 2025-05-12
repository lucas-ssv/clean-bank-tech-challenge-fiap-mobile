import {
  LoadTransactions,
  LoadTransactionsResult,
} from '@/domain/usecases/transaction'

class LoadTransactionImpl implements LoadTransactions {
  private loadTransactionsRepository

  constructor(loadTransactionsRepository: LoadTransactionsRepositoryMock) {
    this.loadTransactionsRepository = loadTransactionsRepository
  }

  async execute(): Promise<LoadTransactionsResult[]> {
    await this.loadTransactionsRepository.loadAll()
    return []
  }
}

class LoadTransactionsRepositoryMock {
  async loadAll(): Promise<void> {}
}

type SutTypes = {
  sut: LoadTransactionImpl
  loadTransactionsRepositoryMock: LoadTransactionsRepositoryMock
}

const makeSut = (): SutTypes => {
  const loadTransactionsRepositoryMock = new LoadTransactionsRepositoryMock()
  const sut = new LoadTransactionImpl(loadTransactionsRepositoryMock)
  return {
    sut,
    loadTransactionsRepositoryMock,
  }
}

describe('LoadTransactions usecase', () => {
  it('should call LoadTransactionsRepository', async () => {
    const { sut, loadTransactionsRepositoryMock } = makeSut()
    const loadSpy = jest.spyOn(loadTransactionsRepositoryMock, 'loadAll')

    await sut.execute()

    expect(loadSpy).toHaveBeenCalled()
  })
})
