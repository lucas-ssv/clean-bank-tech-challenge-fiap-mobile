import {
  LoadTransactionDocumentsRepository,
  LoadTransactionDocumentsRepositoryResult,
} from '@/data/contracts/transaction-document'

export class LoadTransactionDocumentsRepositoryMock
  implements LoadTransactionDocumentsRepository
{
  async loadByTransactionId(
    transactionId: string,
  ): Promise<LoadTransactionDocumentsRepositoryResult> {
    return Promise.resolve([
      {
        name: 'any_document_name',
        mimeType: 'any_mime_type',
        uri: 'any_uri',
      },
    ])
  }
}
