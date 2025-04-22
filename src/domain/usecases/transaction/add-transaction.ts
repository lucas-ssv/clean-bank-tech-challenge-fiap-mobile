import { AddTransactionModel } from '@/domain/models/transaction'
import { TransactionDocumentModel } from '@/domain/models/transaction-document'

export interface AddTransaction {
  execute: (transaction: AddTransactionParams) => Promise<AddTransactionModel>
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
  transactionDocuments: TransactionDocumentModel[]
  date: Date
  value: number
  userUID: string
}
