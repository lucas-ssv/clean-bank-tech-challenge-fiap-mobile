import { useEffect } from 'react'
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter'
import { Montserrat_400Regular } from '@expo-google-fonts/montserrat'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'

import { GluestackUIProvider } from '@/presentation/components/ui/gluestack-ui-provider'
import { Home } from '@/presentation/screens'
import '@/presentation/styles'

export default function App() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Montserrat_400Regular,
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }

  return (
    <GluestackUIProvider mode="light">
      <Home addAccount={{} as any} />
      <StatusBar style="light" />
    </GluestackUIProvider>
  )
}
