import { useGSAP, gsap } from '../../lib/gsapSetup'
import ShatterImageHover from './ShatterImageHover'
import { useRef } from 'react'
import { decodeTween } from '../../lib/animations/decodeTween'
import { flickerTween } from '../../lib/animations/flickerTween'

const HeroSection = () => {
  const ref = useRef(null)

  function animateMasks() {
    const masks = ref.current.querySelectorAll('.hero-img .mask')
    const clipPathValues = [
      'polygon(10% 0, 0% 0, 0% 100%, 10% 100%)',
      'polygon(20% 0, 10% 0, 10% 100%, 20% 100%)',
      'polygon(30% 0, 20% 0, 20% 100%, 30% 100%)',
      'polygon(40% 0, 30% 0, 30% 100%, 40% 100%)',
      'polygon(50% 0, 40% 0, 40% 100%, 50% 100%)',
      'polygon(60% 0, 50% 0, 50% 100%, 60% 100%)',
      'polygon(70% 0, 60% 0, 60% 100%, 70% 100%)',
      'polygon(80% 0, 70% 0, 70% 100%, 80% 100%)',
      'polygon(90% 0, 80% 0, 80% 100%, 90% 100%)',
      'polygon(100% 0, 90% 0, 90% 100%, 100% 100%)',
    ]

    setTimeout(() => {
      masks.forEach((mask, index) => {
        gsap.to(mask, {
          clipPath: clipPathValues[index % clipPathValues.length],
          delay: index * 0.1,
          duration: 0.9,
          ease: 'power2.out',
        })
      })
    }, 500)
  }

  useGSAP(
    () => {
      const root = ref.current
      const decodes = Array.from(root.querySelectorAll('[data-animate="decode"]'))

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
      for (const decode of decodes) {
        tl.add(decodeTween(decode, { text: decode.textContent || '', duration: 2 }), 'decodePhase')
      }

      tl.add(animateMasks, 'headerPhase')
    },
    { scope: ref },
  )

  return (
    <section className="inner hero-grid" ref={ref}>
      <div className="hero-header">
        <div className="text-display relative top-1">
          <h1 className="">
            <span data-animate="flicker">Anthony Nguyen</span>
          </h1>
          <h2 className="mb-1">
            <span data-animate="flicker">Full-Stack Developer</span>
          </h2>
        </div>
      </div>

      <p className="text-caption-1 hero-intro" data-animate="decode">
        Anthony Viet Quoc Nguyen is a creative full-stack developer building interactive websites
        with smooth motion and clean design. Available remotely, based in Houston.
      </p>

      <div className="hero-specs">
        {/* Skills */}
        <div className="hero-specs-item">
          <h3 className="text-accent font-mono uppercase" data-animate="flicker">
            Skills
          </h3>
          <ul className="text-caption-3">
            <li data-animate="decode">TypeScript</li>
            <li data-animate="decode">React</li>
            <li data-animate="decode">Next.js</li>
            <li data-animate="decode">Java</li>
            <li data-animate="decode">Node.js</li>
          </ul>
        </div>

        {/* Experience */}
        <div className="hero-specs-item">
          <h3 className="text-accent font-mono uppercase" data-animate="flicker">
            Experience
          </h3>
          <ul className="text-caption-3">
            <li data-animate="decode">Since 2020</li>
          </ul>
        </div>

        {/* Currently */}
        <div className="hero-specs-item">
          <h3 className="text-accent font-mono uppercase" data-animate="flicker">
            Currently
          </h3>
          <ul className="text-caption-3">
            <li data-animate="decode" className="opacity-0">
              Software Developer
            </li>
            <li data-animate="decode" className="opacity-0">
              @ National Grid X
            </li>
          </ul>
        </div>
      </div>

      {/* Image */}
      <div className="hero-img">
        <div className="mask"></div>
        <div className="mask"></div>
        <div className="mask"></div>
        <div className="mask"></div>
        <div className="mask"></div>
        <div className="mask"></div>
        <div className="mask"></div>
        <div className="mask"></div>
        <div className="mask"></div>
        <div className="mask"></div>
      </div>
    </section>
  )
}

export default HeroSection
