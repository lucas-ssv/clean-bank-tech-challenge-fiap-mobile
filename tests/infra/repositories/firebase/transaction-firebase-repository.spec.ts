import { addDoc, collection, Timestamp } from 'firebase/firestore'

import {
  AddTransactionRepository,
  AddTransactionRepositoryParams,
  TransactionType,
} from '@/data/contracts/transaction'
import { db } from '@/main/config/firebase'
import { transactionConverter } from '@/infra/repositories/firebase/converters'

jest.useFakeTimers()

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

class TransactionFirebaseRepository implements AddTransactionRepository {
  async add(transaction: AddTransactionRepositoryParams): Promise<string> {
    const transactionRef = await addDoc(
      collection(db, 'transactions').withConverter(transactionConverter),
      {
        transactionType: transaction.transactionType,
        date: transaction.date,
        value: transaction.value,
        userUID: transaction.userUID,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
    )
    return transactionRef.id
  }
}

describe('TransactionFirebaseRepository', () => {
  it('should add a transaction on success', async () => {
    const mockedCollectionWithConverter = 'mockedCollectionWithConverter'
    const withConverterMock = jest
      .fn()
      .mockReturnValue(mockedCollectionWithConverter)
    ;(collection as jest.Mock).mockReturnValue({
      withConverter: withConverterMock,
    })
    const sut = new TransactionFirebaseRepository()

    await sut.add({
      transactionType: TransactionType.CAMBIO_DE_MOEDA,
      date: new Date(),
      value: 100,
      userUID: 'any_user_uid',
    })

    expect(addDoc).toHaveBeenCalledWith(mockedCollectionWithConverter, {
      transactionType: TransactionType.CAMBIO_DE_MOEDA,
      date: new Date(),
      value: 100,
      userUID: 'any_user_uid',
      createdAt: 'any_timestamp',
      updatedAt: 'any_timestamp',
    })
  })

  it('should return a transaction id on success', async () => {
    const mockedCollectionWithConverter = 'mockedCollectionWithConverter'
    const withConverterMock = jest
      .fn()
      .mockReturnValue(mockedCollectionWithConverter)
    ;(collection as jest.Mock).mockReturnValue({
      withConverter: withConverterMock,
    })
    const sut = new TransactionFirebaseRepository()

    const transactionId = await sut.add({
      transactionType: TransactionType.CAMBIO_DE_MOEDA,
      date: new Date(),
      value: 100,
      userUID: 'any_user_uid',
    })

    expect(transactionId).toBe('any_transaction_id')
  })
})
