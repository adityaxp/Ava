import {Text, View} from 'react-native'
import React from 'react'
import {useLocalSearchParams} from 'expo-router'

import {COLORS} from '../../infrastructure/themes'
import ChatHeader from '../../components/UI/chat-header'
import ChatContainer from '../../components/UI/chat-container'
import useLoadModel from '../../hooks/useLoadModel'
import Snackbar from 'react-native-snackbar'
import CharacterCanvas from '../../components/UI/character-canvas'

const chat = () => {
  const {modelPath} = useLocalSearchParams()

  const {model, error, isLoading} = useLoadModel(modelPath as string)

  if (!isLoading) {
    console.log('Model Loaded: ', JSON.stringify(model, null, 2))
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.primary}}>
      <ChatHeader />
      <View>
        <CharacterCanvas />
      </View>
      <ChatContainer model={model} isLoading={isLoading} />
    </View>
  )
}

export default chat
