import { Home } from '@/presentation/screens'
import {
  makeAddAccount,
  makeAuthentication,
} from '@/main/factories/usecases/screens/account'

export function MakeHome() {
  return (
    <Home addAccount={makeAddAccount()} authentication={makeAuthentication()} />
  )
}
