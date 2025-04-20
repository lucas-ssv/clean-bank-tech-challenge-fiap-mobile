import { Authentication, AuthenticationParams } from '@/domain/usecases'

class AuthenticationImpl implements Authentication {
  private loadAccountRepository

  constructor(loadAccountRepository: LoadAccountRepository) {
    this.loadAccountRepository = loadAccountRepository
  }

  async execute(user: AuthenticationParams): Promise<void> {
    await this.loadAccountRepository.auth(user)
  }
}

interface LoadAccountRepository {
  auth: (user: LoadAccountRepositoryParams) => Promise<void>
}

type LoadAccountRepositoryParams = {
  email: string
  password: string
}

class LoadAccountRepositoryMock implements LoadAccountRepository {
  async auth(user: LoadAccountRepositoryParams): Promise<void> {}
}

describe('Authentication usecase', () => {
  it('should call LoadAccountRepository with correct values', async () => {
    const loadAccountRepositoryMock = new LoadAccountRepositoryMock()
    const authSpy = jest.spyOn(loadAccountRepositoryMock, 'auth')
    const sut = new AuthenticationImpl(loadAccountRepositoryMock)

    await sut.execute({
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password',
    })
  })

  it('should throw if LoadAccountRepository throws', async () => {
    const loadAccountRepositoryMock = new LoadAccountRepositoryMock()
    jest.spyOn(loadAccountRepositoryMock, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new AuthenticationImpl(loadAccountRepositoryMock)

    const promise = sut.execute({
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    expect(promise).rejects.toThrow()
  })
})
