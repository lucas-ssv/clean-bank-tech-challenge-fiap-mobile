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

describe('AddTransaction usecase', () => {
  it('should call AddTransactionRepository with correct values', async () => {
    const addTransactionRepositoryStub = new AddTransactionRepositoryStub()
    const addSpy = jest.spyOn(addTransactionRepositoryStub, 'add')
    const uploadTransactionDocumentServiceStub =
      new UploadTransactionDocumentServiceStub()
    const addTransactionDocumentRepositoryMock =
      new AddTransactionDocumentRepositoryMock()

    const sut = new AddTransactionImpl(
      addTransactionRepositoryStub,
      uploadTransactionDocumentServiceStub,
      addTransactionDocumentRepositoryMock,
    )

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
    const addTransactionRepositoryStub = new AddTransactionRepositoryStub()
    const uploadTransactionDocumentServiceStub =
      new UploadTransactionDocumentServiceStub()
    const uploadSpy = jest.spyOn(uploadTransactionDocumentServiceStub, 'upload')
    const addTransactionDocumentRepositoryMock =
      new AddTransactionDocumentRepositoryMock()
    const sut = new AddTransactionImpl(
      addTransactionRepositoryStub,
      uploadTransactionDocumentServiceStub,
      addTransactionDocumentRepositoryMock,
    )

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
    const addTransactionRepositoryStub = new AddTransactionRepositoryStub()
    const uploadTransactionDocumentServiceStub =
      new UploadTransactionDocumentServiceStub()
    const addTransactionDocumentRepositoryMock =
      new AddTransactionDocumentRepositoryMock()
    const addSpy = jest.spyOn(addTransactionDocumentRepositoryMock, 'add')
    const sut = new AddTransactionImpl(
      addTransactionRepositoryStub,
      uploadTransactionDocumentServiceStub,
      addTransactionDocumentRepositoryMock,
    )

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
})
