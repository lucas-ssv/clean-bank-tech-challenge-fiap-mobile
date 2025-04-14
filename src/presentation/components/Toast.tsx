import { ToastComponentProps } from '@gluestack-ui/toast/lib/types'
import { HStack, Toast, ToastDescription, ToastTitle } from './ui'
import Feather from '@expo/vector-icons/Feather'

type ToastErrorProps = ToastComponentProps & {
  error: {
    code: string
    message: string
  }
}

export function ToastError({ id, error }: ToastErrorProps) {
  const uniqueToastId = 'toast-' + id

  return (
    <Toast nativeID={uniqueToastId} action="error" variant="solid">
      <HStack className="items-center gap-2">
        <Feather name="x-circle" color="#FFFFFF" size={20} />
        <ToastTitle>{error.code}</ToastTitle>
      </HStack>
      <ToastDescription>{error.message}</ToastDescription>
    </Toast>
  )
}

type ToastSuccessProps = ToastComponentProps & {
  message: string
}

export function ToastSuccess({ id, message }: ToastSuccessProps) {
  const uniqueToastId = 'toast-' + id

  return (
    <Toast nativeID={uniqueToastId} action="success" variant="solid">
      <HStack className="items-center gap-2">
        <Feather name="check-circle" color="#FFFFFF" size={20} />
        <ToastTitle>Sucesso!</ToastTitle>
      </HStack>
      <ToastDescription>{message}</ToastDescription>
    </Toast>
  )
}
