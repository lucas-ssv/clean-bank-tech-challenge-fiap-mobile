import { AddTransactionRepositoryParams } from '@/data/contracts/transaction'
import {
  DocumentData,
  FirestoreDataConverter,
  Timestamp,
} from 'firebase/firestore'

type Transaction = AddTransactionRepositoryParams & {
  createdAt: Timestamp
  updatedAt: Timestamp
}

export const transactionConverter: FirestoreDataConverter<Transaction> = {
  toFirestore: (transaction: Transaction): DocumentData => {
    return {
      userUid: transaction.userUID,
      transactionType: transaction.transactionType,
      date: transaction.date,
      value: transaction.value,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    }
  },
  fromFirestore: (snapshot, options): Transaction => {
    const data = snapshot.data(options)
    return data as Transaction
  },
}
