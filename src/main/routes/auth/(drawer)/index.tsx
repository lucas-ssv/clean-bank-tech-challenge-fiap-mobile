import { DrawerActions, useNavigation } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Feather from '@expo/vector-icons/Feather'

import { MakeHome } from '@/main/factories/screens'
import { DrawerContent } from './components'
import Logo from '@/presentation/assets/logo-icon-mobile.svg'

const { Navigator, Screen } = createDrawerNavigator()

export function AuthDrawerRoutes() {
  const navigation = useNavigation()

  return (
    <Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerTitle: '',
        headerStyle: {
          backgroundColor: '#000000',
          height: 94,
        },
        headerTintColor: '#47A138',
        headerRight(props) {
          return <Logo style={{ marginRight: 24 }} />
        },
        headerLeft() {
          return (
            <Feather
              name="menu"
              color="#47A138"
              style={{ marginLeft: 24 }}
              size={24}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          )
        },
        drawerItemStyle: {
          borderRadius: 8,
        },
        drawerActiveTintColor: '#004D61',
        drawerStyle: {
          backgroundColor: '#E4EDE3',
        },
      }}
    >
      <Screen name="Home" component={MakeHome} />
    </Navigator>
  )
}
