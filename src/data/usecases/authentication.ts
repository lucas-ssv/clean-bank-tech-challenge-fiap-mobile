import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { LoadAccountRepository } from '@/data/contracts'

export class AuthenticationImpl implements Authentication {
  private loadAccountRepository

  constructor(loadAccountRepository: LoadAccountRepository) {
    this.loadAccountRepository = loadAccountRepository
  }

  async execute(user: AuthenticationParams): Promise<void> {
    await this.loadAccountRepository.auth(user)
  }
}
