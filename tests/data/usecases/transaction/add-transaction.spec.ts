import { AddTransactionImpl } from '@/data/usecases/transaction'
import { TransactionType } from '@/domain/usecases/transaction'
import { UploadTransactionDocumentServiceStub } from '@tests/data/mocks/services'
import { AddTransactionRepositoryStub } from '@tests/data/mocks/transaction'
import { AddTransactionDocumentRepositoryMock } from '@tests/data/mocks/transaction-document'

jest.useFakeTimers()

type SutTypes = {
  sut: AddTransactionImpl
  addTransactionRepositoryStub: AddTransactionRepositoryStub
  uploadTransactionDocumentServiceStub: UploadTransactionDocumentServiceStub
  addTransactionDocumentRepositoryMock: AddTransactionDocumentRepositoryMock
}

const makeSut = (): SutTypes => {
  const addTransactionRepositoryStub = new AddTransactionRepositoryStub()
  const uploadTransactionDocumentServiceStub =
    new UploadTransactionDocumentServiceStub()
  const addTransactionDocumentRepositoryMock =
    new AddTransactionDocumentRepositoryMock()

  const sut = new AddTransactionImpl(
    addTransactionRepositoryStub,
    uploadTransactionDocumentServiceStub,
    addTransactionDocumentRepositoryMock,
  )

  return {
    sut,
    addTransactionRepositoryStub,
    uploadTransactionDocumentServiceStub,
    addTransactionDocumentRepositoryMock,
  }
}

describe('AddTransaction usecase', () => {
  it('should call AddTransactionRepository with correct values', async () => {
    const { sut, addTransactionRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addTransactionRepositoryStub, 'add')

    await sut.execute({
      transactionType: TransactionType.CAMBIO_DE_MOEDA,
      transactionDocuments: [
        {
          mimeType: 'any_mimetype',
          name: 'any_name',
          uri: 'any_uri',
        },
      ],
      date: new Date(),
      value: 100,
      userUID: 'any_user_uid',
    })

    expect(addSpy).toHaveBeenCalledWith({
      transactionType: TransactionType.CAMBIO_DE_MOEDA,
      transactionDocuments: [
        {
          mimeType: 'any_mimetype',
          name: 'any_name',
          uri: 'any_uri',
        },
      ],
      date: new Date(),
      value: 100,
      userUID: 'any_user_uid',
    })
  })

  it('should call UploadTransactionDocumentService with correct values', async () => {
    const { sut, uploadTransactionDocumentServiceStub } = makeSut()
    const uploadSpy = jest.spyOn(uploadTransactionDocumentServiceStub, 'upload')

    await sut.execute({
      transactionType: TransactionType.CAMBIO_DE_MOEDA,
      transactionDocuments: [
        {
          mimeType: 'any_mimetype',
          name: 'any_name',
          uri: 'any_uri',
        },
      ],
      date: new Date(),
      value: 100,
      userUID: 'any_user_uid',
    })

    expect(uploadSpy).toHaveBeenCalledWith('any_uri')
    expect(uploadSpy).toHaveBeenCalledTimes(1)
  })

  it('should call AddTransactionDocumentRepository with correct values', async () => {
    const { sut, addTransactionDocumentRepositoryMock } = makeSut()
    const addSpy = jest.spyOn(addTransactionDocumentRepositoryMock, 'add')

    await sut.execute({
      transactionType: TransactionType.CAMBIO_DE_MOEDA,
      transactionDocuments: [
        {
          mimeType: 'any_mimetype',
          name: 'any_name',
          uri: 'any_uri',
        },
      ],
      date: new Date(),
      value: 100,
      userUID: 'any_user_uid',
    })

    expect(addSpy).toHaveBeenCalledWith({
      fileName: 'any_filename',
      transactionId: 'any_transaction_id',
      mimeType: 'any_mimetype',
      url: 'any_url',
    })
  })

  it('should throw if AddTransactionRepository throws', async () => {
    const { sut, addTransactionRepositoryStub } = makeSut()
    jest
      .spyOn(addTransactionRepositoryStub, 'add')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute({
      transactionType: TransactionType.CAMBIO_DE_MOEDA,
      transactionDocuments: [
        {
          mimeType: 'any_mimetype',
          name: 'any_name',
          uri: 'any_uri',
        },
      ],
      date: new Date(),
      value: 100,
      userUID: 'any_user_uid',
    })

    expect(promise).rejects.toThrow()
  })

  it('should throw if UploadTransactionDocumentService throws', async () => {
    const { sut, uploadTransactionDocumentServiceStub } = makeSut()
    jest
      .spyOn(uploadTransactionDocumentServiceStub, 'upload')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute({
      transactionType: TransactionType.CAMBIO_DE_MOEDA,
      transactionDocuments: [
        {
          mimeType: 'any_mimetype',
          name: 'any_name',
          uri: 'any_uri',
        },
      ],
      date: new Date(),
      value: 100,
      userUID: 'any_user_uid',
    })

    expect(promise).rejects.toThrow()
  })

  it('should throw if AddTransactionDocumentRepository throws', async () => {
    const { sut, addTransactionDocumentRepositoryMock } = makeSut()
    jest
      .spyOn(addTransactionDocumentRepositoryMock, 'add')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute({
      transactionType: TransactionType.CAMBIO_DE_MOEDA,
      transactionDocuments: [
        {
          mimeType: 'any_mimetype',
          name: 'any_name',
          uri: 'any_uri',
        },
      ],
      date: new Date(),
      value: 100,
      userUID: 'any_user_uid',
    })

    expect(promise).rejects.toThrow()
  })
})
