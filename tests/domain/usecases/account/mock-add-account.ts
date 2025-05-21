import { AddAccount, AddAccountParams } from '@/domain/usecases/account'

export class AddAccountMock implements AddAccount {
  async execute(account: AddAccountParams): Promise<void> {}
}
