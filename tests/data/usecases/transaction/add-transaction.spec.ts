import { AddTransactionResult } from '@/domain/models/transaction'
import {
  AddTransaction,
  AddTransactionParams,
  TransactionType,
} from '@/domain/usecases/transaction/add-transaction'

jest.useFakeTimers()

class AddTransactionImpl implements AddTransaction {
  private addTransactionRepository

  constructor(addTransactionRepository: AddTransactionRepository) {
    this.addTransactionRepository = addTransactionRepository
  }

  async execute(
    transaction: AddTransactionParams,
  ): Promise<AddTransactionResult> {
    await this.addTransactionRepository.add(transaction)
    return Promise.resolve(null as any)
  }
}

type AddTransactionRepositoryParams = {
  transactionType: TransactionType
  date: Date
  value: number
  userUID: string
}

type AddTransactionRepositoryResult = {
  id: string
}

interface AddTransactionRepository {
  add: (
    transaction: AddTransactionRepositoryParams,
  ) => Promise<AddTransactionRepositoryResult>
}

class AddTransactionRepositoryStub implements AddTransactionRepository {
  async add(
    transaction: AddTransactionRepositoryParams,
  ): Promise<AddTransactionRepositoryResult> {
    return Promise.resolve(null as any)
  }
}

describe('AddTransaction usecase', () => {
  it('should call AddTransactionRepository with correct values', async () => {
    const addTransactionRepositoryStub = new AddTransactionRepositoryStub()
    const addSpy = jest.spyOn(addTransactionRepositoryStub, 'add')
    const sut = new AddTransactionImpl(addTransactionRepositoryStub)

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
