import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore'

import {
  AddTransactionRepository,
  AddTransactionRepositoryParams,
  LoadTransactionsByDateRepository,
  LoadTransactionsByDateRepositoryResult,
  LoadTransactionsFilterParams,
  LoadTransactionsRepository,
  RemoveTransactionRepository,
  UpdateTransactionRepository,
  UpdateTransactionRepositoryData,
} from '@/data/contracts/transaction'
import { auth, db } from '@/main/config/firebase'
import { transactionConverter } from './converters'
import { TransactionModel } from '@/domain/models/transaction'

export class TransactionFirebaseRepository
  implements
    AddTransactionRepository,
    LoadTransactionsRepository<Timestamp>,
    LoadTransactionsByDateRepository,
    UpdateTransactionRepository,
    RemoveTransactionRepository
{
  async add(transaction: AddTransactionRepositoryParams): Promise<string> {
    const result = await addDoc(
      collection(db, 'transactions').withConverter(transactionConverter),
      {
        transactionType: transaction.transactionType,
        date: transaction.date,
        value: transaction.value,
        userUID: transaction.userUID,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    )
    return result.id
  }

  async loadAll(
    filters?: LoadTransactionsFilterParams,
  ): Promise<TransactionModel<Timestamp>[]> {
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
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return []
    }

    const transactions: any[] = []
    querySnapshot.forEach((doc) => {
      const transactionId = doc.id
      const transaction = doc.data()
      transactions.push({
        id: transactionId,
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
      const transactionId = doc.id
      const transaction = doc.data()
      transactions.push({
        id: transactionId,
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

  async update(
    transactionId: string,
    transactionData: UpdateTransactionRepositoryData,
  ): Promise<void> {
    await updateDoc(
      doc(db, 'transactions', transactionId).withConverter(
        transactionConverter,
      ),
      transactionData,
    )
  }

  async remove(transactionId: string): Promise<void> {
    await deleteDoc(
      doc(db, 'transactions', transactionId).withConverter(
        transactionConverter,
      ),
    )
  }
}
