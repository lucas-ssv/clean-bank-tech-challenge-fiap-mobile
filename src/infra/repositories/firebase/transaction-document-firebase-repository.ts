import { addDoc, collection, Timestamp } from 'firebase/firestore'

import { db } from '@/main/config/firebase'
import {
  AddTransactionDocumentRepository,
  AddTransactionDocumentRepositoryParams,
} from '@/data/contracts/transaction-document'
import { transactionDocumentConverter } from './converters'

export class TransactionDocumentRepository
  implements AddTransactionDocumentRepository
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
}
