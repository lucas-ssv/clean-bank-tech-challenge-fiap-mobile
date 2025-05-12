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
  LoadTransactionsRepository,
  LoadTransactionsRepositoryResult,
} from '@/data/contracts/transaction'
import { auth, db } from '@/main/config/firebase'
import { transactionConverter } from './converters'

export class TransactionFirebaseRepository
  implements
    AddTransactionRepository,
    LoadTransactionsRepository,
    LoadTransactionsByDateRepository
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

  async loadAll(): Promise<LoadTransactionsRepositoryResult> {
    const q = query(
      collection(db, 'transactions').withConverter(transactionConverter),
      where('userUID', '==', auth.currentUser?.uid),
    )
    const querySnapshot = await getDocs(q)
    const transactionId: string = querySnapshot.docs[0].id
    const transactions: any[] = []
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
    return {
      transactionId,
      transactions,
    }
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
