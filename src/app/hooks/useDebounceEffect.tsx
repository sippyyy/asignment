import { useEffect } from 'react'

function useDebounceEffect(effect: () => void | (() => void), deps: any[], delay: number) {
  useEffect(() => {
    const handler = setTimeout(() => {
      effect()
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [...deps, delay])
}

export default useDebounceEffect
