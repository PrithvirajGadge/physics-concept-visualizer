import { useState, useEffect } from 'react'

// useState wrapper that syncs its value to localStorage under `key`.
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage unavailable — fail silently
    }
  }, [key, value])

  return [value, setValue]
}
