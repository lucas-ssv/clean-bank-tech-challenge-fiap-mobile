import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { addDoc, collection, Timestamp } from 'firebase/firestore'

import { auth, db } from '@/main/config/firebase'
import {
  AddAccountRepository,
  AddAccountRepositoryParams,
  LoadAccountRepository,
  LoadAccountRepositoryParams,
  SaveUserRepository,
  SaveUserRepositoryParams,
} from '@/data/contracts'
import { userConverter } from './converters'

export class AccountFirebaseRepository
  implements LoadAccountRepository, AddAccountRepository, SaveUserRepository
{
  async auth(user: LoadAccountRepositoryParams): Promise<void> {
    await signInWithEmailAndPassword(auth, user.email, user.password)
  }

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
