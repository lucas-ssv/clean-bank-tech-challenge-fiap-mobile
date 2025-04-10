import { AddAccount, AddAccountParams } from '@/domain/usecases'
import { AddAccountRepository } from '@/data/contracts'

export class AddAccountImpl implements AddAccount {
  private addAccountRepository

  constructor(addAccountRepository: AddAccountRepository) {
    this.addAccountRepository = addAccountRepository
  }

  async execute(account: AddAccountParams): Promise<void> {
    await this.addAccountRepository.add(account)
  }
}
