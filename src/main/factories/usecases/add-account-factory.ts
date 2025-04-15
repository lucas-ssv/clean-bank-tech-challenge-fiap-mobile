import { AddAccountImpl } from '@/data/usecases'
import { AddAccount } from '@/domain/usecases'
import { FirebaseAdapter } from '@/infra/repositories/firebase'

export const makeAddAccount = (): AddAccount => {
  const addAccountRepository = new FirebaseAdapter()
  return new AddAccountImpl(addAccountRepository)
}
