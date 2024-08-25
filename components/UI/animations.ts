import {Ava} from '../../assets/images'

export const talking = {
  animation: [Ava.default, Ava.defaultAlt, Ava.default],
  duration: 200
}
export const idle = {
  animation: [Ava.glad, Ava.shy, Ava.blushing],
  duration: 800
}
export const thinking = {
  animation: [Ava.thinking, Ava.confused],
  duration: 600
}

export const angry = {
  animation: [Ava.annoyed],
  duration: 0
}
export const afraid = {
  animation: [Ava.embarrassed],
  duration: 0
}
export const shocked = {
  animation: [Ava.shocked],
  duration: 0
}
export const sad = {
  animation: [Ava.sad],
  duration: 0
}

export const defaultState = {
  animation: [Ava.default],
  duration: 0
}
