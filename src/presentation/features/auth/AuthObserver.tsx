import { ObserveAndLoadAccountByEmail } from '@/domain/usecases/account'
import { useAppDispatch } from '@/presentation/app/hooks'
import { useEffect } from 'react'
import { setUser } from '@/presentation/features/auth/auth-slice'

type Props = {
  observeAndLoadAccountByEmail: ObserveAndLoadAccountByEmail
}

export function AuthObserver({ observeAndLoadAccountByEmail }: Props) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe = observeAndLoadAccountByEmail.execute((user) => {
      dispatch(
        setUser({
          email: user?.email!,
          userUID: user?.userUID!,
          name: user?.name!,
        }),
      )
    })
    return () => {
      unsubscribe()
    }
  }, [dispatch, observeAndLoadAccountByEmail])

  return null
}
