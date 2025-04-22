import { AddTransactionResult } from '@/domain/models/transaction'

export interface AddTransaction {
  execute: (transaction: AddTransactionParams) => Promise<AddTransactionResult>
}

export enum TransactionType {
  CAMBIO_DE_MOEDA = 'cambio',
  DOC_TED = 'doc/ted',
  EMPRESTIMO = 'emprestimo',
  DEPOSITO = 'deposito',
  DEBITO = 'debito',
  CREDITO = 'credito',
}

export type AddTransactionParams = {
  transactionType: TransactionType
  date: Date
  value: number
  userUID: string
}
