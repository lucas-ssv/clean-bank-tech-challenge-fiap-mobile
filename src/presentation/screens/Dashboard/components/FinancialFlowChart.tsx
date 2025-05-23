import { Dimensions, ScrollView } from 'react-native'
import { ComponentProps, useCallback, useEffect, useState } from 'react'
import { BarChart } from 'react-native-chart-kit'
import { LinearGradient } from 'expo-linear-gradient'

import { TransactionModel } from '@/domain/models/transaction'
import { LoadTransactionsByDate } from '@/domain/usecases/transaction'
import {
  Box,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Text,
  VStack,
} from '@/presentation/components/ui'
import { InputDate } from '@/presentation/components'
import { useToast } from '@/presentation/hooks'

type Props = ComponentProps<typeof Box> & {
  loadTransactionsByDate: LoadTransactionsByDate
}

export function FinancialFlowChart({ loadTransactionsByDate, ...rest }: Props) {
  const toast = useToast()
  const screenWidth = Dimensions.get('window').width
  const [startDate, setStartDate] = useState<Date>(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })
  const [endDate, setEndDate] = useState<Date>(new Date())

  const [transactions, setTransactions] = useState<TransactionModel[]>([])
  const labels = transactions.map((transaction) => transaction.transactionType)
  const datasets = transactions.map((transaction) => transaction.value)

  const loadTransactions = useCallback(async () => {
    try {
      const startOfDay = new Date(startDate)
      startOfDay.setHours(0, 0, 0, 0)
      const endOfDay = new Date(endDate)
      endOfDay.setHours(23, 59, 59, 999)

      const transactions = await loadTransactionsByDate.execute(
        startOfDay,
        endOfDay,
      )
      setTransactions(transactions)
    } catch (error) {
      toast('error', 'Erro ao carregar transações', error.code)
    }
  }, [loadTransactionsByDate, startDate, endDate, toast])

  useEffect(() => {
    loadTransactions()
  }, [loadTransactions])

  return (
    <Box className="flex-1 w-full mx-auto shadow-hard-3 mt-6" {...rest}>
      <LinearGradient
        start={[0, 0]}
        end={[1, 0]}
        style={{
          borderRadius: 8,
        }}
        colors={['#fb8c00', '#ffa726']}
      >
        <VStack className="px-4">
          <Text className="text-white text-xl text-center font-heading m-4">
            Fluxo Financeiro
          </Text>
          <FormControl>
            <HStack className="gap-4">
              <VStack className="flex-1">
                <FormControlLabel>
                  <FormControlLabelText className="text-white text-sm">
                    Data inicial
                  </FormControlLabelText>
                </FormControlLabel>
                <InputDate
                  className="bg-custom-my-input-orange"
                  date={startDate}
                  setDate={setStartDate}
                />
              </VStack>
              <VStack className="flex-1">
                <FormControlLabel>
                  <FormControlLabelText className="text-white text-sm">
                    Data final
                  </FormControlLabelText>
                </FormControlLabel>
                <InputDate
                  className="bg-custom-my-input-orange"
                  date={endDate}
                  setDate={setEndDate}
                />
              </VStack>
            </HStack>
          </FormControl>
        </VStack>
        <ScrollView
          className="w-full"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <BarChart
            data={{
              labels,
              datasets: [
                {
                  data: datasets,
                },
              ],
            }}
            width={screenWidth + 150}
            height={280}
            yAxisLabel="R$"
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 8,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
                fill: '#FF0000',
              },
            }}
            fromZero
            style={{
              borderRadius: 8,
              marginTop: 16,
              paddingHorizontal: 8,
            }}
          />
        </ScrollView>
      </LinearGradient>
    </Box>
  )
}
