import {
  UploadTransactionDocumentService,
  UploadTransactionDocumentServiceResult,
} from '@/data/contracts/services'

export class UploadTransactionDocumentServiceStub
  implements UploadTransactionDocumentService
{
  async upload(uri: string): Promise<UploadTransactionDocumentServiceResult> {
    return {
      fileName: 'any_filename',
      documentUrl: 'any_url',
    }
  }
}
