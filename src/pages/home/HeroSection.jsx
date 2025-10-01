import { useRef, useCallback } from 'react'
import { scrambleOut, scrambleInAll } from '../../lib/animations/scramble'
import { flicker } from '../../lib/animations/flicker'
import usePageExit from '../../transition/usePageExit'
import { useGSAP, gsap } from '../../lib/gsapSetup'
import FeaturedSlider from '@/components/AnimatedCarousel/FeaturedSlider'
import SocialLinks from '../../components/shared/SocialLinks'

const HeroSection = () => {
  const scope = useRef(null)
  const sliderRef = useRef(null)

  // Entry animation — runs on mount, auto-reverts on unmount
  useGSAP(
    () => {
      const q = (sel) => scope.current.querySelectorAll(sel)

      // 1) Hide everything marked for entry right away (prevents FOUC)
      gsap.set(q('[data-in]'), { autoAlpha: 0 })
      // Token-aware selectors
      const flickerItems = q('[data-in~="flicker"]')
      const fadeItems = q('[data-in~="fade"]')
      const scrambleItems = q('[data-in~="scramble"]')

      const tl = gsap.timeline({ delay: 1 })
      tl.add('in')

      // 2) Reveal + animate flicker group
      if (flickerItems.length) {
        tl.set(flickerItems, { autoAlpha: 1 }, 'in') // reveal at label
        tl.add(flicker(flickerItems, { duration: 1, stagger: 0.4 }), 'in')
      }

      // 3) Reveal + animate scramble group
      if (scrambleItems.length) {
        // tl.set(scrambleItems, { autoAlpha: 1 }, 'in+=1') // tiny offset if you want
        tl.add(scrambleInAll(scrambleItems, { duration: 1, stagger: 0.05 }), '>')
      }
      if (fadeItems.length) {
        tl.add(gsap.to(fadeItems, { autoAlpha: 1, duration: 0.9, stagger: 0.05 }), 'in+=1.9')
      }
      tl.add(() => sliderRef.current.playEnter(), 'in+=1.9')
    },
    { scope: scope },
  )

  // Exit animation — runs on unmount
  const exitFn = useCallback(() => {
    const root = scope.current
    if (!root) return Promise.resolve()

    const items = Array.from(root.querySelectorAll('[data-out="scramble"]'))
    const links = Array.from(root.querySelectorAll('[data-out="fade"]'))

    if (!items.length && !links.length) return Promise.resolve()
    return new Promise((resolve) => {
      const tl = gsap.timeline({ onComplete: resolve })
      Array.from(items).forEach((item, i) => {
        tl.add(scrambleOut(item, { duration: 0.8, fade: true }), i * 0.05)
      })

      tl.to(links, { autoAlpha: 0, duration: 0.9, ease: 'power2.inOut' }, 0)
    })
  }, [])

  usePageExit(exitFn)

  return (
    <section className="inner hero-grid" ref={scope}>
      <div className="hero-header">
        <div className="text-display relative top-1 md:w-[1/2vw]">
          <h1 className="">
            <span data-in="flicker" data-out="scramble" data-text="Anthony Nguyen">
              Anthony Nguyen
            </span>
          </h1>
          <h2 className="mb-1">
            <span data-in="flicker" data-out="scramble" data-text="Full-Stack Developer">
              Full-Stack Developer
            </span>
          </h2>
        </div>
      </div>

      <p
        className="text-caption-1 hero-intro"
        data-in="scramble"
        data-out="scramble"
        data-text="Anthony Viet Quoc Nguyen is a creative full-stack developer building interactive websites with smooth motion and clean design. Available remotely, based in Houston."
      >
        Anthony Viet Quoc Nguyen is a creative full-stack developer building interactive websites
        with smooth motion and clean design. Available remotely, based in Houston.
      </p>

      <div className="hero-specs">
        {/* Skills */}
        <div className="hero-specs-item">
          <h3
            className="text-accent text-caption-title font-mono uppercase"
            data-in="flicker"
            data-out="scramble"
            data-text="Skills"
          >
            Skills
          </h3>
          <ul className="text-caption-3">
            <li data-in="scramble" data-out="scramble" data-text="TypeScript">
              TypeScript
            </li>
            <li data-in="scramble" data-out="scramble" data-text="React">
              React
            </li>
            <li data-in="scramble" data-out="scramble" data-text="Next.js">
              Next.js
            </li>
            <li data-in="scramble" data-out="scramble" data-text="Java">
              Java
            </li>
            <li data-in="scramble" data-out="scramble" data-text="Node.js">
              Node.js
            </li>
          </ul>
        </div>

        {/* Experience */}
        <div className="hero-specs-item">
          <h3
            className="text-accent text-caption-title font-mono uppercase"
            data-in="flicker"
            data-out="scramble"
            data-text="Experience"
          >
            Experience
          </h3>
          <ul className="text-caption-3">
            <li data-in="scramble" data-out="scramble" data-text="Since 2020">
              Since 2020
            </li>
          </ul>
        </div>

        {/* Currently */}
        <div className="hero-specs-item">
          <h3
            className="text-accent text-caption-title font-mono uppercase"
            data-in="flicker"
            data-out="scramble"
            data-text="Currently"
          >
            Currently
          </h3>
          <ul className="text-caption-3">
            <li data-in="scramble" data-out="scramble" data-text="Software Developer">
              Software Developer
            </li>
            <li data-in="scramble" data-out="scramble" data-text="@ National Grid X">
              @ National Grid X
            </li>
          </ul>
        </div>
      </div>

      <div className="hero-links">
        <SocialLinks />
      </div>

      <div className="hero-featured relative" data-out="fade">
        <div className="absolute inset-0">
          <FeaturedSlider ref={sliderRef} />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
