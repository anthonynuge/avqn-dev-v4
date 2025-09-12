import { useEffect } from 'react'
import useTransition from './useTransition'

/**
 * usePageExit(exitFn)
 * exitFn must be a function that returns a Promise.
 * This hook registers the exit when the component mounts,
 * and unregisters it when the component unmounts.
 */
export default function usePageExit(exitFn) {
  const { setExit } = useTransition()

  useEffect(() => {
    if (typeof exitFn !== 'function') return
    const unregister = setExit(exitFn) // register
    return unregister // unregister on unmount
  }, [exitFn, setExit])
}
