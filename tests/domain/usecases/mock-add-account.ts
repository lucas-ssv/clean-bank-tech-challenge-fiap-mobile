import { AddAccount, AddAccountParams } from '@/domain/usecases'

export class AddAccountMock implements AddAccount {
  async execute(account: AddAccountParams): Promise<void> {}
}
