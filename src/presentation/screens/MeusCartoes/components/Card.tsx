import {
  Button,
  ButtonText,
  Card as GluestackCard,
  Text,
  VStack,
} from '@/presentation/components/ui'
import Pixels from '@/presentation/assets/pixels.svg'

type Props = {
  variant: 'locked' | 'unlocked'
}

export function Card({ variant }: Props) {
  return (
    <VStack>
      <Text className="text-lg font-body text-center text-custom-my-card-title">
        Cartão físico
      </Text>
      <GluestackCard
        className={`h-[148px] ${variant === 'locked' ? 'bg-custom-my-extract-date-color' : 'bg-custom-my-dark-green'} rounded-lg mt-8`}
        variant="filled"
      >
        <Text className="text-white font-semibold italic text-lg">Byte</Text>
        <Text className="text-white text-md font-body_montserrat mt-2">
          Platinum
        </Text>
        <Text className="text-white text-md font-body_montserrat mt-6">
          Joana Fonseca Gomes
        </Text>
        <Text className="text-white text-md mt-2">********</Text>
        <Pixels
          style={{
            position: 'absolute',
            right: 0,
            transform: [{ scaleX: -1 }, { rotate: '270deg' }],
          }}
          height={148}
        />
      </GluestackCard>

      <VStack className="justify-center mt-4 gap-4">
        <Button className="h-12 bg-custom-my-orange rounded-lg">
          <ButtonText className="text-md">Configurar</ButtonText>
        </Button>
        <Button
          className="h-12 rounded-lg border border-custom-my-dark-red"
          action="negative"
          variant="outline"
        >
          <ButtonText className="text-md text-custom-my-dark-red">
            {variant === 'locked' ? 'Desbloquear' : 'Bloquear'}
          </ButtonText>
        </Button>
        <Text className="text-custom-my-card-title font-body text-center">
          Função: Débito/Crédito
        </Text>
      </VStack>
    </VStack>
  )
}
