import { gsap } from '../gsapSetup'

export const decodeTween = (target, { text, duration = 1 } = {}) => {
  // Get the text to animate - use the provided text or fallback to textContent
  const textToAnimate = text || target.textContent || ''

  // Set initial state - make text invisible but preserve layout
  gsap.set(target, {
    opacity: 0,
    // Use visibility hidden to maintain layout but hide content
    visibility: 'hidden',
  })

  return gsap.to(target, {
    opacity: 1,
    visibility: 'visible',
    duration,
    scrambleText: {
      text: textToAnimate,
      chars: 'upperAndLowerCase',
      speed: 0.7,
      revealDelay: 0.2,
    },
  })
}
