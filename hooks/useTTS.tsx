import {useEffect, useState, useCallback, SetStateAction} from 'react'
import * as Speech from 'expo-speech'

const useTTS = (
  text: string,
  setIsTTSActive: React.Dispatch<SetStateAction<boolean>>
) => {
  const [totalVoices, setTotalVoices] = useState<Speech.Voice[]>([])

  useEffect(() => {
    const getVoices = async () => {
      const voices = await Speech.getAvailableVoicesAsync()
      setTotalVoices(voices)
    }

    getVoices()
  }, [])

  const speak = useCallback(() => {
    Speech.stop()
    setIsTTSActive(true)
    Speech.speak(text, {
      voice: totalVoices[0]?.identifier,
      onDone: () => {
        setIsTTSActive(false)
      }
    })
  }, [text, totalVoices])

  return {
    speak
  }
}

export default useTTS
