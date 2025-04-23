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

  constructor(
    addTransactionRepository: AddTransactionRepository,
    uploadTransactionDocumentService: UploadTransactionDocumentServiceMock,
  ) {
    this.addTransactionRepository = addTransactionRepository
    this.uploadTransactionDocumentService = uploadTransactionDocumentService
  }

  async execute(
    transaction: AddTransactionParams,
  ): Promise<AddTransactionModel> {
    await this.addTransactionRepository.add(transaction)

    for (const transactionDocument of transaction.transactionDocuments) {
      await this.uploadTransactionDocumentService.upload(transactionDocument)
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
    return Promise.resolve(null as any)
  }
}

class UploadTransactionDocumentServiceMock {
  async upload(transactionDocument: any): Promise<void> {}
}

describe('AddTransaction usecase', () => {
  it('should call AddTransactionRepository with correct values', async () => {
    const addTransactionRepositoryStub = new AddTransactionRepositoryStub()
    const addSpy = jest.spyOn(addTransactionRepositoryStub, 'add')
    const uploadTransactionDocumentServiceMock =
      new UploadTransactionDocumentServiceMock()
    const sut = new AddTransactionImpl(
      addTransactionRepositoryStub,
      uploadTransactionDocumentServiceMock,
    )

    await sut.execute({
      transactionType: TransactionType.CAMBIO_DE_MOEDA,
      transactionDocuments: [
        {
          mimeType: 'any_mimetype',
          name: 'any_name',
          transactionId: 'any_transaction_id',
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
          transactionId: 'any_transaction_id',
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
    const sut = new AddTransactionImpl(
      addTransactionRepositoryStub,
      uploadTransactionDocumentServiceMock,
    )

    await sut.execute({
      transactionType: TransactionType.CAMBIO_DE_MOEDA,
      transactionDocuments: [
        {
          mimeType: 'any_mimetype',
          name: 'any_name',
          transactionId: 'any_transaction_id',
          uri: 'any_uri',
        },
      ],
      date: new Date(),
      value: 100,
      userUID: 'any_user_uid',
    })

    expect(uploadSpy).toHaveBeenCalledWith({
      mimeType: 'any_mimetype',
      name: 'any_name',
      transactionId: 'any_transaction_id',
      uri: 'any_uri',
    })
    expect(uploadSpy).toHaveBeenCalledTimes(1)
  })
})
