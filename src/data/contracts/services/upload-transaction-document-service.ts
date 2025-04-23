export interface UploadTransactionDocumentService {
  upload: (uri: string) => Promise<string>
}
