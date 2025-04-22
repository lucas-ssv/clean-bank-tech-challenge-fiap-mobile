import { Authentication, AuthenticationParams } from '@/domain/usecases/account'

export class AuthenticationMock implements Authentication {
  async execute(user: AuthenticationParams): Promise<void> {}
}
