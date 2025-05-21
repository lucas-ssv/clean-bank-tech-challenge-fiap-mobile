import { UploadTransactionDocumentService } from '@/data/contracts/services'
import { AddTransactionRepository } from '@/data/contracts/transaction'
import { AddTransactionDocumentRepository } from '@/data/contracts/transaction-document'
import {
  AddTransaction,
  AddTransactionParams,
} from '@/domain/usecases/transaction'

export class AddTransactionImpl implements AddTransaction {
  private addTransactionRepository
  private uploadTransactionDocumentService
  private addTransactionDocumentRepository

  constructor(
    addTransactionRepository: AddTransactionRepository,
    uploadTransactionDocumentService: UploadTransactionDocumentService,
    addTransactionDocumentRepository: AddTransactionDocumentRepository,
  ) {
    this.addTransactionRepository = addTransactionRepository
    this.uploadTransactionDocumentService = uploadTransactionDocumentService
    this.addTransactionDocumentRepository = addTransactionDocumentRepository
  }

  async execute(transaction: AddTransactionParams): Promise<void> {
    const transactionId = await this.addTransactionRepository.add(transaction)

    for (const transactionDocument of transaction.transactionDocuments) {
      const { fileName, documentUrl } =
        await this.uploadTransactionDocumentService.upload(
          transactionDocument.url,
        )
      await this.addTransactionDocumentRepository.add({
        fileName,
        transactionId,
        mimeType: transactionDocument.mimeType,
        url: documentUrl,
      })
    }
  }
}
