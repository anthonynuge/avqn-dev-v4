import { createContext } from 'react'

/**
 * Context to manage page transitions and exit functions
 */
export const TransitionCtx = createContext({
  setExit: () => {}, // register/unregister an exit
  transitionTo: async () => {}, // navigate after exits
  isTransitioning: false,
})
