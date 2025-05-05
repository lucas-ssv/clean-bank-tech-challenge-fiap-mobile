import {
  createUserWithEmailAndPassword,
  NextOrObserver,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth'
import { addDoc, collection, Timestamp } from 'firebase/firestore'

import { auth, db } from '@/main/config/firebase'
import {
  AddAccountRepository,
  AddAccountRepositoryParams,
  AuthRepository,
  LoadAccountRepository,
  LoadAccountRepositoryParams,
  SaveUserRepository,
  SaveUserRepositoryParams,
} from '@/data/contracts/account'
import { userConverter } from './converters'

export class AccountFirebaseRepository
  implements
    LoadAccountRepository,
    AddAccountRepository,
    SaveUserRepository,
    AuthRepository<NextOrObserver<User>>
{
  async auth(user: LoadAccountRepositoryParams): Promise<void> {
    await signInWithEmailAndPassword(auth, user.email, user.password)
  }

  onAuthStateChanged(callback: NextOrObserver<User>): () => void {
    onAuthStateChanged(auth, callback)
    return () => {}
  }

  async add(account: AddAccountRepositoryParams): Promise<string> {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      account.email,
      account.password,
    )
    return user.uid
  }

  async save(user: SaveUserRepositoryParams): Promise<void> {
    await addDoc(collection(db, 'users').withConverter(userConverter), {
      userUID: user.userUID,
      name: user.name,
      email: user.email,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  }
}
