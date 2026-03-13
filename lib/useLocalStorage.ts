"use client"

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Always start with initialValue — matches server render exactly, no hydration mismatch
  const [value, setValue] = useState<T>(initialValue)
  const [hydrated, setHydrated] = useState(false)

  // After mount, sync from localStorage (client only)
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key)
      if (stored !== null) setValue(JSON.parse(stored) as T)
    } catch {
      // storage unavailable or parse error — keep initialValue
    }
    setHydrated(true)
  }, [key])

  // Persist to localStorage whenever value changes (after hydration only)
  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage unavailable
    }
  }, [key, value, hydrated])

  return [value, setValue] as const
}