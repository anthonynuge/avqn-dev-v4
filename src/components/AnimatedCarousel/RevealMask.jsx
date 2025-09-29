// IntroSliceMask.jsx (RevealMask)
import React, { useMemo, useRef, forwardRef, useImperativeHandle } from 'react'
import { gsap } from '@/lib/gsapSetup'
import { useGSAP } from '@/lib/gsapSetup'

const RevealMask = forwardRef(function RevealMask(
  { slices = 20, onDone, colorClass = 'bg-bg' },
  ref,
) {
  const rootRef = useRef(null)
  const tlRef = useRef(null)
  const items = useMemo(() => Array.from({ length: slices }, (_, i) => i), [slices])

  // prepare strips once (no autoplay)
  useGSAP(() => {
    const root = rootRef.current
    if (!root) return
    const strips = root.querySelectorAll('[data-strip]')
    gsap.set(strips, {
      clipPath: 'inset(0% 0% 0% 0%)',
      willChange: 'clip-path',
      backfaceVisibility: 'hidden',
      contain: 'paint',
    })
    return () => tlRef.current?.kill()
  }, [])

  // build a paused TL we can reuse
  const buildTimeline = () => {
    const root = rootRef.current
    if (!root) return gsap.timeline({ paused: true })
    const strips = root.querySelectorAll('[data-strip]')
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'power2.out', duration: 0.45 },
      onComplete: () => {
        onDone?.()
        // optionally hide & clean hints to avoid keeping will-change on
        gsap.set(root, { autoAlpha: 0, clearProps: 'willChange' })
      },
    })
    return tl.to(strips, {
      clipPath: 'inset(0% 100% 0% 0%)',
      stagger: { each: 0.05, from: 0 },
    })
  }

  useImperativeHandle(ref, () => ({
    play(opts = {}) {
      tlRef.current?.kill()
      tlRef.current = buildTimeline()
      if (opts.duration) tlRef.current.duration(opts.duration)
      tlRef.current.play(0)
      return tlRef.current
    },
    timeline() {
      // gives parent a paused TL to nest into its own
      return buildTimeline()
    },
    reset() {
      tlRef.current?.kill()
      tlRef.current = null
      const root = rootRef.current
      if (root) gsap.set(root.querySelectorAll('[data-strip]'), { clipPath: 'inset(0% 0% 0% 0%)' })
      gsap.set(root, { autoAlpha: 1 })
    },
  }))

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
            width: `calc(${100 / slices}% + 2px)`,
            height: '100%',
            marginLeft: i === 0 ? 0 : -1,
          }}
        />
      ))}
    </div>
  )
})

export default RevealMask
