import { AddTransactionResult } from '@/domain/models/transaction'
import {
  AddTransaction,
  AddTransactionParams,
  TransactionType,
} from '@/domain/usecases/transaction/add-transaction'

jest.useFakeTimers()

class AddTransactionImpl implements AddTransaction {
  private addTransactionRepository

  constructor(addTransactionRepository: AddTransactionRepositoryMock) {
    this.addTransactionRepository = addTransactionRepository
  }

  async execute(
    transaction: AddTransactionParams,
  ): Promise<AddTransactionResult> {
    await this.addTransactionRepository.add(transaction)
    return Promise.resolve(null as any)
  }
}

class AddTransactionRepositoryMock {
  async add(transaction: any): Promise<void> {}
}

describe('AddTransaction usecase', () => {
  it('should call AddTransactionRepository with correct values', async () => {
    const addTransactionRepositoryMock = new AddTransactionRepositoryMock()
    const addSpy = jest.spyOn(addTransactionRepositoryMock, 'add')
    const sut = new AddTransactionImpl(addTransactionRepositoryMock)

    await sut.execute({
      transactionType: TransactionType.CAMBIO_DE_MOEDA,
      date: new Date(),
      value: 100,
      userUID: 'any_user_uid',
    })

    expect(addSpy).toHaveBeenCalledWith({
      transactionType: TransactionType.CAMBIO_DE_MOEDA,
      date: new Date(),
      value: 100,
      userUID: 'any_user_uid',
    })
  })
})
