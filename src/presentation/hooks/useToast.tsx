import { ToastError, ToastSuccess } from '@/presentation/components'
import { useToast as useGluestackToast } from '@/presentation/components/ui'
import { useCallback } from 'react'

type ToastType = 'success' | 'error'

export function useToast() {
  const toast = useGluestackToast()

  return useCallback(
    (type: ToastType, message: string, code?: string) => {
      toast.show({
        placement: 'top',
        duration: 3000,
        render: (props) =>
          type === 'error'
            ? ToastError({
                ...props,
                error: { code: code || 'Erro', message },
              })
            : ToastSuccess({
                ...props,
                message,
              }),
      })
    },
    [toast],
  )
}
