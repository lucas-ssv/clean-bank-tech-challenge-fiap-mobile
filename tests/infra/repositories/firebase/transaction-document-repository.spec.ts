import {
  AddTransactionDocumentRepository,
  AddTransactionDocumentRepositoryParams,
} from '@/data/contracts/transaction-document'
import { transactionDocumentConverter } from '@/infra/repositories/firebase/converters'
import { db } from '@/main/config/firebase'
import { addDoc, collection, Timestamp } from 'firebase/firestore'

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  initializeAuth: jest.fn(),
  getReactNativePersistence: jest.fn(),
  setPersistence: jest.fn(),
}))

jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn().mockResolvedValue({ id: 'any_transaction_id' }),
  collection: jest.fn(),
  getFirestore: jest.fn(),
  Timestamp: {
    now: jest.fn(() => 'any_timestamp'),
  },
}))

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}))

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
}))

class TransactionDocumentRepository
  implements AddTransactionDocumentRepository
{
  async add(
    transactionDocument: AddTransactionDocumentRepositoryParams,
  ): Promise<void> {
    await addDoc(
      collection(db, 'transaction-documents').withConverter(
        transactionDocumentConverter,
      ),
      {
        transactionId: transactionDocument.transactionId,
        mimeType: transactionDocument.mimeType,
        url: transactionDocument.url,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
    )
  }
}

describe('TransactionDocumentRepository', () => {
  it('should add a transaction document on success', async () => {
    const mockedCollectionWithConverter = 'mockedCollectionWithConverter'
    const withConverterMock = jest
      .fn()
      .mockReturnValue(mockedCollectionWithConverter)
    ;(collection as jest.Mock).mockReturnValue({
      withConverter: withConverterMock,
    })
    const sut = new TransactionDocumentRepository()

    await sut.add({
      transactionId: 'any_transaction_id',
      mimeType: 'any_mimetype',
      url: 'any_url',
    })

    expect(addDoc).toHaveBeenCalledWith(mockedCollectionWithConverter, {
      transactionId: 'any_transaction_id',
      mimeType: 'any_mimetype',
      url: 'any_url',
      createdAt: 'any_timestamp',
      updatedAt: 'any_timestamp',
    })
  })
})
