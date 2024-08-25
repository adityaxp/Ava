import {StyleSheet, Image} from 'react-native'
import React, {useEffect, useState} from 'react'

interface CharacterCanvasProps {
  animation: any[]
  duration: number
}

const CharacterCanvas = ({animation, duration}: CharacterCanvasProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // If there's only one image
    if (animation.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % animation.length)
      }, duration)

      return () => clearInterval(interval)
    }
  }, [animation, duration])

  return (
    <Image
      source={animation[currentIndex]}
      style={{
        width: '100%',
        height: '85%',
        resizeMode: 'cover'
      }}
    />
  )
}

export default CharacterCanvas

const styles = StyleSheet.create({})
