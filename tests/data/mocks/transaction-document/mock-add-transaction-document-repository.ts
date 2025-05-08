import {
  AddTransactionDocumentRepository,
  AddTransactionDocumentRepositoryParams,
} from '@/data/contracts/transaction-document'

export class AddTransactionDocumentRepositoryMock
  implements AddTransactionDocumentRepository
{
  async add(
    transactionDocument: AddTransactionDocumentRepositoryParams,
  ): Promise<void> {}
}
