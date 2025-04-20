import { AccountFirebaseRepository } from '@/infra/repositories/firebase'
import { auth } from '@/main/config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
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

    it('should throw if createUserWithEmailAndPassword throws', async () => {
      const sut = new AccountFirebaseRepository()
      ;(createUserWithEmailAndPassword as jest.Mock).mockImplementationOnce(
        () => {
          throw new Error()
        },
      )

      const promise = sut.add({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      })

      await expect(promise).rejects.toThrow()
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
        name: 'any_name',
        email: 'any_email@mail.com',
      })

      expect(addDoc).toHaveBeenCalledWith(mockedCollectionWithConverter, {
        name: 'any_name',
        email: 'any_email@mail.com',
        createdAt: 'any_timestamp',
        updatedAt: 'any_timestamp',
      })
    })

    it('should throw if addDoc throws', async () => {
      const sut = new AccountFirebaseRepository()
      ;(addDoc as jest.Mock).mockImplementationOnce(() => {
        throw new Error()
      })

      const promise = sut.save({
        name: 'any_name',
        email: 'any_email@mail.com',
      })

      expect(promise).rejects.toThrow()
    })
  })
})
