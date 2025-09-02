// src/lib/flickerTween.js
import { gsap } from '../gsapSetup'

/**
 * Spaceship boot flicker for headings.
 * - Boot surge: fade in from bright+blur to crisp
 * - Random blips: brief dim/bright hiccups
 */
export function flickerTween(
  target,
  {
    boot = 0.6, // seconds for the initial power-on
    duration = 1.4, // total time window for blips
    blips = 6, // how many random flickers
    blur = 0.8, // px blur at boot
    surge = 1.5, // brightness at boot
    jitterGlow = true, // tiny surge on blips
  } = {},
) {
  //   if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
  //     gsap.set(target, { opacity: 1, filter: 'none' })
  //     return gsap.delayedCall(0, () => {})
  //   }

  const tl = gsap.timeline()

  // Power-on: from bright + blur to crisp
  tl.fromTo(
    target,
    { opacity: 0, filter: `brightness(${surge}) blur(${blur}px)` },
    { opacity: 1, filter: 'brightness(1) blur(0px)', duration: boot, ease: 'power2.out' },
  )

  // Random micro-blips during the first couple seconds
  for (let i = 0; i < blips; i++) {
    const at = gsap.utils.random(boot * 0.2, duration - 0.1)
    const low = gsap.utils.random(0.25, 0.7)

    // dip opacity briefly, yoyo back
    tl.to(
      target,
      { opacity: low, duration: 0.045, yoyo: true, repeat: 1, ease: 'power1.inOut' },
      at,
    )

    // optional tiny brightness surge
    if (jitterGlow) {
      tl.to(
        target,
        { filter: 'brightness(1.25)', duration: 0.03, yoyo: true, repeat: 1 },
        at - 0.01,
      )
    }
  }

  // settle clean
  tl.to(target, { opacity: 1, filter: 'none', duration: 0.2 }, duration)

  return tl
}
