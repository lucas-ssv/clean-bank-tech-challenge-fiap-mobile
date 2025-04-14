import { AddAccountImpl } from '@/data/usecases'
import { FirebaseAdapter } from '@/infra/repositories/firebase'
import { Home } from '@/presentation/screens'

const addAccountRepository = new FirebaseAdapter()
const addAccount = new AddAccountImpl(addAccountRepository)

export function MakeHome() {
  return <Home addAccount={addAccount} />
}
