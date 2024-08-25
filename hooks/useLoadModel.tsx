import {useState, useEffect} from 'react'
import {initLlama, LlamaContext} from 'llama.rn'
import {Platform} from 'react-native'

const useLoadModel = (modelPath: string) => {
  const [model, setModel] = useState<LlamaContext | null>(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const defaultPreset = {
    context_length: 2048,
    threads: 1,
    gpu_layers: 0,
    batch: 512
  }

  useEffect(() => {
    const initModel = async () => {
      try {
        console.log('Init model at modelPath', modelPath)

        const intializedModel = await initLlama({
          model: modelPath,
          n_ctx: defaultPreset.context_length,
          n_threads: defaultPreset.threads,
          n_batch: defaultPreset.batch,
          n_gpu_layers: Platform.OS === 'ios' ? defaultPreset.gpu_layers : 0
        })

        setModel(intializedModel)
        setIsLoading(false)
      } catch (err: any) {
        setError(err)
        setIsLoading(false)
      }
    }

    if (modelPath) {
      initModel()
    }
  }, [])

  return {model, error, isLoading}
}

export default useLoadModel
