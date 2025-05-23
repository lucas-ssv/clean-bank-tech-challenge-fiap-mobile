import { AccountFirebaseRepository } from '@/infra/repositories/firebase'
import { auth } from '@/main/config/firebase'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
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
  onAuthStateChanged: jest.fn().mockReturnValue(() => {}),
  signOut: jest.fn(),
}))

jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn().mockResolvedValue({
    forEach: (callback: (doc: any) => void) => {
      callback({
        data: () => ({
          name: 'any_name',
          email: 'any_email@mail.com',
          userUID: 'any_user_uid',
          createdAt: 'any_timestamp',
          updatedAt: 'any_timestamp',
        }),
      })
    },
  }),
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

  describe('onAuthStateChange', () => {
    it('should call onAuthStateChange', () => {
      const sut = new AccountFirebaseRepository()

      sut.onAuthStateChanged(() => {})

      expect(onAuthStateChanged).toHaveBeenCalled()
    })

    it('should return an unsubscribe on success', () => {
      const sut = new AccountFirebaseRepository()

      const unsubscribe = sut.onAuthStateChanged(() => {})

      expect(typeof unsubscribe).toBe('function')
    })
  })

  describe('loadByEmail', () => {
    it('should load an account by email on success', async () => {
      const sut = new AccountFirebaseRepository()

      const account = await sut.loadByEmail('any_email@mail.com')

      expect(account).toEqual({
        name: 'any_name',
        email: 'any_email@mail.com',
        userUID: 'any_user_uid',
        createdAt: 'any_timestamp',
        updatedAt: 'any_timestamp',
      })
    })
  })

  describe('logout', () => {
    it('should call signOut on success', async () => {
      const sut = new AccountFirebaseRepository()

      await sut.logout()

      expect(signOut).toHaveBeenCalledWith(auth)
    })
  })
})
