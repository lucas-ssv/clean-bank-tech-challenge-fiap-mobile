import {
  createUserWithEmailAndPassword,
  NextOrObserver,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User as FirebaseUser,
  signOut,
} from 'firebase/auth'
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'

import { auth, db } from '@/main/config/firebase'
import {
  AddAccountRepository,
  AddAccountRepositoryParams,
  AuthRepository,
  LoadAccountByEmailRepository,
  LoadAccountByEmailRepositoryResult,
  LoadAccountRepository,
  LoadAccountRepositoryParams,
  LogoutAccountRepository,
  SaveUserRepository,
  SaveUserRepositoryParams,
} from '@/data/contracts/account'
import { User, userConverter } from './converters'

export class AccountFirebaseRepository
  implements
    LoadAccountRepository,
    AuthRepository<NextOrObserver<FirebaseUser>>,
    LoadAccountByEmailRepository,
    AddAccountRepository,
    SaveUserRepository,
    LogoutAccountRepository
{
  async auth(user: LoadAccountRepositoryParams): Promise<void> {
    await signInWithEmailAndPassword(auth, user.email, user.password)
  }

  onAuthStateChanged(callback: NextOrObserver<FirebaseUser>): () => void {
    const unsubscribe = onAuthStateChanged(auth, callback)
    return unsubscribe
  }

  async loadByEmail(
    email: string,
  ): Promise<LoadAccountByEmailRepositoryResult | null> {
    const q = query(
      collection(db, 'users').withConverter(userConverter),
      where('email', '==', email),
    )
    const querySnapshot = await getDocs(q)
    let user: User | null = null
    querySnapshot.forEach((doc) => {
      user = doc.data()
    })
    return user
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

  async logout(): Promise<void> {
    await signOut(auth)
  }
}
