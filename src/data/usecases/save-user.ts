import { SaveUser, SaveUserParams } from '@/domain/usecases'
import { SaveUserRepository } from '@/data/contracts'

export class SaveUserImpl implements SaveUser {
  private saveUserRepository

  constructor(saveUserRepository: SaveUserRepository) {
    this.saveUserRepository = saveUserRepository
  }

  async execute(user: SaveUserParams): Promise<void> {
    await this.saveUserRepository.save(user)
  }
}
