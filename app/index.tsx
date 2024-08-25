import {useFonts} from 'expo-font'
import {useEffect} from 'react'
import * as SplashScreen from 'expo-splash-screen'
import {Splash} from '../components/UI/splash'

const index = () => {
  const [fontsLoaded] = useFonts({
    cool: require('../assets/fonts/Monoton/Monoton-Regular.ttf'),
    regular: require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    light: require('../assets/fonts/Poppins/Poppins-Light.ttf'),
    bold: require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    extrabold: require('../assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
    medium: require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
    semibold: require('../assets/fonts/Poppins/Poppins-SemiBold.ttf')
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
    <>
      <Splash />
    </>
  )
}

export default index
