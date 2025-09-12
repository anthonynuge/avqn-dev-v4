// ExamplePage.jsx
import React, { useRef } from 'react'
import { useGSAP } from '../../lib/gsapSetup'
import { scrambleInAll, scrambleOutAll, scrambleAll } from '../../lib/animations/scramble'

export default function ExamplePage() {
  const scope = useRef(null)

  // set up a gsap context tied to this scope
  const { contextSafe } = useGSAP(
    () => {
      // nothing runs immediately here (unless you want an auto animation on mount)
      scrambleInAll('[data-scramble]', { duration: 0.8, stagger: 0.05 })
    },
    { scope },
  )

  const handleExit = contextSafe(async () => {
    // contextSafe wraps in the gsap.context, so selectors are scoped & cleanup is automatic
    await scrambleOutAll('[data-scramble]', { duration: 0.8, stagger: 0.05 }).then()
  })

  const handleEnter = contextSafe(async () => {
    await scrambleAll('[data-scramble]', { duration: 0.8, stagger: 0.05 }).then()
  })

  return (
    <div ref={scope} className="space-y-4 p-8">
      <h1 data-scramble className="font-mono text-3xl font-bold whitespace-pre">
        scramble
      </h1>
      <h2 data-scramble className="font-mono text-xl whitespace-pre">
        another line to scramble
      </h2>

      <div className="flex gap-2">
        <button onClick={handleExit} className="rounded border px-3 py-1 text-sm">
          Test Scramble Out
        </button>
        <button onClick={handleEnter} className="rounded border px-3 py-1 text-sm">
          Test Scramble In
        </button>
      </div>
    </div>
  )
}
