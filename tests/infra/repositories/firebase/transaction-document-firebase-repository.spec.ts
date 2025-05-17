import { TransactionDocumentFirebaseRepository } from '@/infra/repositories/firebase'
import { addDoc, collection } from 'firebase/firestore'

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
  where: jest.fn(),
  query: jest.fn(),
  getDocs: jest.fn().mockResolvedValue({
    forEach: (callback: (doc: any) => void) => {
      callback({
        data: () => {
          return {
            id: 'any_transaction_id',
            fileName: 'any_filename',
            transactionId: 'any_transaction_id',
            mimeType: 'any_mimetype',
            url: 'any_url',
            createdAt: 'any_timestamp',
            updatedAt: 'any_timestamp',
          }
        },
      })
    },
  }),
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

describe('TransactionDocumentRepository', () => {
  describe('add()', () => {
    it('should add a transaction document on success', async () => {
      const mockedCollectionWithConverter = 'mockedCollectionWithConverter'
      const withConverterMock = jest
        .fn()
        .mockReturnValue(mockedCollectionWithConverter)
      ;(collection as jest.Mock).mockReturnValue({
        withConverter: withConverterMock,
      })
      const sut = new TransactionDocumentFirebaseRepository()

      await sut.add({
        fileName: 'any_filename',
        transactionId: 'any_transaction_id',
        mimeType: 'any_mimetype',
        url: 'any_url',
      })

      expect(addDoc).toHaveBeenCalledWith(mockedCollectionWithConverter, {
        fileName: 'any_filename',
        transactionId: 'any_transaction_id',
        mimeType: 'any_mimetype',
        url: 'any_url',
        createdAt: 'any_timestamp',
        updatedAt: 'any_timestamp',
      })
    })
  })

  describe('loadByTransactionId', () => {
    it('should load transaction documents by transaction id', async () => {
      const sut = new TransactionDocumentFirebaseRepository()

      const documents = await sut.loadByTransactionId('any_transaction_id')

      expect(documents).toEqual([
        {
          fileName: 'any_filename',
          mimeType: 'any_mimetype',
          url: 'any_url',
        },
      ])
    })
  })
})
