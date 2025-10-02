// path: src/app/(marketing)/about/About.jsx
import { useRef, useState } from 'react'
import HeadModel from '@/components/model/HeadModel'
import LinkButton from '@/components/shared/LinkButton'
import { useGSAP, gsap } from '@/lib/gsapSetup'
import { flicker } from '@/lib/animations/flicker'
import { socials } from '@/data/profile'

const About = () => {
  const scope = useRef(null)
  const cameraRef = useRef(null)
  const modelWrapperRef = useRef(null)
  const [ready, setReady] = useState(false)
  const started = useRef(false)

  const handleReady = ({ camera /*, model */ }) => {
    cameraRef.current = camera
    setReady(true)
  }

  // Hide 3D holder initially
  useGSAP(
    () => {
      gsap.set(modelWrapperRef.current, { autoAlpha: 0 })
    },
    { scope: modelWrapperRef },
  )

  // Master timeline: camera + content
  useGSAP(
    () => {
      const camera = cameraRef.current
      if (!camera) return
      if (started.current) return
      started.current = true

      const q = (sel) => (scope.current ? scope.current.querySelectorAll(sel) : [])
      const aim = () => camera.lookAt(0, 0, 0)
      const toPos = (pos, duration, ease = 'power2.inOut') => ({
        ...pos,
        duration,
        ease,
        onUpdate: aim,
      })
      const pause = (secs) => ({ duration: secs })

      const paras = q('[data-in~="flicker"][data-paragraph]')
      const eduBlock = scope.current?.querySelector('[data-edu]')
      const ctas = q('[data-cta], [data-cta] a, [data-cta] button, [data-cta] [data-in]')

      // Prevent FOUC
      gsap.set(paras, { autoAlpha: 0, willChange: 'opacity, filter' })
      if (eduBlock) gsap.set(eduBlock, { autoAlpha: 0 })
      gsap.set(ctas, { autoAlpha: 0 })

      // Waypoints
      const FINAL = { x: 1, y: 0.0, z: 2.0 }
      const TOP_DOWN = { x: -0.9, y: 1.3, z: 1.3 }
      const RIGHT = { x: 2.0, y: -0.4, z: 0.9 }
      const BOTTOM = { x: 0.6, y: -1.2, z: 1.5 }

      gsap.killTweensOf(camera)
      gsap.killTweensOf(camera.position)

      const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

      // Warm-up
      tl.to(modelWrapperRef.current, { autoAlpha: 1, duration: 0.4 })

      camera.position.set(0, 0, 800)
      camera.lookAt(0, 0, 0)

      // Camera path + linked reveals
      tl.addLabel('dollyStart')
        .to(camera.position, toPos({ x: 0, y: 0, z: 100 }, 1))
        .to({}, pause(0.5))
        .to(camera.position, toPos({ x: 0, y: 0, z: 80 }, 1))
        .to({}, pause(0.3))
        .to(camera.position, toPos({ x: 2, y: 0, z: 2 }, 1.8))
        .to({}, pause(0.3))
        .addLabel('dollyDone')
        .to(scope.current?.querySelector('[data-section="about"]'), { opacity: 1, duration: 0.04 })

        // RIGHT move → Paragraph 1
        .to(camera.position, toPos(RIGHT, 1), 'startRight')
        .add(() => {
          if (paras[0])
            flicker(paras[0], { boot: 0.45, duration: 1.2, blips: 5, blur: 0.6, surge: 1.35 })
        }, 'startRight+=0.15')
        .to({}, pause(0.35))

        // BOTTOM move → Paragraph 2
        .to(camera.position, toPos(BOTTOM, 1), 'startBottom')
        .add(() => {
          if (paras[1])
            flicker(paras[1], { boot: 0.45, duration: 1.2, blips: 5, blur: 0.6, surge: 1.35 })
        }, 'startBottom+=0.15')
        .to({}, pause(0.35))

        // TOP_DOWN move → Paragraph 3
        .to(camera.position, toPos(TOP_DOWN, 1), 'startTopDown')
        .add(() => {
          if (paras[2])
            flicker(paras[2], { boot: 0.45, duration: 1.2, blips: 5, blur: 0.6, surge: 1.35 })
        }, 'startTopDown+=0.15')
        .to({}, pause(0.35))

        // Final face-on → Edu + CTAs fade in
        .to(camera.position, toPos(FINAL, 1), 'finalFace')
        .add(() => {
          if (eduBlock) gsap.to(eduBlock, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' })
          if (ctas.length)
            gsap.to(ctas, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.07 })
        }, 'finalFace+=0.2')

      return () => {
        tl.kill()
        gsap.killTweensOf(camera)
        gsap.killTweensOf(camera.position)
      }
    },
    { scope, dependencies: [ready] },
  )

  return (
    <div className="fill-offset inner relative grid grid-cols-1 md:grid-cols-2" ref={scope}>
      <div
        className="mx-auto block h-[40vh] w-full md:absolute md:w-[50vw] lg:top-1/2 lg:left-1/4 lg:h-full lg:w-[75vw] lg:-translate-x-1/2 lg:-translate-y-1/2"
        ref={modelWrapperRef}
      >
        <HeadModel onReady={handleReady} />
      </div>

      {/* Content */}
      <div
        className="max-w-[50ch] space-y-4 text-xs opacity-0 md:col-start-2 md:justify-self-center md:text-sm"
        data-section="about"
      >
        <p data-in="flicker" data-paragraph="">
          I'm Anthony, a software engineer based in Houston, Texas with a focus on building
          technology that is both functional and enjoyable to use. Commited to craftsmenship in
          every project I work on.
        </p>
        <p data-in="flicker" data-paragraph="">
          Highly adaptable, comfortable working on both front-end and back-end development.
          Depending on the project, I can design interfaces, set up infrastructure, and build out
          features. From crafting animations to configuring systems, I’m not afraid to pick up new
          skills and technologies to meet the needs of each project.
        </p>
        <p data-in="flicker" data-paragraph="">
          When I'm not coding, I enjoy reading, watching anime, and playing games.
        </p>

        <div className="grid grid-cols-2" data-edu="">
          <div className="text-xs md:text-sm">
            <h3 className="text-accent">Education</h3>
            <div className="mb-2">
              <div className="flex justify-between text-xs md:text-sm">
                <div className="text-xs md:text-sm">Western Governors University</div>
              </div>
              <p className="text-xs md:text-sm">B.S Computer Science</p>
            </div>

            <div>
              <div className="flex justify-between text-xs md:text-sm">
                <div>University of Houston</div>
              </div>
              <p>B.S Kinsiology</p>
            </div>
          </div>

          <div
            className="w-3/4 space-y-2 justify-self-end font-mono text-xs uppercase md:w-1/2 lg:mt-4"
            data-cta=""
          >
            <LinkButton to={socials.github}>
              <span data-in="scramble" data-out="scramble" data-text="GitHub">
                GitHub
              </span>
            </LinkButton>
            <LinkButton to={socials.linkedin}>
              <span data-in="scramble" data-out="scramble" data-text="LinkedIn">
                LinkedIn
              </span>
            </LinkButton>
          </div>
        </div>

        <a
          href="/resume-10-2025.pdf"
          download
          className="bg-accent text-bg hover:bg-accent/80 col-span-2 inline-flex w-full items-center justify-center gap-2 rounded-sm px-1 py-1 font-mono text-xs uppercase transition-colors"
          data-cta
        >
          Download Resume
        </a>
      </div>
    </div>
  )
}

export default About
