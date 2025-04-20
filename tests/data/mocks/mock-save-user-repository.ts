import { SaveUserRepository, SaveUserRepositoryParams } from '@/data/contracts'

export class SaveUserRepositoryMock implements SaveUserRepository {
  async save(user: SaveUserRepositoryParams): Promise<void> {}
}
