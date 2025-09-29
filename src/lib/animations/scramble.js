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

export function scrambleIn(el, { duration = 1, ease = 'power2.inOut', fade = true } = {}) {
  const text = el.dataset.text ?? el.textContent ?? ''
  const tl = gsap.timeline()
  if (fade) tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration, ease }, 0)
  tl.to(
    el,
    {
      duration,
      ease,
      scrambleText: {
        text,
        chars: 'upperAndLowerCase',
        speed: 0.6,
        revealDelay: 0.2,
      },
    },
    0,
  )
  return tl
}

export function scrambleInAll(targets, { stagger = 0.05, ...opts } = {}) {
  const els = Array.from(targets)
  const tl = gsap.timeline()
  els.forEach((el, idx) => tl.add(scrambleIn(el, opts), idx * stagger))
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
    tl.to(el, { opacity: 0, duration: Math.max(0.2, duration * 0.9), ease }, 0)
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

function lockWidth(el) {
  const { width } = el.getBoundingClientRect()
  if (width) {
    el.style.minWidth = `${width}px`
    return () => {
      el.style.minWidth = ''
    }
  }
  return () => {}
}

const getFinalText = (el) => el?.getAttribute?.('data-text') ?? el?.textContent ?? ''

/**
 * Scramble in place safely — no layout jumps.
 */
export function scrambleSafe(
  el,
  {
    duration = 0.8,
    ease = 'power2.out',
    chars = 'upperAndLowerCase',
    speed = 0.5,
    revealDelay = 0.05,
    fade = true,
  } = {},
) {
  const text = getFinalText(el)
  const unlock = lockWidth(el)

  const tl = gsap.timeline({
    onComplete: unlock,
  })

  if (fade) {
    tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease }, 0)
  }

  tl.to(
    el,
    {
      duration,
      ease,
      scrambleText: { text, chars, speed, revealDelay },
    },
    0,
  )

  return tl
}

/**
 * Multiple safe scrambles with stagger.
 */
export function scrambleInSafe(targets, { stagger = 0.05, ...opts } = {}) {
  const els = Array.isArray(targets) ? targets : gsap.utils.toArray(targets)
  const tl = gsap.timeline()
  els.forEach((el, idx) => tl.add(scrambleSafe(el, opts), idx * stagger))
  return tl
}

/**
 * Scramble out safely (clear text but preserve width).
 */
export function scrambleOutSafe(
  el,
  { duration = 0.6, ease = 'power2.inOut', chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', fade = true } = {},
) {
  const source = getFinalText(el)
  const len = source.length
  const nbsp = '\u00A0'

  const state = { i: 0 }
  const unlock = lockWidth(el)

  const tl = gsap.timeline({
    onComplete: unlock,
  })

  // Drive scrambling out
  tl.to(
    state,
    {
      i: len,
      duration,
      ease,
      onUpdate() {
        const i = state.i | 0
        const tailLen = Math.max(0, len - i)

        let scrambled = ''
        for (let k = 0; k < tailLen; k++) {
          scrambled += chars[(Math.random() * chars.length) | 0]
        }
        el.textContent = nbsp.repeat(i) + scrambled
      },
      onComplete() {
        el.textContent = nbsp.repeat(len) // preserve final width
      },
    },
    0,
  )

  if (fade) {
    tl.to(el, { autoAlpha: 0, duration: Math.max(0.2, duration * 0.8), ease }, 0)
  }

  return tl
}
