import { AvatarMenu } from '@/main/routes/app/(stack)/components'
import { makeLogout } from '@/main/factories/usecases/screens/account'

export function MakeAvatarMenu() {
  return <AvatarMenu logout={makeLogout()} />
}
