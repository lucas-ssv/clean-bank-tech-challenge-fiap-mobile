import { PropsWithChildren } from 'react'

import { AuthProvider } from '@/presentation/contexts'
import { makeObserveAndLoadAccountByEmail } from '@/main/factories/usecases/contexts'

export function MakeAuthProvider({ children }: PropsWithChildren) {
  return (
    <AuthProvider
      observeAndLoadAccountByEmail={makeObserveAndLoadAccountByEmail()}
    >
      {children}
    </AuthProvider>
  )
}
