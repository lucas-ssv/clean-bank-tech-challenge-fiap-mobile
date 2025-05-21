import { LogoutAccountRepository } from '@/data/contracts/account'
import { Logout } from '@/domain/usecases/account'

export class LogoutImpl implements Logout {
  private logoutAccountRepository

  constructor(logoutAccountRepository: LogoutAccountRepository) {
    this.logoutAccountRepository = logoutAccountRepository
  }

  async execute(): Promise<void> {
    await this.logoutAccountRepository.logout()
  }
}
