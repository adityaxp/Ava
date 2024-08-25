import {
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import React, {SetStateAction, useEffect, useState} from 'react'
import {COLORS} from '../../infrastructure/themes'
import {AntDesign, FontAwesome6} from '@expo/vector-icons'
import {LlamaContext} from 'llama.rn'
import useChatCompletion from '../../hooks/useChatCompletion'
import Snackbar from 'react-native-snackbar'
import {RNLlamaOAICompatibleMessage} from 'llama.rn/lib/typescript/chat'
import useTTS from '../../hooks/useTTS'

interface chatConatainerProps {
  model: LlamaContext | null
  isLoading: boolean
  responseState: boolean
  isTTSActive: boolean
  conversation: RNLlamaOAICompatibleMessage[]
  setResponseState: React.Dispatch<SetStateAction<boolean>>
  setConversation: React.Dispatch<SetStateAction<RNLlamaOAICompatibleMessage[]>>
  setIsTTSActive: React.Dispatch<SetStateAction<boolean>>
}

const ChatContainer = ({
  model,
  isLoading,
  responseState,
  setResponseState,
  conversation,
  setConversation,
  setIsTTSActive,
  isTTSActive
}: chatConatainerProps) => {
  const [chatText, setChatText] = useState<string>('')
  const [response, setResponse] = useState<string>('')

  const [loader, setLoader] = useState({
    off: true,
    on: false
  })

  const {speak} = useTTS(response, setIsTTSActive)

  useEffect(() => {
    if (response) {
      speak()
      setResponse('')
      setChatText('')
    }
  }, [response, speak])

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (responseState) {
      const updateLoader = () => {
        setLoader((prevLoader) => ({
          off: !prevLoader.off,
          on: !prevLoader.on
        }))
      }

      interval = setInterval(updateLoader, 600)
    } else {
      if (interval) clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [responseState])

  const handleChat = async () => {
    Keyboard.dismiss()
    setConversation((prevConvo) => [
      ...prevConvo,
      {role: 'user', content: chatText}
    ])

    setResponseState(true)
    const res = await useChatCompletion(model, conversation, setResponseState)
    console.log('Time: ', res.timings)
    console.log('Result: ', res.text)
    setResponse(res.text)
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
            if (!responseState && !isTTSActive) setChatText(text)
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
            if (!isLoading && !isTTSActive) {
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
          {!responseState ? (
            <AntDesign name="arrowup" size={18} color={COLORS.pink} />
          ) : (
            <FontAwesome6 name="circle-stop" size={18} color={COLORS.pink} />
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

export default ChatContainer
