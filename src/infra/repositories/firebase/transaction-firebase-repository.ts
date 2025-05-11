import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'

import {
  AddTransactionRepository,
  AddTransactionRepositoryParams,
  LoadTransactionsByDateRepository,
  LoadTransactionsByDateRepositoryResult,
} from '@/data/contracts/transaction'
import { auth, db } from '@/main/config/firebase'
import { transactionConverter } from './converters'

export class TransactionFirebaseRepository
  implements AddTransactionRepository, LoadTransactionsByDateRepository
{
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

  async loadByDate(
    startDate: Date,
    endDate: Date,
  ): Promise<LoadTransactionsByDateRepositoryResult[]> {
    const q = query(
      collection(db, 'transactions').withConverter(transactionConverter),
      where('userUID', '==', auth.currentUser?.uid),
      where('date', '>=', startDate),
      where('date', '<=', endDate),
    )
    const querySnapshot = await getDocs(q)
    const transactions: LoadTransactionsByDateRepositoryResult[] = []
    querySnapshot.forEach((doc) => {
      const transaction = doc.data()
      transactions.push({
        date: transaction.date,
        transactionType: transaction.transactionType,
        value: transaction.value,
        userUID: transaction.userUID,
        createdAt: transaction.createdAt.toDate(),
        updatedAt: transaction.updatedAt.toDate(),
      })
    })
    return transactions
  }
}
