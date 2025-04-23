import { UploadTransactionDocumentService } from '@/data/contracts/services'

export class UploadTransactionDocumentServiceStub
  implements UploadTransactionDocumentService
{
  async upload(uri: string): Promise<string> {
    return 'any_url'
  }
}
