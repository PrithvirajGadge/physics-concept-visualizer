import { useRef, useCallback, useEffect } from 'react'

// Calls callback(deltaTimeSeconds) every animation frame via requestAnimationFrame.
// Supports pause/resume without tearing down the loop's elapsed-time base.
export function useAnimationFrame(callback) {
  const requestRef = useRef(null)
  const previousTimeRef = useRef(null)
  const runningRef = useRef(false)
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  const tick = useCallback((time) => {
    if (!runningRef.current) return
    if (previousTimeRef.current != null) {
      const dt = (time - previousTimeRef.current) / 1000
      callbackRef.current(dt)
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(tick)
  }, [])

  const start = useCallback(() => {
    if (runningRef.current) return
    runningRef.current = true
    previousTimeRef.current = null
    requestRef.current = requestAnimationFrame(tick)
  }, [tick])

  const stop = useCallback(() => {
    runningRef.current = false
    if (requestRef.current) cancelAnimationFrame(requestRef.current)
    previousTimeRef.current = null
  }, [])

  const pause = useCallback(() => {
    runningRef.current = false
    if (requestRef.current) cancelAnimationFrame(requestRef.current)
  }, [])

  const resume = useCallback(() => {
    if (runningRef.current) return
    runningRef.current = true
    previousTimeRef.current = null
    requestRef.current = requestAnimationFrame(tick)
  }, [tick])

  useEffect(() => () => stop(), [stop])

  return { start, stop, pause, resume, isRunning: () => runningRef.current }
}
