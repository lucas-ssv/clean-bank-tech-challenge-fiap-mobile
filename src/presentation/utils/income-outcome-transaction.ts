import { TransactionType } from '@/domain/models/transaction'

export const getIncomeOutcomeTransaction = (
  transactionType: TransactionType,
): 'income' | 'outcome' => {
  switch (transactionType) {
    case TransactionType.CAMBIO_DE_MOEDA:
      return 'income'
    case TransactionType.CREDITO:
      return 'outcome'
    case TransactionType.DEBITO:
      return 'outcome'
    case TransactionType.DEPOSITO:
      return 'income'
    case TransactionType.DOC_TED:
      return 'outcome'
    case TransactionType.EMPRESTIMO:
      return 'income'
  }
}
