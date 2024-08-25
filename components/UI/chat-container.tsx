import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import React, {useEffect, useState} from 'react'
import {COLORS} from '../../infrastructure/themes'
import {AntDesign} from '@expo/vector-icons'
import {LlamaContext} from 'llama.rn'
import useChatCompletion from '../../hooks/useChatCompletion'
import Snackbar from 'react-native-snackbar'
import {system_prompt} from '../../constants'
import {RNLlamaOAICompatibleMessage} from 'llama.rn/lib/typescript/chat'

interface chatConatainerProps {
  model: LlamaContext | null
  isLoading: boolean
}

const ChatContainer = ({model, isLoading}: chatConatainerProps) => {
  const [chatText, setChatText] = useState<string>('')
  const [responseState, setResponseState] = useState(false)
  const [conversation, setConversation] = useState<
    RNLlamaOAICompatibleMessage[]
  >([
    {
      role: 'system',
      content: system_prompt
    },
    {
      role: 'user',
      content: 'Hi there!'
    }
  ])

  const [loader, setLoader] = useState({
    off: true,
    on: false
  })

  useEffect(() => {
    const updateLoader = () => {
      if (loader.off) {
        setLoader({off: false, on: true})
      } else if (loader.on) {
        setLoader({off: true, on: false})
      }
    }
    const interval = setInterval(updateLoader, 600)
    return () => clearInterval(interval)
  }, [loader])

  const handleChat = async () => {
    setConversation((prevConvo) => [
      ...prevConvo,
      {role: 'user', content: chatText}
    ])

    setResponseState(true)
    const res = await useChatCompletion(model, conversation, setResponseState)
    console.log('Result', res.text)
    setChatText('')
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        elevation: 10
      }}
    >
      <KeyboardAvoidingView
        style={{
          flexDirection: 'row',
          backgroundColor: COLORS.secondary,
          minHeight: 55,
          marginHorizontal: 10,
          marginBottom: 10,
          borderRadius: 10,
          borderWidth: 2,
          borderColor:
            responseState && loader.on ? COLORS.pink : COLORS.transparent,
          elevation: 10,
          alignContent: 'center',
          padding: 5
        }}
      >
        <TextInput
          placeholder="Type here..."
          placeholderTextColor={COLORS.gray2}
          cursorColor={COLORS.pink}
          value={chatText}
          onChangeText={(text) => {
            if (!responseState) setChatText(text)
          }}
          style={{
            flex: 1,
            marginHorizontal: 10,
            fontFamily: 'regular',
            color: COLORS.white,
            fontSize: 16
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            width: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10
          }}
          disabled={responseState}
          onPress={() => {
            if (!isLoading) {
              if (chatText.trim() !== '') {
                handleChat()
              } else {
                Snackbar.show({
                  text: "Prompt can't be empty!",
                  duration: Snackbar.LENGTH_SHORT
                })
              }
            } else {
              Snackbar.show({
                text: 'Model is still loading...',
                duration: Snackbar.LENGTH_SHORT
              })
            }
          }}
        >
          <AntDesign name="arrowup" size={18} color={COLORS.pink} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

export default ChatContainer
