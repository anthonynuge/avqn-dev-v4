import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsapSetup'

export default function ParallaxImage({ src, alt, className = '', shift = 110, scale = 1.08 }) {
  const wrapRef = useRef(null)
  const imgRef = useRef(null)

  useGSAP(
    () => {
      // if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
      gsap.set(imgRef.current, { scale, willChange: 'transform' })

      gsap.to(imgRef.current, {
        y: shift,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: wrapRef },
  )

  return (
    <div
      ref={wrapRef}
      className={`parallax-container absolute top-0 left-1/2 flex w-full -translate-x-1/2 justify-center md:h-[90vh] lg:w-[100%] 2xl:w-[95%] ${className}`}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`min-w-[100%] object-cover`}
        loading="lazy"
      />
    </div>
  )
}
