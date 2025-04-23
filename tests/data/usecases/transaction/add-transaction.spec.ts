import {
  AddTransaction,
  AddTransactionParams,
  TransactionType,
} from '@/domain/usecases/transaction/add-transaction'

jest.useFakeTimers()

class AddTransactionImpl implements AddTransaction {
  private addTransactionRepository
  private uploadTransactionDocumentService
  private addTransactionDocumentRepository

  constructor(
    addTransactionRepository: AddTransactionRepository,
    uploadTransactionDocumentService: UploadTransactionDocumentServiceStub,
    addTransactionDocumentRepository: AddTransactionDocumentRepository,
  ) {
    this.addTransactionRepository = addTransactionRepository
    this.uploadTransactionDocumentService = uploadTransactionDocumentService
    this.addTransactionDocumentRepository = addTransactionDocumentRepository
  }

  async execute(transaction: AddTransactionParams): Promise<void> {
    const transactionId = await this.addTransactionRepository.add(transaction)

    for (const transactionDocument of transaction.transactionDocuments) {
      const documentUrl = await this.uploadTransactionDocumentService.upload(
        transactionDocument.uri,
      )
      await this.addTransactionDocumentRepository.add({
        transactionId,
        mimeType: transactionDocument.mimeType,
        url: documentUrl,
      })
    }
  }
}

type AddTransactionRepositoryParams = {
  transactionType: TransactionType
  date: Date
  value: number
  userUID: string
}

interface AddTransactionRepository {
  add: (transaction: AddTransactionRepositoryParams) => Promise<string>
}

class AddTransactionRepositoryStub implements AddTransactionRepository {
  async add(transaction: AddTransactionRepositoryParams): Promise<string> {
    return Promise.resolve('any_transaction_id')
  }
}

interface UploadTransactionDocumentService {
  upload: (uri: string) => Promise<string>
}

class UploadTransactionDocumentServiceStub
  implements UploadTransactionDocumentService
{
  async upload(uri: string): Promise<string> {
    return 'any_url'
  }
}

type AddTransactionDocumentRepositoryParams = {
  transactionId: string
  mimeType: string
  url: string
}

interface AddTransactionDocumentRepository {
  add: (
    transactionDocument: AddTransactionDocumentRepositoryParams,
  ) => Promise<void>
}

class AddTransactionDocumentRepositoryMock
  implements AddTransactionDocumentRepository
{
  async add(
    transactionDocument: AddTransactionDocumentRepositoryParams,
  ): Promise<void> {}
}

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
