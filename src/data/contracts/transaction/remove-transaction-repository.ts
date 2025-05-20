export interface RemoveTransactionRepository {
  remove: (transactionId: string) => Promise<void>
}
