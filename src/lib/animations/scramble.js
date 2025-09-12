import { gsap } from '../gsapSetup'

export const scramble = (target, { text, duration = 1 } = {}) => {
  const textToAnimate = text || target.textContent || ''

  return gsap.to(target, {
    text,
    duration,
    scrambleText: {
      text: textToAnimate,
      chars: 'upperAndLowerCase',
      speed: 0.7,
      revealDelay: 0.2,
    },
  })
}

export const scrambleAll = (
  selector = '[data-scramble]',
  { duration = 1, ease = 'none', stagger = 0.04 } = {},
) => {
  const els = gsap.utils.toArray(selector)
  const tl = gsap.timeline()
  els.forEach((el, idx) => {
    tl.add(() => scramble(el, { duration, ease }), idx * stagger)
  })
  return tl
}

export function scrambleIn(el, { text, duration = 1, ease = 'none', chars = DEFAULT_CHARS } = {}) {
  const finalText = text ?? el.textContent ?? ''
  const len = finalText.length
  gsap.set(el, { whiteSpace: 'pre', opacity: 1, textContent: '\u00A0'.repeat(len) })

  const state = { i: 0 }
  return gsap.to(state, {
    i: len,
    duration,
    ease,
    onUpdate() {
      const i = Math.floor(state.i)
      const head = finalText.slice(0, i)
      const tailLen = Math.max(0, len - i)

      let scrambled = ''
      for (let k = 0; k < tailLen; k++) {
        scrambled += chars[(Math.random() * chars.length) | 0]
      }
      el.textContent = head + scrambled
    },
  })
}

export const scrambleInAll = (
  selector = '[data-in="scramble"]',
  { duration = 1, stagger = 0.04 } = {},
) => {
  const els = gsap.utils.toArray(selector)
  const tl = gsap.timeline()
  els.forEach((el, idx) => {
    tl.add(() => scrambleIn(el, { duration }), idx * stagger)
  })
  return tl
}

// Characters used while scrambling (tweak to taste)
// const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ89!@#$%^&*()_+-=<>?/'
const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
/**
 * Scramble text out. Returns a GSAP timeline (not a Promise).
 */
export function scrambleOut(
  el,
  {
    duration = 0.6,
    ease = 'power2.inOut',
    chars = DEFAULT_CHARS,
    preserveWidth = true,
    fade = true,
  } = {},
) {
  const source = el.dataset.text ?? el.textContent ?? ''
  console.log(source)
  const len = source.length

  gsap.set(el, { whiteSpace: 'pre' })
  const space = (n) => (preserveWidth ? '\u00A0'.repeat(n) : '')

  const state = { i: 0 }
  const tl = gsap.timeline()

  // Drive scrambling
  tl.to(
    state,
    {
      i: len,
      duration,
      ease,
      onUpdate() {
        const i = Math.floor(state.i)
        const tailLen = Math.max(0, len - i)

        let scrambled = ''
        for (let k = 0; k < tailLen; k++) {
          scrambled += chars[(Math.random() * chars.length) | 0]
        }
        el.textContent = space(i) + scrambled
      },
      onComplete() {
        el.textContent = preserveWidth ? '\u00A0'.repeat(len) : ''
      },
    },
    0,
  )

  // Optional fade (in parallel)
  if (fade) {
    tl.to(el, { opacity: 0, duration: Math.max(0.2, duration * 0.8), ease }, 0)
  }

  return tl // <- just return a timeline
}

/**
 * Scramble out all elements matching selector, with stagger.
 * Returns a timeline you can await with .then()
 */
export function scrambleOutAll(
  // selector = '[data-scramble-out]',
  { duration = 1, ease = 'none', chars = DEFAULT_CHARS } = {},
) {
  const els = gsap.utils.toArray('[data-scramble-out]')
  const tl = gsap.timeline()
  els.forEach((el) => {
    tl.add(() => scrambleOut(el, { duration, ease, chars }))
  })

  return tl
}
