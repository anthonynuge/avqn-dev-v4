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
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  )
}
