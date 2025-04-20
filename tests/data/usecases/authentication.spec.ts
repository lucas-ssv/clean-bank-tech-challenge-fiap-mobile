import { Authentication, AuthenticationParams } from '@/domain/usecases'

class AuthenticationImpl implements Authentication {
  private loadAccountRepository

  constructor(loadAccountRepository: LoadAccountRepositoryMock) {
    this.loadAccountRepository = loadAccountRepository
  }

  async execute(user: AuthenticationParams): Promise<void> {
    await this.loadAccountRepository.auth(user)
  }
}

class LoadAccountRepositoryMock {
  async auth(user: any): Promise<void> {}
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
})
