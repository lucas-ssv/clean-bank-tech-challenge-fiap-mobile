import React from 'react'

import Logo from '@/presentation/assets/logo-branca.svg'
import Insta from '@/presentation/assets/instagram.svg'
import Wpp from '@/presentation/assets/whatsapp.svg'
import Youtube from '@/presentation/assets/youtube.svg'

import { Linking, View } from 'react-native'
import { Box, Heading, HStack, Text } from '@/presentation/components/ui'

export function Footer() {
  return (
    <Box className="bg-black py-6 px-16">
      <Heading className="text-white text-md">Serviços</Heading>
      <Text size="md" className="mt-4 text-white">
        Conta corrente
      </Text>
      <Text size="md" className="mt-4 text-white">
        Conta PJ
      </Text>
      <Text size="md" className="mt-4 text-white">
        Cartão de crédito
      </Text>

      <Heading className="text-white text-md mt-8">Contato</Heading>
      <Text size="md" className="mt-4 text-white">
        0800 004 250 08
      </Text>
      <Text size="md" className="mt-4 text-white">
        meajuda@bytebank.com.br
      </Text>
      <Text size="md" className="mt-4 text-white">
        ouvidoria@bytebank.com.br
      </Text>

      <Heading className="text-white text-md mt-8">
        Desenvolvido por Alura
      </Heading>
      <View className="my-6">
        <Logo />
      </View>
      <HStack className="items-center gap-6">
        <Text onPress={() => Linking.openURL('https://instagram.com')}>
          <Insta />
        </Text>
        <Text onPress={() => Linking.openURL('https://web.whatsapp.com')}>
          <Wpp />
        </Text>
        <Text onPress={() => Linking.openURL('https://youtube.com')}>
          <Youtube />
        </Text>
      </HStack>
    </Box>
  )
}
