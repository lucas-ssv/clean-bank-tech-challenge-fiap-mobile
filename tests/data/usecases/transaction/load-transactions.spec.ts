import { LoadTransactionsImpl } from '@/data/usecases/transaction'
import { TransactionType } from '@/domain/models/transaction'
import { LoadTransactionsRepositoryMock } from '@tests/data/mocks/transaction'
import { LoadTransactionDocumentsRepositoryMock } from '@tests/data/mocks/transaction-document'

jest.useFakeTimers()

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
  it('should call LoadTransactionsRepository with correct values', async () => {
    const { sut, loadTransactionsRepositoryMock } = makeSut()
    const loadSpy = jest.spyOn(loadTransactionsRepositoryMock, 'loadAll')
    const fakeFilters = {
      transactionType: TransactionType.CAMBIO_DE_MOEDA,
      date: new Date(),
      minimumValue: 100,
      maximumValue: 200,
    }

    await sut.execute(fakeFilters)

    expect(loadSpy).toHaveBeenCalledWith(fakeFilters)
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

  it('should return a list of transactions with documents', async () => {
    const { sut } = makeSut()

    const transactions = await sut.execute()

    expect(transactions).toEqual([
      {
        id: 'any_transaction_id',
        date: new Date(),
        transactionType: TransactionType.CAMBIO_DE_MOEDA,
        value: 100,
        userUID: 'any_user_uid',
        documents: [
          {
            name: 'any_document_name',
            mimeType: 'any_mime_type',
            uri: 'any_uri',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  })

  it('should throw if LoadTransactionsRepository throws', async () => {
    const { sut, loadTransactionsRepositoryMock } = makeSut()
    jest
      .spyOn(loadTransactionsRepositoryMock, 'loadAll')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute()

    await expect(promise).rejects.toThrow()
  })

  it('should throw if LoadTransactionDocumentsRepository throws', async () => {
    const { sut, loadTransactionDocumentsRepositoryMock } = makeSut()
    jest
      .spyOn(loadTransactionDocumentsRepositoryMock, 'loadByTransactionId')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute()

    await expect(promise).rejects.toThrow()
  })
})
