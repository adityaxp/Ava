import {StatusBar} from 'expo-status-bar'
import {StyleSheet, Text, View} from 'react-native'
import {useFonts} from 'expo-font'
import {useEffect} from 'react'
import * as SplashScreen from 'expo-splash-screen'

export default function App() {
  const [fontsLoaded] = useFonts({
    cool: require('./assets/fonts/Gloria_Hallelujah/GloriaHallelujah-Regular.ttf'),
    regular: require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    light: require('./assets/fonts/Poppins/Poppins-Light.ttf'),
    bold: require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    extrabold: require('./assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
    medium: require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
    semibold: require('./assets/fonts/Poppins/Poppins-SemiBold.ttf')
  })

  useEffect(() => {
    const loadFontsAndHideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync()
      }
    }

    loadFontsAndHideSplashScreen()
  }, [fontsLoaded])

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
