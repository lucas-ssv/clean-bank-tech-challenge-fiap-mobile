import { AuthenticationImpl } from '@/data/usecases'
import { Authentication } from '@/domain/usecases'
import { AccountFirebaseRepository } from '@/infra/repositories/firebase'

export const makeAuthentication = (): Authentication => {
  const loadAccountRepository = new AccountFirebaseRepository()
  return new AuthenticationImpl(loadAccountRepository)
}
