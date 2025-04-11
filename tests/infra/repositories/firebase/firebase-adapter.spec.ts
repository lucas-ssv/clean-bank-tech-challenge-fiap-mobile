import {
  AddAccountRepository,
  AddAccountRepositoryParams,
} from '@/data/contracts'
import { createUserWithEmailAndPassword, initializeAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  initializeAuth: jest.fn(),
}))

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}))

const app = initializeApp({
  appId: '1:434201147933:android:6edcd3adeb99a81c68e4f4',
  projectId: 'bank-tech-challenge-mobile',
  apiKey: 'AIzaSyCEn6q-emhI9yoMdMn4BWKgEWiSLwpGrS8',
})

const auth = initializeAuth(app)

class FirebaseAdapter implements AddAccountRepository {
  async add(account: AddAccountRepositoryParams): Promise<void> {
    await createUserWithEmailAndPassword(auth, account.email, account.password)
  }
}

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
