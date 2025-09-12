import { useContext } from 'react'
import { TransitionCtx } from './TransitionContext'

/** Hook to access transition context (safe for Fast Refresh) */
export default function useTransition() {
  return useContext(TransitionCtx)
}
