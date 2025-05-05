import { AccountFirebaseRepository } from '@/infra/repositories/firebase'
import { auth } from '@/main/config/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn().mockResolvedValue({
    user: {
      uid: 'any_user_uid',
    },
  }),
  initializeAuth: jest.fn(),
  getReactNativePersistence: jest.fn(),
  setPersistence: jest.fn(),
}))

jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn(),
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

describe('AccountFirebaseRepository', () => {
  describe('add()', () => {
    it('should add an account on success', async () => {
      const sut = new AccountFirebaseRepository()

      await sut.add({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      })

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'any_email@mail.com',
        'any_password',
      )
    })

    it('should return an userUID on success', async () => {
      const sut = new AccountFirebaseRepository()

      const userUID = await sut.add({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      })

      expect(userUID).toBe('any_user_uid')
    })
  })

  describe('save()', () => {
    it('should save an user on success', async () => {
      const mockedCollectionWithConverter = 'mockedCollectionWithConverter'
      const withConverterMock = jest
        .fn()
        .mockReturnValue(mockedCollectionWithConverter)
      ;(collection as jest.Mock).mockReturnValue({
        withConverter: withConverterMock,
      })
      const sut = new AccountFirebaseRepository()

      await sut.save({
        userUID: 'any_user_uid',
        name: 'any_name',
        email: 'any_email@mail.com',
      })

      expect(addDoc).toHaveBeenCalledWith(mockedCollectionWithConverter, {
        userUID: 'any_user_uid',
        name: 'any_name',
        email: 'any_email@mail.com',
        createdAt: 'any_timestamp',
        updatedAt: 'any_timestamp',
      })
    })
  })

  describe('auth()', () => {
    it('should authenticate on success', async () => {
      const sut = new AccountFirebaseRepository()

      await sut.auth({
        email: 'any_email@mail.com',
        password: 'any_password',
      })

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'any_email@mail.com',
        'any_password',
      )
    })
  })
})
