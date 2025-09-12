import { useRef } from 'react'
import { useNavigate } from 'react-router'
import { useCallback } from 'react'
import { TransitionCtx } from './TransitionContext'

/**
 * Exit functions return a Promise that resolves when the animation is done.
 * Multiple components (page + sections) can register exits; we run them in parallel.
 */

export function TransitionProvider({ children }) {
  const navigate = useNavigate()
  const exitsRef = useRef(new Set()) // stores exit functions
  const busyRef = useRef(false) // prevent double trigger

  /** Register an exit; returns an unregister fn for convenience */
  const setExit = useCallback((fnOrNull) => {
    if (!fnOrNull) return () => {}
    exitsRef.current.add(fnOrNull)
    return () => exitsRef.current.delete(fnOrNull)
  }, [])

  /** Run all exits in parallel, but don’t fail the nav if one rejects */
  const runAllExits = useCallback(async () => {
    const tasks = Array.from(exitsRef.current).map((fn) => {
      try {
        return Promise.resolve(fn())
      } catch {
        return Promise.resolve()
      }
    })
    await Promise.all(tasks)
  }, [])

  /** Public navigation entry: await exits → navigate */
  const transitionTo = useCallback(
    async (to, options) => {
      if (busyRef.current) return
      busyRef.current = true
      try {
        await runAllExits()
      } finally {
        navigate(to, options)
        busyRef.current = false
      }
    },
    [navigate, runAllExits],
  )

  return (
    <TransitionCtx.Provider
      value={{
        setExit,
        transitionTo,
        isTransitioning: busyRef.current,
      }}
    >
      {children}
    </TransitionCtx.Provider>
  )
}
