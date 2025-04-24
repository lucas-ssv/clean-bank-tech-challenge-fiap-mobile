export interface UploadTransactionDocumentService {
  upload: (uri: string) => Promise<UploadTransactionDocumentServiceResult>
}

export type UploadTransactionDocumentServiceResult = {
  fileName: string
  documentUrl: string
}
