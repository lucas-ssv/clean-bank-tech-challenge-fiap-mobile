import { ObserveAndLoadAccountByEmailImpl } from '@/data/usecases/account'
import { ObserveAndLoadAccountByEmail } from '@/domain/usecases/account'
import { AccountFirebaseRepository } from '@/infra/repositories/firebase'

export const makeObserveAndLoadAccountByEmail =
  (): ObserveAndLoadAccountByEmail => {
    const accountFirebaseRepository = new AccountFirebaseRepository()
    return new ObserveAndLoadAccountByEmailImpl(
      accountFirebaseRepository,
      accountFirebaseRepository,
    )
  }
