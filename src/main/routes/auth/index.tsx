import { NavigationContainer } from '@react-navigation/native'

import { AuthDrawerRoutes } from './(drawer)'

export function AuthRoutes() {
  return (
    <NavigationContainer>
      <AuthDrawerRoutes />
    </NavigationContainer>
  )
}
