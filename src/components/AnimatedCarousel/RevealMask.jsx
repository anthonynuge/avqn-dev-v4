// path: src/components/AnimatedCarousel/IntroSliceMask.jsx
import React, { useMemo, useRef } from 'react'
import { gsap } from '@/lib/gsapSetup'
import { useGSAP } from '@/lib/gsapSetup'

export default function RevealMask({ slices = 20, onDone, delay = 0, colorClass = 'bg-bg' }) {
  const rootRef = useRef(null)

  // [0..slices-1]
  const items = useMemo(() => Array.from({ length: slices }, (_, i) => i), [slices])

  useGSAP(() => {
    if (!rootRef.current) return
    const strips = rootRef.current.querySelectorAll('[data-strip]')

    // No transforms — start fully visible and clip away from right side.
    gsap.set(strips, {
      clipPath: 'inset(0% 0% 0% 0%)',
      willChange: 'clip-path',
      backfaceVisibility: 'hidden',
      contain: 'paint', // isolate repaints for better perf
    })

    const tl = gsap.timeline({
      delay,
      defaults: { ease: 'power2.out', duration: 0.45 },
      onComplete: () => onDone?.(),
    })

    // Stagger each strip to “wipe” left→right by clipping the right edge to 100%
    tl.to(strips, {
      clipPath: 'inset(0% 100% 0% 0%)',
      stagger: { each: 0.05, from: 0 },
    })

    return () => tl.kill()
  }, [])

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-20 flex overflow-hidden"
      aria-hidden
    >
      {items.map((i) => (
        <div
          key={i}
          data-strip
          className={colorClass}
          style={{
            flex: '0 0 auto',
            // Small overscan + negative margin keeps slices tightly butted
            // even with fractional widths—no visible seams.
            width: `calc(${100 / slices}% + 2px)`,
            height: '100%',
            marginLeft: i === 0 ? 0 : -1,
          }}
        />
      ))}
    </div>
  )
}
