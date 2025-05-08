import { AuthRepository } from '@/data/contracts/account'

export class AuthRepositoryStub implements AuthRepository {
  onAuthStateChanged(callback: (user: { email: string }) => void): () => void {
    callback({ email: 'any_email@mail.com' })
    return () => {}
  }
}
