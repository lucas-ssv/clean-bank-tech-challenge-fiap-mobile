import { useAuth } from '@/presentation/hooks'
import { AuthRoutes } from './auth'
import { AppRoutes } from './app'

export function Routes() {
  const { user } = useAuth()

  return user?.userUID ? <AppRoutes /> : <AuthRoutes />
}
