import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import { SafeAreaView } from 'react-native-safe-area-context'

import { VStack } from '@/presentation/components/ui'
import Logo from '@/presentation/assets/logo-branca.svg'

type Props = DrawerContentComponentProps

export function DrawerContent(props: Props) {
  return (
    <DrawerContentScrollView
      bounces={false}
      contentContainerStyle={{
        marginLeft: 0,
        paddingStart: 0,
        paddingEnd: 0,
        paddingTop: 0,
        flex: 1,
        backgroundColor: '#fff',
      }}
      {...props}
    >
      <SafeAreaView className="bg-custom-my-dark-green">
        <VStack className="bg-custom-my-dark-green items-center my-4 px-4">
          <Logo />
        </VStack>
      </SafeAreaView>

      <VStack className="p-4">
        <DrawerItemList {...props} />
        <DrawerItem
          label="Sobre"
          labelStyle={{
            color: '#004D61',
          }}
          style={{
            borderRadius: 8,
          }}
          onPress={() => {}}
        />
        <DrawerItem
          label="Serviços"
          labelStyle={{
            color: '#004D61',
          }}
          style={{
            borderRadius: 8,
          }}
          onPress={() => {}}
        />
      </VStack>
    </DrawerContentScrollView>
  )
}
