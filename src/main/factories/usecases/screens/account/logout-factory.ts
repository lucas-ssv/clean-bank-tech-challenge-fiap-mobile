import { LogoutImpl } from '@/data/usecases/account'
import { Logout } from '@/domain/usecases/account'
import { AccountFirebaseRepository } from '@/infra/repositories/firebase'

export const makeLogout = (): Logout => {
  const logoutAccountRepository = new AccountFirebaseRepository()
  return new LogoutImpl(logoutAccountRepository)
}
