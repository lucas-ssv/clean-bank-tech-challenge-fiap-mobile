import { AddTransactionDocumentRepositoryParams } from '@/data/contracts/transaction-document'
import {
  DocumentData,
  FirestoreDataConverter,
  Timestamp,
} from 'firebase/firestore'

type TransactionDocument = AddTransactionDocumentRepositoryParams & {
  createdAt: Timestamp
  updatedAt: Timestamp
}

export const transactionDocumentConverter: FirestoreDataConverter<TransactionDocument> =
  {
    toFirestore: (transactionDocument: TransactionDocument): DocumentData => {
      return {
        transactionId: transactionDocument.transactionId,
        fileName: transactionDocument.fileName,
        url: transactionDocument.url,
        mimeType: transactionDocument.mimeType,
        createdAt: transactionDocument.createdAt,
        updatedAt: transactionDocument.updatedAt,
      }
    },
    fromFirestore: (snapshot, options): TransactionDocument => {
      const data = snapshot.data(options)
      return data as TransactionDocument
    },
  }
