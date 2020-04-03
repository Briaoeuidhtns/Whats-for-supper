import { useEffect, useRef, useState } from 'react'

import { tuple } from './types/misc'

const getSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
})

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    const handleResize = () => setWindowSize(getSize())

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

export const useElSize = <T extends HTMLElement>() => {
  const ref = useRef<T>(null)
  const [bounds, setBounds] = useState<DOMRectReadOnly>()

  const [ro] = useState(
    () =>
      (typeof ResizeObserver !== 'undefined' || undefined) &&
      new ResizeObserver(([entry]) => setBounds(entry.contentRect))
  )

  useEffect(() => {
    if (ref.current) ro?.observe(ref.current)
    return () => ro?.disconnect()
  }, [ro])

  return tuple({ ref }, bounds)
}
