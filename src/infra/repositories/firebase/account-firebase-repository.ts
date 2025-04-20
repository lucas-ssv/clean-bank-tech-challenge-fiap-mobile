import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, getFirestore, Timestamp } from 'firebase/firestore'

import { auth } from '@/main/config/firebase'
import {
  AddAccountRepository,
  AddAccountRepositoryParams,
  SaveUserRepository,
  SaveUserRepositoryParams,
} from '@/data/contracts'
import { userConverter } from './converters'

export const db = getFirestore()

export class AccountFirebaseRepository
  implements AddAccountRepository, SaveUserRepository
{
  async add(account: AddAccountRepositoryParams): Promise<void> {
    await createUserWithEmailAndPassword(auth, account.email, account.password)
  }

  async save(user: SaveUserRepositoryParams): Promise<void> {
    await addDoc(collection(db, 'users').withConverter(userConverter), {
      name: user.name,
      email: user.email,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  }
}
