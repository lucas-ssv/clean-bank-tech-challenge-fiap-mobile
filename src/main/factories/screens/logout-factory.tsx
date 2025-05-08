import { LogoutImpl } from '@/data/usecases/account'
import { AccountFirebaseRepository } from '@/infra/repositories/firebase'
import { AvatarMenu } from '@/main/routes/app/(stack)/components'

export function MakeAvatarMenu() {
  const logoutAccountRepository = new AccountFirebaseRepository()
  const logout = new LogoutImpl(logoutAccountRepository)

  return <AvatarMenu logout={logout} />
}
