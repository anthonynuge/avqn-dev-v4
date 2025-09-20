// ExamplePage.jsx
import React, { useRef } from 'react'

export default function ExamplePage() {
  const scope = useRef(null)

  // set up a gsap context tied to this scope
  return (
    <div ref={scope} className="space-y-4 p-8">
      <h1 data-scramble className="font-mono text-3xl font-bold whitespace-pre">
        scramble
      </h1>
      <h2 data-scramble className="font-mono text-xl whitespace-pre">
        another line to scramble
      </h2>

      <div className="flex gap-2">
        <button className="rounded border px-3 py-1 text-sm">Test Scramble Out</button>
        <button className="rounded border px-3 py-1 text-sm">Test Scramble In</button>
      </div>
    </div>
  )
}
