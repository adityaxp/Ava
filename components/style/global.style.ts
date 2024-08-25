import {StyleSheet} from 'react-native'
import {COLORS} from '../../infrastructure/themes'

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary
  },
  splashText: {
    fontFamily: 'cool',
    color: COLORS.white,
    fontSize: 88
  }
})
