import { ScrollView } from 'react-native'

import { LoadTransactions } from '@/domain/usecases/transaction'
import { Extract, Welcome } from '@/presentation/components'
import { VStack } from '@/presentation/components/ui'
import { Services } from './components'

type Props = {
  loadTransactions: LoadTransactions
}

export function Servicos({ loadTransactions }: Props) {
  return (
    <ScrollView
      className="bg-custom-my-light-green"
      showsVerticalScrollIndicator={false}
    >
      <VStack className="flex-1 p-6">
        <Welcome />
        <Services />
        <Extract loadTransactions={loadTransactions} />
      </VStack>
    </ScrollView>
  )
}
