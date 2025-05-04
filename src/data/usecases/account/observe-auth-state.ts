import {
  AuthRepository,
  LoadAccountByEmailRepository,
} from '@/data/contracts/account'
import {
  ObserveAuthState,
  ObserveAuthStateParams,
} from '@/domain/usecases/account'

export class ObserveAuthStateImpl implements ObserveAuthState {
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
