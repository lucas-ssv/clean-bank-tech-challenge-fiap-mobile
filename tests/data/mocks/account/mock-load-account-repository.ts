import {
  LoadAccountRepository,
  LoadAccountRepositoryParams,
} from '@/data/contracts/account'

export class LoadAccountRepositoryMock implements LoadAccountRepository {
  async auth(user: LoadAccountRepositoryParams): Promise<void> {}
}
