import { AddAccountImpl } from '@/data/usecases'
import { AddAccount } from '@/domain/usecases'
import { AccountFirebaseRepository } from '@/infra/repositories/firebase'

export const makeAddAccount = (): AddAccount => {
  const addAccountRepository = new AccountFirebaseRepository()
  return new AddAccountImpl(addAccountRepository)
}
