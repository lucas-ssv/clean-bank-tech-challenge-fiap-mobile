export interface RemoveTransaction {
  execute: (transactionId: string) => Promise<void>
}
