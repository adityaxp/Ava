import {Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {COLORS} from '../../infrastructure/themes'
import {MaterialIcons, Ionicons} from '@expo/vector-icons'
import {router} from 'expo-router'

const ChatHeader = () => {
  return (
    <View style={{flexDirection: 'row', marginVertical: 10}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: COLORS.secondary,
          minHeight: 50,
          marginLeft: 10,
          alignItems: 'center',
          padding: 5,
          gap: 20,
          borderRadius: 10,
          elevation: 5,
          width: '80%'
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.push('/pick-model/picker')
          }}
        >
          <MaterialIcons
            name="keyboard-backspace"
            size={24}
            color={COLORS.pink}
          />
        </TouchableOpacity>
        <Text
          style={{color: COLORS.white, fontFamily: 'semibold', fontSize: 24}}
        >
          Ava
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.secondary,
          minHeight: 50,
          marginLeft: 10,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 5,
          width: 50,
          borderRadius: 10,
          elevation: 5
        }}
      >
        <Ionicons name="refresh" size={24} color={COLORS.pink} />
      </TouchableOpacity>
    </View>
  )
}

export default ChatHeader
