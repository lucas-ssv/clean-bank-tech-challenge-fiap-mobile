import { ScrollView } from 'react-native'

import {
  AddTransaction,
  LoadTransactions,
  LoadTransactionsByDate,
} from '@/domain/usecases/transaction'
import { FinancialFlowChart, NewTransaction } from './components'
import { VStack } from '@/presentation/components/ui'
import { Extract, Welcome } from '@/presentation/components'

type Props = {
  addTransaction: AddTransaction
  loadTransactionsByDate: LoadTransactionsByDate
  loadTransactions: LoadTransactions
}

export function Dashboard({
  addTransaction,
  loadTransactionsByDate,
  loadTransactions,
}: Props) {
  return (
    <ScrollView
      className="bg-custom-my-light-green"
      showsVerticalScrollIndicator={false}
    >
      <VStack className="flex-1 p-6">
        <Welcome />
        <NewTransaction addTransaction={addTransaction} />
        <FinancialFlowChart loadTransactionsByDate={loadTransactionsByDate} />
        <Extract loadTransactions={loadTransactions} />
      </VStack>
    </ScrollView>
  )
}
