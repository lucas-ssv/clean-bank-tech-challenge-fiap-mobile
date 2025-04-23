import { AddTransactionModel } from '@/domain/models/transaction'
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
    uploadTransactionDocumentService: UploadTransactionDocumentServiceMock,
    addTransactionDocumentRepository: AddTransactionDocumentRepositoryMock,
  ) {
    this.addTransactionRepository = addTransactionRepository
    this.uploadTransactionDocumentService = uploadTransactionDocumentService
    this.addTransactionDocumentRepository = addTransactionDocumentRepository
  }

  async execute(
    transaction: AddTransactionParams,
  ): Promise<AddTransactionModel> {
    const { id } = await this.addTransactionRepository.add(transaction)

    for (const transactionDocument of transaction.transactionDocuments) {
      const { documentUrl } =
        await this.uploadTransactionDocumentService.upload(
          transactionDocument.uri,
        )
      await this.addTransactionDocumentRepository.add({
        transactionId: id,
        mimeType: transactionDocument.mimeType,
        url: documentUrl,
      })
    }

    return null as any
  }
}

type AddTransactionRepositoryParams = {
  transactionType: TransactionType
  date: Date
  value: number
  userUID: string
}

type AddTransactionRepositoryResult = {
  id: string
}

interface AddTransactionRepository {
  add: (
    transaction: AddTransactionRepositoryParams,
  ) => Promise<AddTransactionRepositoryResult>
}

class AddTransactionRepositoryStub implements AddTransactionRepository {
  async add(
    transaction: AddTransactionRepositoryParams,
  ): Promise<AddTransactionRepositoryResult> {
    return Promise.resolve({
      id: 'any_transaction_id',
    })
  }
}

type UploadResult = {
  documentUrl: string
}

class UploadTransactionDocumentServiceMock {
  async upload(transactionDocument: any): Promise<UploadResult> {
    return {
      documentUrl: 'any_url',
    }
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
    const uploadTransactionDocumentServiceMock =
      new UploadTransactionDocumentServiceMock()
    const addTransactionDocumentRepositoryMock =
      new AddTransactionDocumentRepositoryMock()

    const sut = new AddTransactionImpl(
      addTransactionRepositoryStub,
      uploadTransactionDocumentServiceMock,
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
    const uploadTransactionDocumentServiceMock =
      new UploadTransactionDocumentServiceMock()
    const uploadSpy = jest.spyOn(uploadTransactionDocumentServiceMock, 'upload')
    const addTransactionDocumentRepositoryMock =
      new AddTransactionDocumentRepositoryMock()
    const sut = new AddTransactionImpl(
      addTransactionRepositoryStub,
      uploadTransactionDocumentServiceMock,
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
    const uploadTransactionDocumentServiceMock =
      new UploadTransactionDocumentServiceMock()
    const addTransactionDocumentRepositoryMock =
      new AddTransactionDocumentRepositoryMock()
    const addSpy = jest.spyOn(addTransactionDocumentRepositoryMock, 'add')
    const sut = new AddTransactionImpl(
      addTransactionRepositoryStub,
      uploadTransactionDocumentServiceMock,
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
