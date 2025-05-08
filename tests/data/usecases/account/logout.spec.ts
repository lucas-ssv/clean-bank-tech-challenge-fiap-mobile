import { Logout } from '@/domain/usecases/account'

class LogoutImpl implements Logout {
  private logoutAccountRepository

  constructor(logoutAccountRepository: LogoutAccountRepositoryMock) {
    this.logoutAccountRepository = logoutAccountRepository
  }

  async execute(): Promise<void> {
    await this.logoutAccountRepository.logout()
  }
}

class LogoutAccountRepositoryMock {
  async logout(): Promise<void> {}
}

describe('Logout usecase', () => {
  it('should call LogoutAccountRepository with correct values', async () => {
    const logoutAccountRepositoryMock = new LogoutAccountRepositoryMock()
    const logoutSpy = jest.spyOn(logoutAccountRepositoryMock, 'logout')
    const sut = new LogoutImpl(logoutAccountRepositoryMock)

    await sut.execute()

    expect(logoutSpy).toHaveBeenCalled()
  })
})
