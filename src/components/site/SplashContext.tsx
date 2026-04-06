import { createContext, useCallback, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface SplashContextValue {
  /** True once the splash dismiss has been triggered (header should become visible). */
  done: boolean
  /** True after the layoutId morph has fully settled (header can drop layoutId). */
  settled: boolean
  markDone: () => void
  markSettled: () => void
}

const SplashContext = createContext<SplashContextValue | null>(null)

export function SplashProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false)
  const [settled, setSettled] = useState(false)
  const markDone = useCallback(() => setDone(true), [])
  const markSettled = useCallback(() => setSettled(true), [])
  return (
    <SplashContext.Provider value={{ done, settled, markDone, markSettled }}>
      {children}
    </SplashContext.Provider>
  )
}

export function useSplash() {
  const ctx = useContext(SplashContext)
  if (!ctx) throw new Error('useSplash must be used within SplashProvider')
  return ctx
}
