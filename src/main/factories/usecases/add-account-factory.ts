import { AddAccountImpl } from '@/data/usecases'
import { AddAccount } from '@/domain/usecases'
import { AccountFirebaseRepository } from '@/infra/repositories/firebase'

export const makeAddAccount = (): AddAccount => {
  const accountFirebaseRepository = new AccountFirebaseRepository()
  return new AddAccountImpl(
    accountFirebaseRepository,
    accountFirebaseRepository,
  )
}
