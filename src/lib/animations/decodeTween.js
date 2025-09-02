import { gsap } from '../gsapSetup'

export const decodeTween = (target, { text, duration = 1 } = {}) => {
  gsap.set(target, { opacity: 0, text: '' })

  return gsap.to(target, {
    opacity: 1,
    duration,
    scrambleText: {
      text,
      chars: 'upperAndLowerCase',
      speed: 0.7,
      revealDelay: 0.2,
    },
  })
}
