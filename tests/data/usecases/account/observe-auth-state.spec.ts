import { ObserveAuthState } from '@/domain/usecases/account'

class ObserveAuthStateImpl implements ObserveAuthState {
  private authRepository
  private loadAccountByEmailRepository

  constructor(
    authRepository: AuthRepositoryMock,
    loadAccountByEmailRepository: LoadAccountByEmailRepositoryMock,
  ) {
    this.authRepository = authRepository
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  execute(): () => void {
    this.authRepository.onAuthStateChanged(async (user) => {
      await this.loadAccountByEmailRepository.loadByEmail(user.email)
    })
    return () => {}
  }
}

class AuthRepositoryMock {
  onAuthStateChanged(callback: any): void {
    callback({ email: 'any_email@mail.com' })
  }
}

class LoadAccountByEmailRepositoryMock {
  async loadByEmail(email: string): Promise<void> {}
}

describe('ObserveAuthState', () => {
  it('should call AuthRepository with correct values', async () => {
    const authRepositoryMock = new AuthRepositoryMock()
    const loadAccountByEmailRepositoryMock =
      new LoadAccountByEmailRepositoryMock()
    const authSpy = jest.spyOn(authRepositoryMock, 'onAuthStateChanged')
    const sut = new ObserveAuthStateImpl(
      authRepositoryMock,
      loadAccountByEmailRepositoryMock,
    )

    sut.execute()

    expect(authSpy).toHaveBeenCalled()
  })

  it('should call LoadAccountByEmailRepository with correct values', async () => {
    const authRepositoryMock = new AuthRepositoryMock()
    const loadAccountByEmailRepositoryMock =
      new LoadAccountByEmailRepositoryMock()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryMock, 'loadByEmail')
    const sut = new ObserveAuthStateImpl(
      authRepositoryMock,
      loadAccountByEmailRepositoryMock,
    )

    sut.execute()

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
