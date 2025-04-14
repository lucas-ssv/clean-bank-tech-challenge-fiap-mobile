import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
} from '@/presentation/components/ui'
import { ScrollView, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { AddAccount } from '@/domain/usecases'

import { Footer, ModalCriarConta, ModalLogin } from './components'
import IlustracaoBanner from '@/presentation/assets/ilustracao-banner.svg'
import Gift from '@/presentation/assets/presente.svg'
import Saque from '@/presentation/assets/saque.svg'
import Star from '@/presentation/assets/pontos.svg'
import Dispositivos from '@/presentation/assets/dispositivos.svg'

type Props = {
  addAccount: AddAccount
}

export function Home({ addAccount }: Props) {
  return (
    <ScrollView
      className="bg-custom-my-light-green"
      showsVerticalScrollIndicator={false}
    >
      <VStack className="flex-1">
        <LinearGradient className="flex-1" colors={['#004D61', '#FFFFFF']}>
          <Box className="px-6 py-10">
            <Heading className="text-black text-center text-xl">
              Experimente mais liberdade no controle da sua vida financeira.
              Crie sua conta com a gente!
            </Heading>
            <View className="mt-4">
              <IlustracaoBanner width="100%" height={194} />
            </View>
            <HStack className="justify-between items-center gap-6 mt-4">
              <ModalCriarConta addAccount={addAccount} />
              <ModalLogin />
            </HStack>

            <Box className="px-10">
              <Heading className="text-lg text-center text-black mt-8">
                Vantagens do nosso banco:
              </Heading>

              <Box className="flex justify-center items-center mt-10">
                <Gift />
                <Heading className="text-custom-my-green text-lg text-center mt-10">
                  Conta e cartão gratuitos
                </Heading>
                <Text className="text-custom-my-gray font-body text-md text-center mt-6">
                  Isso mesmo, nossa conta é digital, sem custo fixo e mais que
                  isso: sem tarifa de manutenção.
                </Text>
              </Box>

              <Box className="flex justify-center items-center mt-10">
                <Saque />
                <Heading className="text-custom-my-green text-lg text-center mt-10">
                  Saques sem custo
                </Heading>
                <Text className="text-custom-my-gray font-body text-md text-center mt-6">
                  Você pode sacar gratuitamente 4x por mês de qualquer Banco
                  24h.
                </Text>
              </Box>

              <Box className="flex justify-center items-center mt-10">
                <Star />
                <Heading className="text-custom-my-green text-lg text-center mt-10">
                  Programa de pontos
                </Heading>
                <Text className="text-custom-my-gray font-body text-md text-center mt-6">
                  Você pode acumular pontos com suas compras no crédito sem
                  pagar mensalidade!
                </Text>
              </Box>

              <Box className="flex justify-center items-center mt-10">
                <Dispositivos />
                <Heading className="text-custom-my-green text-lg text-center mt-10">
                  Seguro Dispositivos
                </Heading>
                <Text className="text-custom-my-gray font-body text-md text-center mt-6">
                  Seus dispositivos móveis (computador e laptop) protegidos por
                  uma mensalidade simbólica.
                </Text>
              </Box>
            </Box>
          </Box>
        </LinearGradient>

        <Footer />
      </VStack>
    </ScrollView>
  )
}
