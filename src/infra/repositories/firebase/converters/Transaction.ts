import { AddTransactionRepositoryParams } from '@/data/contracts/transaction'
import { DocumentData, FirestoreDataConverter } from 'firebase/firestore'

type Transaction = AddTransactionRepositoryParams & {
  id: string
  createdAt: Date
  updatedAt: Date
}

export const transactionConverter: FirestoreDataConverter<Transaction> = {
  toFirestore: (transaction: Transaction): DocumentData => {
    return {
      id: transaction.id,
      userUID: transaction.userUID,
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
