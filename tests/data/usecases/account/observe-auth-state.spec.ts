import { ObserveAuthState } from '@/domain/usecases/account'

class ObserveAuthStateImpl implements ObserveAuthState {
  private authRepository
  private loadAccountByEmailRepository

  constructor(
    authRepository: AuthRepository,
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
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

interface AuthRepository {
  onAuthStateChanged: (callback: (user: { email: string }) => void) => void
}

class AuthRepositoryStub implements AuthRepository {
  onAuthStateChanged(callback: (user: { email: string }) => void): void {
    callback({ email: 'any_email@mail.com' })
  }
}

interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<void>
}

class LoadAccountByEmailRepositoryMock implements LoadAccountByEmailRepository {
  async loadByEmail(email: string): Promise<void> {}
}

type SutTypes = {
  sut: ObserveAuthStateImpl
  authRepositoryStub: AuthRepositoryStub
  loadAccountByEmailRepositoryMock: LoadAccountByEmailRepositoryMock
}

const makeSut = (): SutTypes => {
  const authRepositoryStub = new AuthRepositoryStub()
  const loadAccountByEmailRepositoryMock =
    new LoadAccountByEmailRepositoryMock()
  const sut = new ObserveAuthStateImpl(
    authRepositoryStub,
    loadAccountByEmailRepositoryMock,
  )

  return {
    sut,
    authRepositoryStub,
    loadAccountByEmailRepositoryMock,
  }
}

describe('ObserveAuthState', () => {
  it('should call AuthRepository with correct values', async () => {
    const { sut, authRepositoryStub } = makeSut()
    const authSpy = jest.spyOn(authRepositoryStub, 'onAuthStateChanged')

    sut.execute()

    expect(authSpy).toHaveBeenCalled()
  })

  it('should call LoadAccountByEmailRepository with correct values', async () => {
    const { sut, loadAccountByEmailRepositoryMock } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryMock, 'loadByEmail')

    sut.execute()

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
