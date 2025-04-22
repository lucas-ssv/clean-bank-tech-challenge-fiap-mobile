import { SaveUserRepositoryParams } from '@/data/contracts/account'
import {
  DocumentData,
  FirestoreDataConverter,
  Timestamp,
} from 'firebase/firestore'

type User = SaveUserRepositoryParams & {
  createdAt: Timestamp
  updatedAt: Timestamp
}

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore: (user: User): DocumentData => {
    return {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  },
  fromFirestore: (snapshot, options): User => {
    const data = snapshot.data(options)
    return data as User
  },
}
