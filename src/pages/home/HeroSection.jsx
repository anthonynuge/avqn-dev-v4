import { useGSAP, gsap } from '../../lib/gsapSetup'
import ShatterImageHover from './ShatterImageHover'
import { useRef } from 'react'
import { decodeTween } from '../../lib/animations/decodeTween'
import { flickerTween } from '../../lib/animations/flickerTween'

const HeroSection = () => {
  const ref = useRef(null)

  useGSAP(
    () => {
      const root = ref.current
      const wrap = root.querySelector('[data-role="ghost"]')?.parentElement
      const decodes = Array.from(root.querySelectorAll('[data-animate="decode"]'))
      const ghost = wrap.querySelector('[data-role="ghost"]')
      const live = wrap.querySelector('[data-role="live"]')
      const finalText = ghost.textContent

      const heads = root.querySelectorAll('[data-animate="flicker"]')
      const tl = gsap.timeline({
        defaults: {
          ease: 'power2.out',
        },
      })

      tl.add('headerPhase')
      heads.forEach((el, i) => {
        tl.add(
          flickerTween(el, { duration: 1.2, blips: 5, jitterGlow: true }),
          i === 0 ? 0.5 : '<+0.12', // control simultaneous vs stagger here
        )
      })
      tl.add('decodePhase')
      tl.add(decodeTween(live, { text: finalText, duration: 3 }), 'decodePhase')
      for (const decode of decodes) {
        tl.add(decodeTween(decode, { text: decode.textContent, duration: 2 }), 'decodePhase')
      }
    },
    { scope: ref },
  )

  return (
    <section className="inner fill-offset grid-12 relative md:grid-rows-4" ref={ref}>
      <div className="col-span-12 place-self-center md:col-span-6 md:row-span-4 md:grid md:grid-cols-subgrid md:grid-rows-subgrid">
        {/* Name and title */}
        <div className="md:col-span-5 md:row-span-2 md:row-start-3 md:self-end">
          <h1 className="text-display-1 md:grid-row-start-3 md:col-span-6 md:row-start-3">
            <span data-animate="flicker">Anthony Nguyen</span>
          </h1>
          <h2 className="text-display-1 mb-1 md:col-span-4 md:row-start-2">
            <span data-animate="flicker">Full-Stack Developer</span>
          </h2>
        </div>
        {/* Intro text */}
        <div className="relative md:col-span-3 md:col-start-2 md:row-start-1 md:self-end">
          {/* GHOST SIZER — reserves space with the final copy */}
          <p className="text-caption-1 invisible select-none" aria-hidden="true" data-role="ghost">
            Anthony Viet Quoc Nguyen is a creative full-stack developer building interactive
            websites with smooth motion and clean design. Available remotely, based in Houston.
          </p>

          {/* LIVE LAYER — animates on top, starts blank/hidden */}
          <p
            className="text-caption-1 absolute inset-0 opacity-0"
            data-role="live"
            aria-label="Anthony Viet Quoc Nguyen is a creative full-stack developer building interactive websites
    with smooth motion and clean design. Available remotely, based in Houston."
          />
        </div>
      </div>

      <div className="col-span-full grid grid-cols-subgrid md:col-span-6">
        <div>
          <h3 className="text-accent font-mono uppercase" data-animate="flicker">
            Skills
          </h3>
          <ul className="text-caption-2">
            <li data-animate="decode">TypeScript</li>
            <li data-animate="decode">React</li>
            <li data-animate="decode">Next.js</li>
            <li data-animate="decode">Java</li>
            <li data-animate="decode">Node.js</li>
          </ul>
        </div>
        <div>
          <h3 className="text-accent font-mono uppercase" data-animate="flicker">
            Experience
          </h3>
          <ul className="text-caption-2">
            <li data-animate="decode">Since 2020</li>
          </ul>
        </div>
        <div>
          <h3 className="text-accent font-mono uppercase" data-animate="flicker">
            Currently
          </h3>
          <ul className="text-caption-2">
            <li data-animate="decode" className="opacity-0">
              // Software Developer <br />
              National Grid X
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-accent col-span-full aspect-square h-full self-center md:col-span-6 md:col-start-7 md:row-span-2 md:row-start-2 md:aspect-auto md:h-64 md:w-full">
        <ShatterImageHover src="/images/abstract-bg.jpg" className="bg-bg h-full w-full" />
      </div>
    </section>
  )
}

export default HeroSection
