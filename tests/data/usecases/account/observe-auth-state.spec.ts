import {
  ObserveAuthState,
  ObserveAuthStateParams,
} from '@/domain/usecases/account'

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

  execute(callback: ObserveAuthStateParams): () => void {
    const unsubscribe = this.authRepository.onAuthStateChanged(async (user) => {
      const account = await this.loadAccountByEmailRepository.loadByEmail(
        user.email,
      )
      callback(account)
    })
    return unsubscribe
  }
}

interface AuthRepository {
  onAuthStateChanged: (
    callback: (user: { email: string }) => void,
  ) => () => void
}

class AuthRepositoryStub implements AuthRepository {
  onAuthStateChanged(callback: (user: { email: string }) => void): () => void {
    callback({ email: 'any_email@mail.com' })
    return () => {}
  }
}

type LoadAccountByEmailRepositoryResult = {
  name: string
  email: string
  userUID: string
}

interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<LoadAccountByEmailRepositoryResult>
}

class LoadAccountByEmailRepositoryMock implements LoadAccountByEmailRepository {
  async loadByEmail(
    email: string,
  ): Promise<LoadAccountByEmailRepositoryResult> {
    return Promise.resolve({
      name: 'any_name',
      email: 'any_email@mail.com',
      userUID: 'any_user_uid',
    })
  }
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
    const callback = () => {}

    sut.execute(callback)

    expect(authSpy).toHaveBeenCalled()
  })

  it('should call LoadAccountByEmailRepository with correct values', async () => {
    const { sut, loadAccountByEmailRepositoryMock } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryMock, 'loadByEmail')
    const callback = () => {}

    sut.execute(callback)

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  it('should call callback with the result from LoadAccountByEmailRepository', async () => {
    const { sut } = makeSut()

    const callbackResult = new Promise((resolve) => {
      sut.execute((account) => {
        resolve(account)
      })
    })

    await expect(callbackResult).resolves.toEqual({
      name: 'any_name',
      email: 'any_email@mail.com',
      userUID: 'any_user_uid',
    })
  })

  it('should return a void function on success', async () => {
    const { sut } = makeSut()

    const unsubscribe = sut.execute(() => {})

    expect(typeof unsubscribe).toBe('function')
  })
})
