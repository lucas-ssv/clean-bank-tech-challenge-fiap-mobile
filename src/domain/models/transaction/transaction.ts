export interface TransactionModel {
  date: Date
  transactionType: TransactionType
  value: number
  userUID: string
  createdAt: Date
  updatedAt: Date
}

export enum TransactionType {
  CAMBIO_DE_MOEDA = 'cambio',
  DOC_TED = 'doc/ted',
  EMPRESTIMO = 'emprestimo',
  DEPOSITO = 'deposito',
  DEBITO = 'debito',
  CREDITO = 'credito',
}
