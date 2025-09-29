// path: src/lib/animations/flicker.js
import { gsap } from '../gsapSetup'

/**
 * Spaceship boot flicker for headings/paragraphs.
 * Now uses autoAlpha so visibility is handled (prevents hidden-but-opaque issue).
 */
export function flicker(
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
  if (!target) return gsap.timeline()

  // Reduced motion: simple fade in (still respects autoAlpha)
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    return gsap
      .timeline()
      .fromTo(
        target,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: Math.max(boot, 0.3),
          ease: 'power2.out',
          clearProps: 'visibility',
        },
      )
  }

  const tl = gsap.timeline()

  // Prep compositing for smoother flicker; cleared at the end.
  gsap.set(target, { willChange: 'opacity, filter' })

  // Power-on: bright + blur -> crisp, and ensure visibility flips on
  tl.fromTo(
    target,
    { autoAlpha: 0, filter: `brightness(${surge}) blur(${blur}px)` },
    { autoAlpha: 1, filter: 'brightness(1) blur(0px)', duration: boot, ease: 'power2.out' },
  )

  // Random micro-blips during the window
  for (let i = 0; i < blips; i++) {
    const at = gsap.utils.random(boot * 0.2, Math.max(duration - 0.1, boot))
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

  // Settle clean: visible, no filters, drop perf hints
  tl.to(
    target,
    {
      autoAlpha: 1,
      filter: 'none',
      duration: 0.2,
      clearProps: 'filter,willChange,visibility', // keep opacity as-is; remove visibility override
    },
    duration,
  )

  return tl
}
