import { LoadTransactionByDateImpl } from '@/data/usecases/transaction'
import { TransactionType } from '@/domain/usecases/transaction'
import { LoadTransactionsByDateRepositoryMock } from '@tests/data/mocks/transaction'

jest.useFakeTimers()

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

  it('should throw if LoadTransactionsByDateRepository throws', async () => {
    const { sut, loadTransactionsByDateRepositoryMock } = makeSut()
    jest
      .spyOn(loadTransactionsByDateRepositoryMock, 'loadByDate')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute(new Date(), new Date())

    await expect(promise).rejects.toThrow()
  })
})
