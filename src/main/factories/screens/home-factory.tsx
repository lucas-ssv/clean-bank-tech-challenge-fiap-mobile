import { Home } from '@/presentation/screens'
import { makeAddAccount } from '@/main/factories/usecases'

export function MakeHome() {
  return <Home addAccount={makeAddAccount()} />
}
