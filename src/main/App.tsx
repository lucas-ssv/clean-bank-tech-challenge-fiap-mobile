import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { GluestackUIProvider } from '@/presentation/components/ui/gluestack-ui-provider'
import '@/presentation/styles'
import { Box } from '@/presentation/components/ui'

export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <View style={styles.container}>
        <Box className="w-10 h-10 bg-custom-my-dark-green rounded-md"></Box>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </GluestackUIProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
