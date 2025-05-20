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

class RemoveTransactionRepositoryMock {
  async remove(transactionId: string): Promise<void> {}
}

describe('RemoveTransaction usecase', () => {
  it('should call RemoveTransactionRepository with correct values', async () => {
    const removeTransactionRepositoryMock =
      new RemoveTransactionRepositoryMock()
    const removeSpy = jest.spyOn(removeTransactionRepositoryMock, 'remove')
    const sut = new RemoveTransactionImpl(removeTransactionRepositoryMock)

    await sut.execute('any_transaction_id')

    expect(removeSpy).toHaveBeenCalledWith('any_transaction_id')
  })
})
