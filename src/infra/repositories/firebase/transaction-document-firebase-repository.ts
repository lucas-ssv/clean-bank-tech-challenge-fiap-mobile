import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'

import { db } from '@/main/config/firebase'
import {
  AddTransactionDocumentRepository,
  AddTransactionDocumentRepositoryParams,
  LoadTransactionDocumentsRepository,
  LoadTransactionDocumentsRepositoryResult,
} from '@/data/contracts/transaction-document'
import { transactionDocumentConverter } from './converters'

export class TransactionDocumentFirebaseRepository
  implements
    AddTransactionDocumentRepository,
    LoadTransactionDocumentsRepository
{
  async add(
    transactionDocument: AddTransactionDocumentRepositoryParams,
  ): Promise<void> {
    await addDoc(
      collection(db, 'transaction-documents').withConverter(
        transactionDocumentConverter,
      ),
      {
        fileName: transactionDocument.fileName,
        transactionId: transactionDocument.transactionId,
        mimeType: transactionDocument.mimeType,
        url: transactionDocument.url,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
    )
  }

  async loadByTransactionId(
    transactionId: string,
  ): Promise<LoadTransactionDocumentsRepositoryResult> {
    const q = query(
      collection(db, 'transaction-documents').withConverter(
        transactionDocumentConverter,
      ),
      where('transactionId', '==', transactionId),
    )
    const querySnapshot = await getDocs(q)
    const documents: LoadTransactionDocumentsRepositoryResult = []
    querySnapshot.forEach((doc) => {
      const document = doc.data()
      documents.push({
        mimeType: document.mimeType,
        fileName: document.fileName,
        url: document.url,
      })
    })
    return documents
  }
}
