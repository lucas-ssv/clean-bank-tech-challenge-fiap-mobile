import {
  AddAccountRepository,
  AddAccountRepositoryParams,
} from '@/data/contracts'

export class AddAccountRepositoryMock implements AddAccountRepository {
  async add(account: AddAccountRepositoryParams): Promise<void> {}
}
