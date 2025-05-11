import { ComponentProps } from 'react'
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
// import { useTransaction } from '@/contexts'
import { FlatList } from 'react-native'
import {
  formatMonth,
  formattedDate,
  formattedMoney,
} from '@/presentation/utils'
// import { useNavigation } from '@react-navigation/native'

type Props = ComponentProps<typeof Box>

export function Extract({ className, ...rest }: Props) {
  // const { transactions } = useTransaction()
  const transactions: any[] = []
  // const navigation = useNavigation()

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
            // onPress={() =>
            //   navigation.navigate('StackRoutes', { screen: 'Transacoes' })
            // }
          >
            <Pencil />
          </Button>
          <Button
            className="h-12 w-12 bg-custom-my-dark-green rounded-full"
            // onPress={() =>
            //   navigation.navigate('StackRoutes', { screen: 'Transacoes' })
            // }
          >
            <Trash />
          </Button>
        </ButtonGroup>
      </HStack>
      <VStack className="gap-4 mt-4">
        {transactions.length > 0 ? (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id!}
            renderItem={({ item }) => (
              <HStack className="gap-4">
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
                    {item.type === 'outcome' ? '-' : '+'}
                    {formattedMoney.format(item.value)}
                  </Text>
                  <Divider className="w-3/4 border border-custom-my-green" />
                </VStack>
                <Divider orientation="vertical" />
              </HStack>
            )}
            contentContainerStyle={{
              gap: 16,
            }}
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
