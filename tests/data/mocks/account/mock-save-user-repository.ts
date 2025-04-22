import {
  SaveUserRepository,
  SaveUserRepositoryParams,
} from '@/data/contracts/account'

export class SaveUserRepositoryMock implements SaveUserRepository {
  async save(user: SaveUserRepositoryParams): Promise<void> {}
}
