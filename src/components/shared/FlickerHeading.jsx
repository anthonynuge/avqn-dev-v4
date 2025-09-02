import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export function FlickerHeading({ children, className = '' }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      // baseline fade in case CSS animation is skipped
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.9, ease: 'power2.out' })

      // random pulse flickers
      gsap.to(
        {},
        {
          duration: 1,
          repeat: 10,
          repeatDelay: () => gsap.utils.random(1, 10),
          onUpdate: () => {
            const p = gsap.utils.random(0.85, 1.2)
            el.style.textShadow = `
          0 0 .02em hsl(var(--accent)),
          0 0 ${0.08 * p}em hsl(var(--accent)),
          0 0 ${0.18 * p}em hsl(var(--accent)),
          0 0 ${0.38 * p}em hsl(var(--accent)),
          0 0 ${0.8 * p}em hsl(var(--accent-2))
        `
          },
        },
      )
    },
    { scope: ref },
  )

  return (
    <h1 ref={ref} className={`flicker-on ${className}`}>
      {children}
    </h1>
  )
}
