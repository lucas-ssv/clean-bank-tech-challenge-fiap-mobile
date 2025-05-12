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
    return Promise.resolve([])
  }
}

class LoadTransactionsRepositoryMock {
  async loadAll(): Promise<void> {}
}

describe('LoadTransactions usecase', () => {
  it('should call LoadTransactionsRepository', async () => {
    const loadTransactionsRepositoryMock = new LoadTransactionsRepositoryMock()
    const loadSpy = jest.spyOn(loadTransactionsRepositoryMock, 'loadAll')
    const sut = new LoadTransactionImpl(loadTransactionsRepositoryMock)

    await sut.execute()

    expect(loadSpy).toHaveBeenCalled()
  })
})
