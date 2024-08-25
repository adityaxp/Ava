import {KeyboardAvoidingView, Platform, Text, View} from 'react-native'
import React, {useState} from 'react'
import {useLocalSearchParams} from 'expo-router'

import {COLORS} from '../../infrastructure/themes'
import ChatHeader from '../../components/UI/chat-header'
import ChatContainer from '../../components/UI/chat-container'
import useLoadModel from '../../hooks/useLoadModel'
import Snackbar from 'react-native-snackbar'
import CharacterCanvas from '../../components/UI/character-canvas'
import {
  afraid,
  defaultState,
  idle,
  talking,
  thinking
} from '../../components/UI/animations'
import {default_message} from '../../constants'
import {RNLlamaOAICompatibleMessage} from 'llama.rn/lib/typescript/chat'
const chat = () => {
  const {modelPath} = useLocalSearchParams()

  const {model, error, isLoading} = useLoadModel(modelPath as string)

  // if (!isLoading) {
  //   console.log('Model Loaded: ', JSON.stringify(model, null, 2))
  // }

  const [responseState, setResponseState] = useState(false)
  const [isTTSActive, setIsTTSActive] = useState(false)
  const [conversation, setConversation] =
    useState<RNLlamaOAICompatibleMessage[]>(default_message)

  return (
    <View style={{flex: 1, backgroundColor: COLORS.primary}}>
      <ChatHeader
        setConversation={setConversation}
        responseState={responseState}
      />
      {isLoading && (
        <CharacterCanvas animation={idle.animation} duration={idle.duration} />
      )}
      {error && (
        <CharacterCanvas
          animation={afraid.animation}
          duration={afraid.duration}
        />
      )}
      {responseState && (
        <CharacterCanvas
          animation={thinking.animation}
          duration={thinking.duration}
        />
      )}
      {isTTSActive && (
        <CharacterCanvas
          animation={talking.animation}
          duration={talking.duration}
        />
      )}
      {!responseState && !isLoading && !isTTSActive && (
        <CharacterCanvas
          animation={defaultState.animation}
          duration={defaultState.duration}
        />
      )}

      <ChatContainer
        model={model}
        isLoading={isLoading}
        responseState={responseState}
        setResponseState={setResponseState}
        conversation={conversation}
        setConversation={setConversation}
        isTTSActive={isTTSActive}
        setIsTTSActive={setIsTTSActive}
      />
    </View>
  )
}

export default chat
