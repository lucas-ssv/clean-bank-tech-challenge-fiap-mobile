import { AuthenticationImpl } from '@/data/usecases/account'
import { Authentication } from '@/domain/usecases/account'
import { AccountFirebaseRepository } from '@/infra/repositories/firebase'

export const makeAuthentication = (): Authentication => {
  const loadAccountRepository = new AccountFirebaseRepository()
  return new AuthenticationImpl(loadAccountRepository)
}
