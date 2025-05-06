import { AddAccountImpl } from '@/data/usecases/account'
import { AddAccount } from '@/domain/usecases/account'
import { AccountFirebaseRepository } from '@/infra/repositories/firebase'

export const makeAddAccount = (): AddAccount => {
  const accountFirebaseRepository = new AccountFirebaseRepository()
  return new AddAccountImpl(
    accountFirebaseRepository,
    accountFirebaseRepository,
  )
}
