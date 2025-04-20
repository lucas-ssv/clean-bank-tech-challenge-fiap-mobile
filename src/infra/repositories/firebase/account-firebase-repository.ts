import { auth } from '@/main/config/firebase'
import {
  AddAccountRepository,
  AddAccountRepositoryParams,
} from '@/data/contracts'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export class AccountFirebaseRepository implements AddAccountRepository {
  async add(account: AddAccountRepositoryParams): Promise<void> {
    await createUserWithEmailAndPassword(auth, account.email, account.password)
  }
}
