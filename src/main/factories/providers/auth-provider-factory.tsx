import { makeObserveAndLoadAccountByEmail } from '@/main/factories/usecases/providers'
import { AuthObserver } from '@/presentation/features/auth'

export function MakeAuthProvider() {
  return (
    <AuthObserver
      observeAndLoadAccountByEmail={makeObserveAndLoadAccountByEmail()}
    />
  )
}
