import { ComponentProps, useEffect } from 'react'
import { Alert, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { Timestamp } from 'firebase/firestore'

import {
  RemoveTransaction,
  UpdateTransaction,
} from '@/domain/usecases/transaction'
import { TransactionModel } from '@/domain/models/transaction'
import { TransactionDocumentModel } from '@/domain/models/transaction-document'
import {
  Button,
  Card,
  HStack,
  Text,
  VStack,
} from '@/presentation/components/ui'
import { ModalUpdateTransaction } from './components'
import Trash from '@/presentation/assets/lixeira.svg'
import { formattedDateTime, formattedMoney } from '@/presentation/utils'
import { useToast } from '@/presentation/hooks'

type Props = ComponentProps<typeof Card> & {
  transaction: TransactionModel<Timestamp> & {
    documents?: TransactionDocumentModel[]
    type: string
  }
  updateTransaction: UpdateTransaction
  removeTransaction: RemoveTransaction
  index: number
}

export function CardTransaction({
  transaction,
  updateTransaction,
  removeTransaction,
  index,
  ...rest
}: Props) {
  const toast = useToast()

  const opacity = useSharedValue(0)
  const translateY = useSharedValue(20)
  const scale = useSharedValue(1)

  useEffect(() => {
    opacity.value = withDelay(index * 400, withTiming(1, { duration: 500 }))
    translateY.value = withDelay(index * 400, withTiming(0, { duration: 500 }))
  }, [index, opacity, translateY])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }))

  const handleRemoveTransaction = async (transactionId: string) => {
    Alert.alert(
      'Remover transação',
      'Deseja realmente remover esta transação?',
      [
        {
          style: 'cancel',
          text: 'Cancelar',
        },
        {
          style: 'destructive',
          text: 'Remover',
          onPress: async () => {
            opacity.value = withTiming(0, { duration: 300 })
            scale.value = withTiming(0.8, { duration: 300 })
            setTimeout(async () => {
              try {
                await removeTransaction.execute(transactionId)
                toast('success', 'Transação removida com sucesso!')
              } catch (error) {
                toast(
                  'error',
                  'Ocorreu um erro ao remover a transação.',
                  error.code,
                )
              }
            }, 300)
          },
        },
      ],
    )
  }

  return (
    <Animated.View style={[animatedStyle]}>
      <Card variant="elevated" {...rest}>
        <HStack className="justify-between items-end gap-4">
          <VStack className="gap-2">
            <View>
              <Text size="sm" className="text-black">
                Tipo
              </Text>
              <Text
                testID="transaction-type"
                className="text-md text-black font-semibold mt-1"
              >
                {transaction.transactionType}
              </Text>
            </View>
            <View>
              <Text size="sm" className="text-black">
                Valor
              </Text>
              <Text
                testID="transaction-value"
                className={`text-md ${transaction.type === 'income' ? 'text-custom-my-green' : 'text-custom-my-dark-red'} font-semibold mt-1`}
              >
                {transaction.type === 'outcome' ? '-' : '+'}{' '}
                {formattedMoney.format(transaction.value)}
              </Text>
            </View>
            <View>
              <Text size="sm" className="text-black">
                Data da transação
              </Text>
              <Text
                testID="transaction-date"
                className="text-md text-black font-semibold mt-1"
              >
                {formattedDateTime.format(transaction.date.toDate())}
              </Text>
            </View>
          </VStack>

          <HStack className="justify-end gap-2">
            <ModalUpdateTransaction
              transaction={transaction}
              updateTransaction={updateTransaction}
            />
            <Button
              testID="delete-button"
              className="h-12 w-12 bg-custom-my-dark-green rounded-full p-0"
              onPress={() => handleRemoveTransaction(transaction.id)}
            >
              <Trash />
            </Button>
          </HStack>
        </HStack>
      </Card>
    </Animated.View>
  )
}
