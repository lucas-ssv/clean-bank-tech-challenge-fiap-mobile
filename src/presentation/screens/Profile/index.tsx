import { useState } from 'react'
import { ScrollView } from 'react-native'

import {
  Box,
  Button,
  ButtonText,
  FormControl,
  Heading,
  VStack,
} from '@/presentation/components/ui'
import { Input } from './components'
import Pixels from '@/presentation/assets/pixels-servicos.svg'
import Illustration from '@/presentation/assets/ilu-profile.svg'
import { useAuth } from '@/presentation/hooks'

export function Profile() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')

  return (
    <ScrollView
      className="bg-custom-my-light-green"
      showsVerticalScrollIndicator={false}
    >
      <VStack className="flex-1 p-6">
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
          <Heading className="text-black text-center text-xl font-heading">
            Minha conta
          </Heading>

          <FormControl>
            <Input
              label="Nome"
              type="text"
              value={name}
              onChangeText={setName}
              placeholder="Nome"
            />
            <Input
              label="E-mail"
              type="text"
              value={email}
              onChangeText={setEmail}
              placeholder="E-mail"
            />
            <Input label="Senha" type="password" placeholder="Senha" />
            <Button className="h-12 bg-custom-my-orange rounded-lg mt-6">
              <ButtonText className="text-md">Salvar alterações</ButtonText>
            </Button>
          </FormControl>
          <Illustration
            width={279}
            height={238}
            style={{
              marginTop: 24,
              alignSelf: 'center',
              marginHorizontal: 16,
            }}
          />
        </Box>
      </VStack>
    </ScrollView>
  )
}
