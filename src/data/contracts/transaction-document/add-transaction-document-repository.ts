export interface AddTransactionDocumentRepository {
  add: (
    transactionDocument: AddTransactionDocumentRepositoryParams,
  ) => Promise<void>
}

export type AddTransactionDocumentRepositoryParams = {
  transactionId: string
  mimeType: string
  url: string
}
