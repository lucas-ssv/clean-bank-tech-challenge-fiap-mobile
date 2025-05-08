import { addDoc, collection, Timestamp } from 'firebase/firestore'

import {
  AddTransactionRepository,
  AddTransactionRepositoryParams,
} from '@/data/contracts/transaction'
import { db } from '@/main/config/firebase'
import { transactionConverter } from './converters'

export class TransactionFirebaseRepository implements AddTransactionRepository {
  async add(transaction: AddTransactionRepositoryParams): Promise<string> {
    const transactionRef = await addDoc(
      collection(db, 'transactions').withConverter(transactionConverter),
      {
        transactionType: transaction.transactionType,
        date: transaction.date,
        value: transaction.value,
        userUID: transaction.userUID,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
    )
    return transactionRef.id
  }
}
