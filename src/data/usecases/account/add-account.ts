import { AddAccount, AddAccountParams } from '@/domain/usecases/account'
import {
  AddAccountRepository,
  SaveUserRepository,
} from '@/data/contracts/account'

export class AddAccountImpl implements AddAccount {
  private addAccountRepository
  private saveUserRepository

  constructor(
    addAccountRepository: AddAccountRepository,
    saveUserRepository: SaveUserRepository,
  ) {
    this.addAccountRepository = addAccountRepository
    this.saveUserRepository = saveUserRepository
  }

  async execute(account: AddAccountParams): Promise<void> {
    const userUID = await this.addAccountRepository.add(account)
    await this.saveUserRepository.save({
      userUID,
      name: account.name,
      email: account.email,
    })
  }
}
