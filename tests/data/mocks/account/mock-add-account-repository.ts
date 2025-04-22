import {
  AddAccountRepository,
  AddAccountRepositoryParams,
} from '@/data/contracts/account'

export class AddAccountRepositoryMock implements AddAccountRepository {
  async add(account: AddAccountRepositoryParams): Promise<void> {}
}
