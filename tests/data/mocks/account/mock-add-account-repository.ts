import {
  AddAccountRepository,
  AddAccountRepositoryParams,
} from '@/data/contracts/account'

export class AddAccountRepositoryMock implements AddAccountRepository {
  async add(account: AddAccountRepositoryParams): Promise<string> {
    return 'any_user_uid'
  }
}
