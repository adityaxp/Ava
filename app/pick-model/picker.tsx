import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native'
import React, {useCallback, useState} from 'react'
import {globalStyles} from '../../components/style/global.style'
import {COLORS} from '../../infrastructure/themes'
import {router} from 'expo-router'
import * as FS from 'expo-file-system'
import * as DocumentPicker from 'react-native-document-picker'
import {AntDesign} from '@expo/vector-icons'
import Snackbar from 'react-native-snackbar'

const PickAModel = () => {
  const [modelPath, setModelPath] = useState('')

  const validateModelFile = (uri: string): boolean => {
    const fileName = uri.substring(uri.lastIndexOf('/') + 1)

    const fileExtension = fileName.split('.').pop()?.toLowerCase()

    if (fileExtension !== 'gguf') {
      return false
    }
    return true
  }

  const openPicker = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
        mode: 'import'
      })

      if (!result.copyError) {
        const modelDir = `${FS.documentDirectory}models/`
        await FS.makeDirectoryAsync(modelDir, {intermediates: true})

        await FS.copyAsync({
          from: result.uri,
          to: `${modelDir}${result.name}`
        })

        setModelPath(`${modelDir}${result.name}`)
        Snackbar.show({
          text: 'Model path set',
          duration: Snackbar.LENGTH_SHORT
        })
      } else {
        Snackbar.show({
          text: 'An Error Occured while selecting the file',
          duration: Snackbar.LENGTH_SHORT
        })
      }
    } catch {
      Snackbar.show({
        text: 'Selection Canceled',
        duration: Snackbar.LENGTH_SHORT
      })
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            borderRadius: 12,
            borderColor: COLORS.pink,
            padding: 10
          }}
          onPress={openPicker}
        >
          <Text
            style={{
              fontFamily: 'regular',
              color: COLORS.gray2,
              fontSize: 16
            }}
          >
            Pick model file
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginTop: 50,
            borderWidth: 0.5,
            borderRadius: 999,
            borderColor: COLORS.pink,
            padding: 10
          }}
          onPress={() => {
            if (modelPath !== '') {
              if (validateModelFile(modelPath)) {
                router.push({
                  pathname: '/chat/[modelPath]',
                  params: {modelPath: modelPath}
                })
              } else {
                alert('Invalid model')
              }
            } else {
              alert('No model found or model setup in progress...')
            }
          }}
        >
          <Text
            style={{
              fontFamily: 'regular',
              color: COLORS.gray,
              fontSize: 16
            }}
          >
            <AntDesign name="arrowright" size={24} color={COLORS.pink} />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default PickAModel
