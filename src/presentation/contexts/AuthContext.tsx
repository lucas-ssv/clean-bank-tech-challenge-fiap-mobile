import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

import { ObserveAndLoadAccountByEmail } from '@/domain/usecases/account'
import { UserModel } from '@/domain/models/account'

type AuthProviderProps = PropsWithChildren<{
  observeAndLoadAccountByEmail: ObserveAndLoadAccountByEmail
}>

type AuthContextProps = {
  user: UserModel | null
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthProvider({
  children,
  observeAndLoadAccountByEmail,
}: AuthProviderProps) {
  const [user, setUser] = useState<UserModel | null>(null)

  useEffect(() => {
    const unsubscribe = observeAndLoadAccountByEmail.execute(setUser)
    return () => unsubscribe()
  }, [observeAndLoadAccountByEmail])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
