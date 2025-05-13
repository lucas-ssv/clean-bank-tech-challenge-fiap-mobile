import { FlatList } from 'react-native'
import { ComponentProps, useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { useToast } from '@/presentation/hooks'
import {
  LoadTransactions,
  LoadTransactionsResult,
} from '@/domain/usecases/transaction'
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Heading,
  HStack,
  Text,
  VStack,
} from './ui'
import Pencil from '@/presentation/assets/lapis.svg'
import Trash from '@/presentation/assets/lixeira.svg'
import {
  formatMonth,
  formattedDate,
  formattedMoney,
  getIncomeOutcomeTransaction,
} from '@/presentation/utils'
import { Timestamp } from 'firebase/firestore'

type TransactionProps = LoadTransactionsResult<Timestamp> & {
  type: 'income' | 'outcome'
}

type Props = ComponentProps<typeof Box> & {
  loadTransactions: LoadTransactions
}

export function Extract({ loadTransactions, className, ...rest }: Props) {
  const toast = useToast()
  const [transactions, setTransactions] = useState<TransactionProps[]>([])
  const navigation = useNavigation()

  const fetchTransactions = useCallback(async () => {
    try {
      const transactions = await loadTransactions.execute()
      const formattedTransactions = transactions.map((transaction) => {
        const type = getIncomeOutcomeTransaction(transaction.transactionType)
        return {
          ...transaction,
          date: transaction.date as unknown as Timestamp,
          type,
        }
      })
      setTransactions(formattedTransactions)
    } catch (error) {
      toast('error', 'Erro ao buscar transações', error.code)
    }
  }, [loadTransactions, toast])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <Box
      className={`bg-white rounded-lg py-8 px-6 mt-6 ${className}`}
      {...rest}
    >
      <HStack className="items-center justify-between gap-12">
        <Heading className="text-xl font-heading">Extrato</Heading>
        <ButtonGroup className="flex-row gap-2">
          <Button
            className="h-12 w-12 bg-custom-my-dark-green rounded-full"
            onPress={() =>
              navigation.navigate('StackRoutes', { screen: 'Transacoes' })
            }
          >
            <Pencil />
          </Button>
          <Button
            className="h-12 w-12 bg-custom-my-dark-green rounded-full"
            onPress={() =>
              navigation.navigate('StackRoutes', { screen: 'Transacoes' })
            }
          >
            <Trash />
          </Button>
        </ButtonGroup>
      </HStack>
      <VStack className="gap-4 mt-4">
        {transactions.length > 0 ? (
          <FlatList
            data={transactions}
            renderItem={({ item, index }) => (
              <HStack className="gap-6">
                <VStack className="gap-2">
                  <Text className="text-sm font-semibold text-custom-my-green">
                    {formatMonth(item.date.toDate())}
                  </Text>
                  <HStack className="items-center justify-between gap-6">
                    <Text className="text-md font-body text-black">
                      {item.transactionType}
                    </Text>
                    <Text className="text-sm font-body text-custom-my-extract-date-color">
                      {formattedDate.format(item.date.toDate())}
                    </Text>
                  </HStack>
                  <Text
                    className={`text-md font-semibold ${item.type === 'income' ? 'text-custom-my-green' : 'text-custom-my-dark-red'}`}
                  >
                    {item.type === 'outcome' ? '-' : '+'}{' '}
                    {formattedMoney.format(item.value)}
                  </Text>
                  <Divider className="w-3/4 border border-custom-my-green" />
                </VStack>
                {index !== transactions.length - 1 && (
                  <VStack className="flex-1 items-center justify-center">
                    <Divider
                      className="h-2 w-2 items-center justify-center bg-custom-my-green"
                      orientation="vertical"
                    />
                  </VStack>
                )}
              </HStack>
            )}
            contentContainerStyle={{
              gap: 16,
            }}
            className="mt-2"
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Text className="text-center">Nenhuma transação para mostrar.</Text>
        )}
      </VStack>
    </Box>
  )
}
