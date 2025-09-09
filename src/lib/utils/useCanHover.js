import { useEffect, useState } from 'react'

// Not every device has hover
// Checks if app can hover  to prevent unnecessary state updates

export default function useCanHover() {
  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    // Check if device can hover with media query
    const mq = window.matchMedia('(hover: hover)')

    // Define a function to update state based on media query
    const apply = () => setCanHover(mq.matches)

    // Apply run right away
    apply()

    // Add event listener for changes say they attach a mouse or something
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return canHover
}
