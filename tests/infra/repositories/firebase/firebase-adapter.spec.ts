import { FirebaseAdapter } from '@/infra/repositories/firebase'
import { auth } from '@/main/config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  initializeAuth: jest.fn(),
  getReactNativePersistence: jest.fn(),
  setPersistence: jest.fn(),
}))

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}))

describe('FirebaseAdapter', () => {
  it('should add an account on success', async () => {
    const sut = new FirebaseAdapter()

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
    const sut = new FirebaseAdapter()
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
