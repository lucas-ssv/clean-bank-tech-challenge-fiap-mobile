import { useAppSelector } from '@/presentation/app'

export const useAuth = () => {
  const { user } = useAppSelector((state) => state.auth)
  return { user }
}
