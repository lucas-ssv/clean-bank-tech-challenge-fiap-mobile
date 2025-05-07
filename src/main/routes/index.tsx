import { useAuth } from '@/presentation/contexts'
import { AuthRoutes } from './auth'
import { AppRoutes } from './app'

export function Routes() {
  const { user } = useAuth()
  console.log('user', user)

  return user?.userUID ? <AppRoutes /> : <AuthRoutes />
}
