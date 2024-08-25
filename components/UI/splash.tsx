import {Animated, Text, SafeAreaView} from 'react-native'
import React, {useEffect, useRef} from 'react'
import {globalStyles} from '../style/global.style'
import {router} from 'expo-router'

export const Splash = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start()
  }

  useEffect(() => {
    fadeIn()
    setTimeout(() => {
      router.push('/pick-model/picker')
    }, 1000)
  }, [])

  return (
    <SafeAreaView style={globalStyles.container}>
      <Animated.View
        style={[
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          },
          {
            opacity: fadeAnim
          }
        ]}
      >
        <Text style={globalStyles.splashText}>Ava</Text>
      </Animated.View>
    </SafeAreaView>
  )
}
