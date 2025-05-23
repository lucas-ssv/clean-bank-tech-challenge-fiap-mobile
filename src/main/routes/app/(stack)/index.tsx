import { DrawerActions } from '@react-navigation/native'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Feather from '@expo/vector-icons/Feather'

import { DrawerParamList } from '@/presentation/@types/navigation'
import {
  MakeAvatarMenu,
  MakeDashboard,
  MakeInvestimentos,
  MakeMeusCartoes,
  MakeServicos,
  MakeTransacoes,
} from '@/main/factories/screens'
import { Profile } from '@/presentation/screens'

type Props = DrawerScreenProps<DrawerParamList, 'StackRoutes'>

const { Navigator, Screen } = createNativeStackNavigator()

export function StackRoutes({ navigation }: Props) {
  return (
    <Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#004D61',
        },
        headerTitleAlign: 'center',
        headerTintColor: '#FF5031',
        headerBackButtonDisplayMode: 'minimal',
        headerBackVisible: true,
        headerRight() {
          return <MakeAvatarMenu />
        },
      }}
    >
      <Screen
        name="Dashboard"
        component={MakeDashboard}
        options={{
          title: 'Início',
          headerLeft() {
            return (
              <Feather
                name="menu"
                color="#FF5031"
                size={24}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              />
            )
          },
        }}
      />
      <Screen
        name="Investimentos"
        component={MakeInvestimentos}
        options={{
          title: 'Investimentos',
        }}
      />
      <Screen
        name="Servicos"
        component={MakeServicos}
        options={{
          title: 'Serviços',
        }}
      />
      <Screen
        name="MeusCartoes"
        component={MakeMeusCartoes}
        options={{
          title: 'Meus cartões',
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Meu perfil',
        }}
      />
      <Screen
        name="Transacoes"
        component={MakeTransacoes}
        options={{
          title: 'Transações',
        }}
      />
    </Navigator>
  )
}
