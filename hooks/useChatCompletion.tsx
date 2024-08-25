import {LlamaContext} from 'llama.rn'
import {RNLlamaOAICompatibleMessage} from 'llama.rn/lib/typescript/chat'

const useChatCompletion = async (
  modelContext: LlamaContext | null,
  messages: RNLlamaOAICompatibleMessage[],
  setResponseState: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const stopWords = [
    '</s>',
    '<|end|>',
    '<|eot_id|>',
    '<|end_of_text|>',
    '<|im_end|>',
    '<|EOT|>',
    '<|END_OF_TURN_TOKEN|>',
    '<|end_of_turn|>',
    '<|endoftext|>'
  ]

  const msgResult = await modelContext!.completion(
    {
      messages: messages,
      n_predict: 100,
      n_threads: 4,
      stop: stopWords
    },
    (data) => {
      const {token} = data
    }
  )
  setResponseState(false)
  return msgResult
}

export default useChatCompletion
