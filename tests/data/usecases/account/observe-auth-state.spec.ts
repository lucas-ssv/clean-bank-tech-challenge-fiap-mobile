import { ObserveAuthState } from '@/domain/usecases/account'

class ObserveAuthStateImpl implements ObserveAuthState {
  private authRepository

  constructor(authRepository: AuthRepositoryMock) {
    this.authRepository = authRepository
  }

  execute(): () => void {
    this.authRepository.onAuthStateChanged(() => {})
    return () => {}
  }
}

class AuthRepositoryMock {
  onAuthStateChanged(callback: any): void {}
}

describe('ObserveAuthState', () => {
  it('should call AuthRepository with correct values', async () => {
    const authRepositoryMock = new AuthRepositoryMock()
    const authSpy = jest.spyOn(authRepositoryMock, 'onAuthStateChanged')
    const sut = new ObserveAuthStateImpl(authRepositoryMock)

    sut.execute()

    expect(authSpy).toHaveBeenCalled()
  })
})
