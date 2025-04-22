import {
  LoadAccountRepository,
  LoadAccountRepositoryParams,
} from '@/data/contracts'

export class LoadAccountRepositoryMock implements LoadAccountRepository {
  async auth(user: LoadAccountRepositoryParams): Promise<void> {}
}
