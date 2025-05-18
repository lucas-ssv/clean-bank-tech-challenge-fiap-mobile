import { useCallback, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { Timestamp } from 'firebase/firestore'

import {
  LoadTransactions,
  LoadTransactionsFilterParams,
  LoadTransactionsResult,
} from '@/domain/usecases/transaction'
import { Extract, Welcome } from '@/presentation/components'
import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
} from '@/presentation/components/ui'
import Pixels from '@/presentation/assets/pixels-servicos.svg'
import { CardTransaction, ModalFilters } from './components'
import { useToast } from '@/presentation/hooks'
import { getIncomeOutcomeTransaction } from '@/presentation/utils'

type TransactionProps = LoadTransactionsResult<Timestamp> & {
  type: 'income' | 'outcome'
}

type Props = {
  loadTransactions: LoadTransactions
}

export function Transacoes({ loadTransactions }: Props) {
  const toast = useToast()
  const [transactions, setTransactions] = useState<TransactionProps[]>([])

  const fetchTransactions = useCallback(
    async (filters?: LoadTransactionsFilterParams) => {
      try {
        const transactions = await loadTransactions.execute(filters)
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
    },
    [loadTransactions, toast],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <ScrollView
      className="bg-custom-my-light-green"
      showsVerticalScrollIndicator={false}
    >
      <VStack className="flex-1 p-6">
        <Welcome />
        <Box className="bg-custom-my-gray-box py-8 px-6 rounded-lg overflow-hidden mt-6">
          <Pixels
            style={{
              position: 'absolute',
            }}
          />
          <Pixels
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              transform: [{ rotate: '180deg' }],
            }}
          />
          <HStack className="justify-between items-center">
            <Heading className="text-black text-xl font-heading">
              Transações
            </Heading>
            <ModalFilters onFetchTransactions={fetchTransactions} />
          </HStack>

          <VStack className="gap-4 mt-8">
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <CardTransaction
                  testID="card-transaction"
                  key={transaction.id}
                  transaction={transaction}
                  index={index}
                />
              ))
            ) : (
              <Text className="text-center">
                Nenhuma transação para mostrar.
              </Text>
            )}
          </VStack>
        </Box>
        <Extract loadTransactions={loadTransactions} />
      </VStack>
    </ScrollView>
  )
}
