import { auth } from '@/main/config/firebase'
import {
  AddAccountRepository,
  AddAccountRepositoryParams,
} from '@/data/contracts'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export class FirebaseAdapter implements AddAccountRepository {
  async add(account: AddAccountRepositoryParams): Promise<void> {
    await createUserWithEmailAndPassword(auth, account.email, account.password)
  }
}
