import { RemoveTransaction } from '@/domain/usecases/transaction'

class RemoveTransactionImpl implements RemoveTransaction {
  private removeTransactionRepository

  constructor(removeTransactionRepository: RemoveTransactionRepositoryMock) {
    this.removeTransactionRepository = removeTransactionRepository
  }

  async execute(transactionId: string): Promise<void> {
    await this.removeTransactionRepository.remove(transactionId)
  }
}

interface RemoveTransactionRepository {
  remove: (transactionId: string) => Promise<void>
}

class RemoveTransactionRepositoryMock implements RemoveTransactionRepository {
  async remove(transactionId: string): Promise<void> {}
}

type SutTypes = {
  sut: RemoveTransactionImpl
  removeTransactionRepositoryMock: RemoveTransactionRepositoryMock
}

const makeSut = (): SutTypes => {
  const removeTransactionRepositoryMock = new RemoveTransactionRepositoryMock()
  const sut = new RemoveTransactionImpl(removeTransactionRepositoryMock)
  return {
    sut,
    removeTransactionRepositoryMock,
  }
}

describe('RemoveTransaction usecase', () => {
  it('should call RemoveTransactionRepository with correct values', async () => {
    const { sut, removeTransactionRepositoryMock } = makeSut()
    const removeSpy = jest.spyOn(removeTransactionRepositoryMock, 'remove')

    await sut.execute('any_transaction_id')

    expect(removeSpy).toHaveBeenCalledWith('any_transaction_id')
  })

  it('should throw if RemoveTransactionRepository throws', async () => {
    const { sut, removeTransactionRepositoryMock } = makeSut()
    jest
      .spyOn(removeTransactionRepositoryMock, 'remove')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute('any_transaction_id')

    await expect(promise).rejects.toThrow()
  })
})
