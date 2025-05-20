import { ScrollView } from 'react-native'

import { Extract, Welcome } from '@/presentation/components'
import { Box, Heading, VStack } from '@/presentation/components/ui'
import { Card } from './components'
import PixelsServices from '@/presentation/assets/pixels-servicos.svg'
import { LoadTransactions } from '@/domain/usecases/transaction'

type Props = {
  loadTransactions: LoadTransactions
}

export function MeusCartoes({ loadTransactions }: Props) {
  return (
    <ScrollView
      className="bg-custom-my-light-green"
      showsVerticalScrollIndicator={false}
    >
      <VStack className="flex-1 p-6">
        <Welcome />
        <Box className="bg-custom-my-gray-box py-8 px-4 rounded-lg overflow-hidden mt-6">
          <PixelsServices
            style={{
              position: 'absolute',
            }}
          />
          <PixelsServices
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              transform: [{ rotate: '180deg' }],
            }}
          />
          <Heading className="text-black text-center text-xl font-heading">
            Meus cartões
          </Heading>

          <VStack className="gap-8 mt-8">
            <Card variant="unlocked" />
          </VStack>
        </Box>
        <Extract loadTransactions={loadTransactions} />
      </VStack>
    </ScrollView>
  )
}
