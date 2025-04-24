export interface AddTransactionDocumentRepository {
  add: (
    transactionDocument: AddTransactionDocumentRepositoryParams,
  ) => Promise<void>
}

export type AddTransactionDocumentRepositoryParams = {
  fileName: string
  transactionId: string
  mimeType: string
  url: string
}
