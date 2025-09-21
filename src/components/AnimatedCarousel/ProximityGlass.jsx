import React, { useRef, useMemo } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

/**
 * ProximityGlassImageZoom
 * Zooms & stretches the background image per-slice based on cursor proximity.
 *
 * Usage:
 * <ProximityGlassImageZoom src="/images/hero-slide-1.jpg" height="30dvh" slices={20} />
 */
export default function ProximityGlass({
  src,
  slices = 20,
  height = '30dvh',
  sigma = 12, // falloff width (%)
  strength = {}, // { zoomPct, stretchXPct, bgPushPct, blurPx, contrastPush }
  className = '',
  style = {},
  revealKey,
  enterFrom = 'left', // right or left
  revealOnMount = true,
  interactive = true,
}) {
  const ref = useRef(null)

  const S = useMemo(
    () => ({
      zoomPct: 10, // overall zoom near cursor (adds to 100%)
      stretchXPct: 8, // extra horizontal stretch near cursor
      bgPushPct: 6, // how much bg position is pulled toward cursor
      blurPx: 0.9, // subtle blur for “glass”
      contrastPush: 0.03, // gentle contrast pop
      ...strength,
    }),
    [strength],
  )

  useGSAP(
    () => {
      const hero = ref.current
      if (!hero) return

      const masks = hero.querySelectorAll('.pgz-mask')
      const sliceCount = masks.length || slices
      const step = 100 / sliceCount

      // Initialize columns
      gsap.set(masks, {
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '102% 102%',
        backgroundPosition: (i) => `${(i * 100) / (sliceCount - 1)}% 50%`,
        clipPath: (i) => {
          const x1 = i * step
          const x2 = (i + 1) * step
          return `polygon(${x2}% 0, ${x1}% 0, ${x1}% 100%, ${x2}% 100%)`
        },
        willChange: 'filter, background-position, background-size',
        pointerEvents: 'none',
        filter: 'none',
      })

      const fromClipRight = (i) => {
        const x2 = (i + 1) * step
        return `polygon(${x2}% 0, ${x2}% 0, ${x2}% 100%, ${x2}% 100%)`
      }
      const fromClipLeft = (i) => {
        const x1 = i * step
        return `polygon(${x1}% 0, ${x1}% 0, ${x1}% 100%, ${x1}% 100%)`
      }
      const toClip = (i) => {
        const x1 = i * step
        const x2 = (i + 1) * step
        return `polygon(${x2}% 0, ${x1}% 0, ${x1}% 100%, ${x2}% 100%)`
      }

      // Optional entrance reveal
      if (revealOnMount) {
        const startFromLeft = enterFrom === 'left'
        gsap.fromTo(
          masks,
          {
            clipPath: (i) => (startFromLeft ? fromClipLeft(i) : fromClipRight(i)),
            opacity: 0,
          },
          {
            clipPath: (i) => toClip(i),
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: {
              each: 0.04,
              from: startFromLeft ? 'start' : 'end', // controls wave direction
            },
            delay: 0.5,
          },
        )
      }

      // const STAGGER = 0.04
      // const REVEAL_DELAY = 0.5 // match your old 500ms delay

      // collapsed-at-right-edge for each slice (x2)
      // const fromClip = (i) => {
      //   // const x1 = i * step
      //   const x2 = (i + 1) * step
      //   return `polygon(${x2}% 0, ${x2}% 0, ${x2}% 100%, ${x2}% 100%)`
      // }

      // full slice polygon (your normal target)
      // const toClip = (i) => {
      //   const x1 = i * step
      //   const x2 = (i + 1) * step
      //   return `polygon(${x2}% 0, ${x1}% 0, ${x1}% 100%, ${x2}% 100%)`
      // }

      // gsap.fromTo(
      //   masks,
      //   {
      //     // Start collapsed at right edge and hidden
      //     clipPath: (_, i) => fromClip(i),
      //     opacity: 0,
      //   },
      //   {
      //     clipPath: (_, i) => toClip(i),
      //     opacity: 1,
      //     duration: 0.8,
      //     ease: 'power3.out',
      //     stagger: { each: STAGGER, from: 'start' }, // play right → left
      //     delay: REVEAL_DELAY,
      //     onComplete: () => {
      //       isRevealing = false
      //     },
      //   },
      // )

      // Quick setters
      const setBgX = Array.from(masks, (m) => gsap.quickSetter(m, 'backgroundPositionX'))
      const setBgY = Array.from(masks, (m) => gsap.quickSetter(m, 'backgroundPositionY'))
      const setBgSz = Array.from(masks, (m) => gsap.quickSetter(m, 'backgroundSize'))
      const setFilt = Array.from(masks, (m) => gsap.quickSetter(m, 'filter'))

      // Pre-calc
      const centers = Array.from({ length: sliceCount }, (_, i) => (i + 0.5) * step)
      const baseBgX = centers.map((c) => `${c}%`)
      const baseBgY = '50%'

      let raf = null
      let cursorPctX = 50
      const gaussian = (d) => Math.exp(-(d * d) / (2 * sigma * sigma)) // 0..1

      const render = () => {
        for (let i = 0; i < sliceCount; i++) {
          const center = centers[i]
          const d = Math.abs(cursorPctX - center)
          const influence = gaussian(d)

          // Target sizes (percentages)
          const zoom = 100 + influence * S.zoomPct // base zoom
          const zoomX = zoom + influence * S.stretchXPct // extra horizontal stretch
          const zoomY = zoom // keep vertical closer to base for “refracted” feel

          // Pull background toward cursor so the zoom feels anchored near the pointer
          const towardCursor = cursorPctX - center // signed delta in %
          const pull = influence * S.bgPushPct * (towardCursor / (step * 2)) // normalize per-slice width a bit
          const bgX = `calc(${baseBgX[i]} + ${pull}%)`

          // Vertical stays centered; you can map to cursor Y if desired later
          const bgY = baseBgY

          // Glassy filter
          const blur = influence * S.blurPx
          const contrast = 1 + influence * S.contrastPush
          const filt =
            blur > 0.01 ? `blur(${blur}px) contrast(${contrast})` : `contrast(${contrast})`

          setBgX[i](bgX)
          setBgY[i](bgY)
          setBgSz[i](`${zoomX}% ${zoomY}%`)
          setFilt[i](filt)
        }
        raf = null
      }

      const queueRender = () => {
        if (!raf) raf = requestAnimationFrame(render)
      }

      const onMove = (e) => {
        if (!interactive) return
        const rect = hero.getBoundingClientRect()
        cursorPctX = ((e.clientX - rect.left) / rect.width) * 100
        queueRender()
      }

      const easeBack = () => {
        if (!interactive) return
        // Return to base state
        masks.forEach((m, i) => {
          gsap.to(m, {
            backgroundPositionX: baseBgX[i],
            backgroundPositionY: baseBgY,
            backgroundSize: '102% 102%',
            filter: 'none',
            duration: 0.45,
            ease: 'power2.out',
          })
        })
      }

      hero.addEventListener('pointermove', onMove)
      hero.addEventListener('pointerleave', easeBack)

      return () => {
        hero.removeEventListener('pointermove', onMove)
        hero.removeEventListener('pointerleave', easeBack)
        if (raf) cancelAnimationFrame(raf)
      }
    },
    { dependencies: [src, slices, sigma, S, revealKey, enterFrom, revealOnMount, interactive] },
  )

  return (
    <div
      ref={ref}
      className={`pgz-hero ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height,
        overflow: 'hidden',
        ...style,
      }}
      aria-hidden
    >
      {Array.from({ length: slices }).map((_, i) => (
        <div key={i} className="pgz-mask" />
      ))}
    </div>
  )
}
