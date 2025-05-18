import { addDoc, collection, getDocs } from 'firebase/firestore'
import { randomUUID } from 'expo-crypto'

import { TransactionType } from '@/data/contracts/transaction'
import { TransactionFirebaseRepository } from '@/infra/repositories/firebase'

jest.useFakeTimers()

jest.mock('expo-crypto', () => ({
  randomUUID: jest.fn(() => 'any_transaction_id'),
}))

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
    docs: [
      {
        id: 'any_transaction_id',
      },
    ],
    forEach: (callback: (doc: any) => void) => {
      callback({
        data: () => {
          return {
            id: 'any_transaction_id',
            transactionType: 'cambio',
            date: new Date(),
            value: 100,
            userUID: 'any_user_uid',
            createdAt: 'any_timestamp',
            updatedAt: 'any_timestamp',
          }
        },
      })
    },
  }),
  Timestamp: {
    now: jest.fn(() => 'any_timestamp'),
    toDate: jest.fn(),
  },
}))

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}))

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
}))

jest.mock('@/main/config/firebase', () => ({
  auth: {
    currentUser: {
      uid: 'any_user_uid',
    },
  },
}))

describe('TransactionFirebaseRepository', () => {
  describe('add()', () => {
    it('should add a transaction on success', async () => {
      const mockedCollectionWithConverter = 'mockedCollectionWithConverter'
      const withConverterMock = jest
        .fn()
        .mockReturnValue(mockedCollectionWithConverter)
      ;(collection as jest.Mock).mockReturnValue({
        withConverter: withConverterMock,
      })
      const sut = new TransactionFirebaseRepository()
      const fakeId = randomUUID()

      await sut.add({
        transactionType: TransactionType.CAMBIO_DE_MOEDA,
        date: new Date(),
        value: 100,
        userUID: 'any_user_uid',
      })

      expect(addDoc).toHaveBeenCalledWith(mockedCollectionWithConverter, {
        id: fakeId,
        transactionType: TransactionType.CAMBIO_DE_MOEDA,
        date: new Date(),
        value: 100,
        userUID: 'any_user_uid',
        createdAt: new Date(),
        updatedAt: new Date(),
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

  describe('loadByDate()', () => {
    it('should load transactions by date on success', async () => {
      const sut = new TransactionFirebaseRepository()

      const transactions = await sut.loadByDate(new Date(), new Date())

      expect(transactions).toEqual([
        {
          id: randomUUID(),
          transactionType: TransactionType.CAMBIO_DE_MOEDA,
          date: new Date(),
          value: 100,
          userUID: 'any_user_uid',
          createdAt: 'any_timestamp',
          updatedAt: 'any_timestamp',
        },
      ])
    })
  })

  describe('loadAll()', () => {
    it('should load all transactions on success', async () => {
      const sut = new TransactionFirebaseRepository()

      const transactions = await sut.loadAll()

      expect(transactions).toEqual({
        transactionId: 'any_transaction_id',
        transactions: [
          {
            id: randomUUID(),
            transactionType: TransactionType.CAMBIO_DE_MOEDA,
            date: new Date(),
            value: 100,
            userUID: 'any_user_uid',
            createdAt: 'any_timestamp',
            updatedAt: 'any_timestamp',
          },
        ],
      })
    })

    it('should return an empty array if no transactions are found', async () => {
      ;(getDocs as jest.Mock).mockResolvedValueOnce({
        empty: true,
      })
      const sut = new TransactionFirebaseRepository()

      const transactions = await sut.loadAll()

      expect(transactions).toEqual({
        transactionId: '',
        transactions: [],
      })
    })

    it('should call where with transactionType if it is provided', async () => {
      const sut = new TransactionFirebaseRepository()
      const whereSpy = jest.spyOn(require('firebase/firestore'), 'where')

      await sut.loadAll({
        transactionType: TransactionType.CAMBIO_DE_MOEDA,
      })

      expect(whereSpy).toHaveBeenCalledWith(
        'transactionType',
        '==',
        TransactionType.CAMBIO_DE_MOEDA,
      )
    })

    it('should call where with transactionDate if it is provided', async () => {
      const sut = new TransactionFirebaseRepository()
      const whereSpy = jest.spyOn(require('firebase/firestore'), 'where')
      const fakeDate = new Date()

      await sut.loadAll({
        date: fakeDate,
      })

      expect(whereSpy).toHaveBeenCalledWith('date', '==', fakeDate)
    })
  })
})
