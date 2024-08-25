import {StyleSheet, Image, View} from 'react-native'
import React from 'react'

const CharacterCanvas = () => {
  return (
    <View>
      <Image source={{uri: require('../../assets/images/default.png')}} />
    </View>
  )
}

export default CharacterCanvas

const styles = StyleSheet.create({})
