import { TransactionModel } from '@/domain/models/transaction'
import { LoadTransactionsByDate } from '@/domain/usecases/transaction'

class LoadTransactionByDateImpl implements LoadTransactionsByDate {
  private loadTransactionsByDateRepository

  constructor(
    loadTransactionsByDateRepository: LoadTransactionsByDateRepositoryMock,
  ) {
    this.loadTransactionsByDateRepository = loadTransactionsByDateRepository
  }

  async execute(startDate: Date, endDate: Date): Promise<TransactionModel[]> {
    await this.loadTransactionsByDateRepository.loadByDate(startDate, endDate)
    return Promise.resolve([])
  }
}

class LoadTransactionsByDateRepositoryMock {
  async loadByDate(startDate: Date, endDate: Date): Promise<void> {}
}

type SutTypes = {
  sut: LoadTransactionByDateImpl
  loadTransactionsByDateRepositoryMock: LoadTransactionsByDateRepositoryMock
}

const makeSut = (): SutTypes => {
  const loadTransactionsByDateRepositoryMock =
    new LoadTransactionsByDateRepositoryMock()
  const sut = new LoadTransactionByDateImpl(
    loadTransactionsByDateRepositoryMock,
  )
  return {
    sut,
    loadTransactionsByDateRepositoryMock,
  }
}

describe('LoadTransactionByDate usecase', () => {
  it('should call LoadTransactionsByDateRepository with correct values', async () => {
    const { sut, loadTransactionsByDateRepositoryMock } = makeSut()
    const loadSpy = jest.spyOn(
      loadTransactionsByDateRepositoryMock,
      'loadByDate',
    )
    const fakeStartDate = new Date()
    const fakeEndDate = new Date()

    await sut.execute(fakeStartDate, fakeEndDate)

    expect(loadSpy).toHaveBeenCalledWith(fakeStartDate, fakeEndDate)
  })
})
