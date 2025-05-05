import {
  AuthRepository,
  LoadAccountByEmailRepository,
} from '@/data/contracts/account'
import {
  ObserveAndLoadAccountByEmail,
  ObserveAndLoadAccountByEmailParams,
} from '@/domain/usecases/account'

export class ObserveAndLoadAccountByEmailImpl
  implements ObserveAndLoadAccountByEmail
{
  private authRepository
  private loadAccountByEmailRepository

  constructor(
    authRepository: AuthRepository,
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
  ) {
    this.authRepository = authRepository
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  execute(callback: ObserveAndLoadAccountByEmailParams): () => void {
    const unsubscribe = this.authRepository.onAuthStateChanged(async (user) => {
      const account = await this.loadAccountByEmailRepository.loadByEmail(
        user.email,
      )
      callback(account)
    })
    return unsubscribe
  }
}
