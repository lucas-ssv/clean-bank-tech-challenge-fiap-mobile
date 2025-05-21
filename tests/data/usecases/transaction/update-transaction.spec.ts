import { UpdateTransactionImpl } from '@/data/usecases/transaction'
import { TransactionType } from '@/domain/models/transaction'
import { UpdateTransactionRepositoryMock } from '@tests/data/mocks/transaction'

jest.useFakeTimers()

type SutTypes = {
  sut: UpdateTransactionImpl
  updateTransactionRepositoryMock: UpdateTransactionRepositoryMock
}

const makeSut = (): SutTypes => {
  const updateTransactionRepositoryMock = new UpdateTransactionRepositoryMock()
  const sut = new UpdateTransactionImpl(updateTransactionRepositoryMock)

  return {
    sut,
    updateTransactionRepositoryMock,
  }
}

describe('UpdateTransaction usecase', () => {
  it('should call UpdateTransactionRepository with correct values', async () => {
    const { sut, updateTransactionRepositoryMock } = makeSut()
    const updateSpy = jest.spyOn(updateTransactionRepositoryMock, 'update')

    await sut.execute('any_transaction_id', {
      transactionType: TransactionType.CAMBIO_DE_MOEDA,
      value: 100,
      date: new Date(),
    })

    expect(updateSpy).toHaveBeenCalledWith('any_transaction_id', {
      transactionType: TransactionType.CAMBIO_DE_MOEDA,
      value: 100,
      date: new Date(),
    })
  })

  it('should throw if UpdateTransactionRepository throws', async () => {
    const { sut, updateTransactionRepositoryMock } = makeSut()
    jest
      .spyOn(updateTransactionRepositoryMock, 'update')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute('any_transaction_id', {
      transactionType: TransactionType.CAMBIO_DE_MOEDA,
      value: 100,
      date: new Date(),
    })

    await expect(promise).rejects.toThrow()
  })
})
