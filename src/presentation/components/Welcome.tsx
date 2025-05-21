import { ComponentProps, useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import {
  Box,
  Divider,
  Heading,
  HStack,
  Text,
} from '@/presentation/components/ui'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { BlurView } from 'expo-blur'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

import { useAuth } from '@/presentation/hooks'
import { getFormattedDate } from '@/presentation/utils'
import Pixels from '@/presentation/assets/pixels.svg'
import Illustration from '@/presentation/assets/ilustracao.svg'

type Props = ComponentProps<typeof Box>

export function Welcome({ ...rest }: Props) {
  const { user } = useAuth()
  const [balanceBlurred, setBalanceBlurred] = useState(true)

  const opacity = useSharedValue(0)
  const translateY = useSharedValue(50)

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 800 })
    translateY.value = withSpring(0)
  }, [opacity, translateY])

  const balanceOpacity = useSharedValue(1)
  const balanceScale = useSharedValue(1)

  const buttonScale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }))

  const balanceAnimatedStyle = useAnimatedStyle(() => ({
    opacity: balanceOpacity.value,
    transform: [{ scale: balanceScale.value }],
  }))

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }))

  return (
    <Animated.View style={[animatedStyle]}>
      <Box
        className="h-[655px] bg-custom-my-dark-green py-10 px-[66px] rounded-lg overflow-hidden"
        {...rest}
      >
        <Pixels
          style={{
            position: 'absolute',
            top: 0,
            transform: [{ rotate: '180deg' }],
          }}
        />
        <Pixels
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
        />
        <Illustration
          style={{
            position: 'absolute',
            bottom: 34,
            alignSelf: 'center',
            marginHorizontal: 16,
          }}
        />
        <Heading className="text-white text-center font-semibold text-xl">
          Olá, {user?.name} :)
        </Heading>
        <Text className="text-white text-center text-sm mt-6">
          {getFormattedDate()}
        </Text>
        <HStack className="items-center gap-6 mt-10">
          <Heading className="text-white font-semibold text-lg">Saldo</Heading>
          <TouchableOpacity onPress={() => setBalanceBlurred(!balanceBlurred)}>
            <Animated.View style={buttonAnimatedStyle}>
              {balanceBlurred ? (
                <MaterialIcons name="visibility" size={20} color="#FFFFFF" />
              ) : (
                <MaterialIcons
                  name="visibility-off"
                  size={20}
                  color="#FFFFFF"
                />
              )}
            </Animated.View>
          </TouchableOpacity>
        </HStack>
        <Divider className="h-[2px] my-4" />
        <Text className="text-white text-md">Conta Corrente</Text>
        <View>
          <Animated.View style={balanceAnimatedStyle}>
            {balanceBlurred ? (
              <BlurView
                style={{
                  flex: 1,
                  padding: 24,
                  justifyContent: 'center',
                  overflow: 'hidden',
                  borderRadius: 8,
                }}
                intensity={50}
                tint="light"
                className="mt-2"
              >
                <Text className="text-white text-2xl font-body mt-2">
                  R$ 2.500,00
                </Text>
              </BlurView>
            ) : (
              <Text className="text-white text-2xl font-body mt-2">
                R$ 2.500,00
              </Text>
            )}
          </Animated.View>
        </View>
      </Box>
    </Animated.View>
  )
}
