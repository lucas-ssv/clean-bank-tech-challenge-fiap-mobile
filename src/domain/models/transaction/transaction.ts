export interface TransactionModel<T = Date> {
  date: T
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
