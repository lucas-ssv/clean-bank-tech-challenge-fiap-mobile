import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'
import { randomUUID } from 'expo-crypto'

import {
  AddTransactionRepository,
  AddTransactionRepositoryParams,
  LoadTransactionsByDateRepository,
  LoadTransactionsByDateRepositoryResult,
  LoadTransactionsFilterParams,
  LoadTransactionsRepository,
  LoadTransactionsRepositoryResult,
} from '@/data/contracts/transaction'
import { auth, db } from '@/main/config/firebase'
import { transactionConverter } from './converters'

export class TransactionFirebaseRepository
  implements
    AddTransactionRepository,
    LoadTransactionsRepository<Timestamp>,
    LoadTransactionsByDateRepository
{
  async add(transaction: AddTransactionRepositoryParams): Promise<string> {
    const transactionRef = await addDoc(
      collection(db, 'transactions').withConverter(transactionConverter),
      {
        id: randomUUID(),
        transactionType: transaction.transactionType,
        date: transaction.date,
        value: transaction.value,
        userUID: transaction.userUID,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    )
    return transactionRef.id
  }

  async loadAll(
    filters?: LoadTransactionsFilterParams,
  ): Promise<LoadTransactionsRepositoryResult<Timestamp>> {
    const conditions = [where('userUID', '==', auth.currentUser?.uid)]

    if (filters?.transactionType) {
      conditions.push(where('transactionType', '==', filters.transactionType))
    }

    if (filters?.date) {
      const startOfDay = new Date(filters.date)
      startOfDay.setUTCHours(0, 0, 0, 0)

      const endOfDay = new Date(filters.date)
      endOfDay.setUTCHours(23, 59, 59, 999)

      conditions.push(where('date', '>=', startOfDay))
      conditions.push(where('date', '<=', endOfDay))
    }

    if (filters?.minimumValue) {
      conditions.push(where('value', '>=', filters.minimumValue))
    }

    if (filters?.maximumValue) {
      conditions.push(where('value', '<=', filters.maximumValue))
    }

    const q = query(
      collection(db, 'transactions').withConverter(transactionConverter),
      ...conditions,
    )
    let transactionId: string = ''
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return {
        transactionId,
        transactions: [],
      }
    }

    transactionId = querySnapshot.docs[0].id
    const transactions: any[] = []
    querySnapshot.forEach((doc) => {
      const transaction = doc.data()
      transactions.push({
        id: transaction.id,
        date: transaction.date,
        transactionType: transaction.transactionType,
        value: transaction.value,
        userUID: transaction.userUID,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
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
        id: transaction.id,
        date: transaction.date,
        transactionType: transaction.transactionType,
        value: transaction.value,
        userUID: transaction.userUID,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
      })
    })
    return transactions
  }
}
