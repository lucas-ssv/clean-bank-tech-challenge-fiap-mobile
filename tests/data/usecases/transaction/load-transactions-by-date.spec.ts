import { TransactionModel } from '@/domain/models/transaction'
import {
  LoadTransactionsByDate,
  TransactionType,
} from '@/domain/usecases/transaction'

class LoadTransactionByDateImpl implements LoadTransactionsByDate {
  private loadTransactionsByDateRepository

  constructor(
    loadTransactionsByDateRepository: LoadTransactionsByDateRepository,
  ) {
    this.loadTransactionsByDateRepository = loadTransactionsByDateRepository
  }

  async execute(startDate: Date, endDate: Date): Promise<TransactionModel[]> {
    const transactions = await this.loadTransactionsByDateRepository.loadByDate(
      startDate,
      endDate,
    )
    return transactions
  }
}

type LoadTransactionsByDateRepositoryResult = TransactionModel

interface LoadTransactionsByDateRepository {
  loadByDate: (
    startDate: Date,
    endDate: Date,
  ) => Promise<LoadTransactionsByDateRepositoryResult[]>
}

class LoadTransactionsByDateRepositoryMock
  implements LoadTransactionsByDateRepository
{
  async loadByDate(
    startDate: Date,
    endDate: Date,
  ): Promise<LoadTransactionsByDateRepositoryResult[]> {
    return Promise.resolve([
      {
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

  it('should return a list of transactions on success', async () => {
    const { sut } = makeSut()

    const transactions = await sut.execute(new Date(), new Date())

    expect(transactions).toEqual([
      {
        date: new Date(),
        transactionType: TransactionType.CAMBIO_DE_MOEDA,
        value: 100,
        userUID: 'any_user_uid',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  })
})
