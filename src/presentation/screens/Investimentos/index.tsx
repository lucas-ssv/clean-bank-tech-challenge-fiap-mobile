import { Dimensions, ScrollView } from 'react-native'

import { Extract, Welcome } from '@/presentation/components'
import { Box, Heading, Text, VStack } from '@/presentation/components/ui'
import PixelsServices from '@/presentation/assets/pixels-servicos.svg'

import { PieChart } from 'react-native-chart-kit'
import { LoadTransactions } from '@/domain/usecases/transaction'

type Props = {
  loadTransactions: LoadTransactions
}

export function Investimentos({ loadTransactions }: Props) {
  const screenWidth = Dimensions.get('window').width

  const data = [
    {
      name: 'Cofrinho',
      value: 5000,
      color: '#3498db',
      legendFontColor: '#FFF',
      legendFontSize: 16,
    },
    {
      name: 'Renda Fixa',
      value: 14600,
      color: '#2ecc71',
      legendFontColor: '#FFF',
      legendFontSize: 16,
    },
    {
      name: 'Renda variável',
      value: 38000,
      color: '#f39c12',
      legendFontColor: '#FFF',
      legendFontSize: 16,
    },
  ]
  const totalValue = data
    .reduce((sum, item) => sum + item.value, 0)
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

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
          <Heading className="text-black text-center text-xl font-heading">
            Investimentos
          </Heading>

          <VStack className="gap-8 mt-8">
            <Text className="text-custom-my-dark-green text-xl text-center">
              Total: {totalValue}
            </Text>

            {data.map((item, index) => (
              <Box
                key={index}
                className="bg-custom-my-dark-green py-6 rounded-xl"
              >
                <Text className="text-lg text-white text-center">
                  {' '}
                  {item.name}{' '}
                </Text>
                <Text className="text-xl text-white text-center mt-5">
                  {item.value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </Text>
              </Box>
            ))}

            <Text className="text-lg text-black text-center">Estatísticas</Text>

            <Box className="bg-custom-my-dark-green pt-2 pb-6 rounded-xl">
              <PieChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={{ color: () => `#000` }}
                accessor={'value'}
                backgroundColor={'transparent'}
                absolute
                paddingLeft="15"
                center={[50, 0]}
                hasLegend={false}
                avoidFalseZero={true}
              />
              <Box className="flex w-full justify-center mx-auto mt-4">
                {data.map((item, index) => (
                  <Box
                    key={index}
                    className="flex flex-row justify-center items-center mb-3"
                  >
                    <Box
                      style={{
                        width: 14,
                        height: 14,
                        backgroundColor: item.color,
                        marginRight: 5,
                        borderRadius: 6,
                      }}
                    />
                    <Text style={{ fontSize: 16, color: '#FFF' }}>
                      {item.value.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}{' '}
                      {item.name}{' '}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </VStack>
        </Box>
        <Extract loadTransactions={loadTransactions} />
      </VStack>
    </ScrollView>
  )
}
