'use client'
import React, { useEffect, useImperativeHandle, useRef } from 'react'
import * as THREE from 'three'
import { VERT, FRAG } from './featuredShader'

const FeaturedCanvas = React.memo(
  React.forwardRef(function FeaturedCanvas({ className }, ref) {
    const mountRef = useRef(null)
    const rendererRef = useRef(null)
    const materialRef = useRef(null)

    const loaderRef = useRef(new THREE.TextureLoader().setCrossOrigin('anonymous'))
    const texturesRef = useRef([])
    const imageSizesRef = useRef([])
    const indexRef = useRef(0)

    const sizeRef = useRef({ w: 1, h: 1 })
    const rafRef = useRef(null)

    // animated uniforms
    const uTransitionRef = useRef(0)
    const uAnimateInRef = useRef(0)

    // gate to prevent overlapping transitions
    const isAnimatingRef = useRef(false)

    useEffect(() => {
      const mount = mountRef.current
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
      renderer.setClearColor(0x000000, 1)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1))
      renderer.setSize(1, 1, false)
      rendererRef.current = renderer

      const scene = new THREE.Scene()
      const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

      const geo = new THREE.PlaneGeometry(2, 2)
      const mat = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: {
          u_Resolution: { value: new THREE.Vector2(1, 1) },
          u_Mouse: { value: new THREE.Vector2(0, 0) },

          u_Texture01: { value: null },
          u_Texture02: { value: null },

          u_TransitionProgress: { value: 0 },
          u_AnimateIn: { value: 0 },
          u_AnimateOut: { value: 0 },

          // idle = clean image
          u_TextureScaleIntensityMouse: { value: 0.22 },
          u_TextureScaleIntensityTransition: { value: 0.0 },
          u_EnableEffect: { value: 0.0 },

          u_ImageSize01: { value: new THREE.Vector2(2182, 558) },
          u_ImageSize02: { value: new THREE.Vector2(2182, 558) },

          // NEW: +1.0 = L->R (next), -1.0 = R->L (prev)
          u_Direction: { value: 1.0 },
        },
        transparent: false,
      })
      materialRef.current = mat

      const mesh = new THREE.Mesh(geo, mat)
      scene.add(mesh)
      mount.appendChild(renderer.domElement)

      const tick = () => {
        rafRef.current = requestAnimationFrame(tick)
        // animated uniforms
        mat.uniforms.u_TransitionProgress.value = uTransitionRef.current
        mat.uniforms.u_AnimateIn.value = uAnimateInRef.current

        // keep resolution = CSS * DPR
        const pr = renderer.getPixelRatio()
        const { w, h } = sizeRef.current
        mat.uniforms.u_Resolution.value.set(w * pr, h * pr)

        renderer.render(scene, cam)
      }
      rafRef.current = requestAnimationFrame(tick)

      // optional: prevent default on context loss
      const canvas = renderer.domElement
      const onLost = (e) => e.preventDefault()
      canvas.addEventListener('webglcontextlost', onLost, false)

      return () => {
        canvas.removeEventListener('webglcontextlost', onLost, false)
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        if (mount && renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement)
        }
        geo.dispose()
        mat.dispose()
        renderer.dispose()
        texturesRef.current.forEach((t) => t.dispose())
      }
    }, [])

    // Promise-based tween helper
    function tween(refObj, to, ms, ease) {
      return new Promise((resolve) => {
        const from = refObj.current
        const start = performance.now()
        function step(now) {
          const t = Math.min(1, (now - start) / ms)
          refObj.current = from + (to - from) * ease(t)
          if (t < 1) requestAnimationFrame(step)
          else {
            refObj.current = to
            resolve()
          }
        }
        requestAnimationFrame(step)
      })
    }
    const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3)
    const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

    // API
    async function setImages(urls) {
      const loader = loaderRef.current
      texturesRef.current.forEach((t) => t.dispose())
      texturesRef.current = []
      imageSizesRef.current = []

      const loaded = await Promise.all(
        urls.map(
          (src) =>
            new Promise((res, rej) => {
              loader.load(
                src,
                (tex) => {
                  tex.colorSpace = THREE.SRGBColorSpace
                  tex.generateMipmaps = true
                  tex.minFilter = THREE.LinearMipmapLinearFilter
                  tex.magFilter = THREE.LinearFilter
                  // light anisotropy if available
                  const maxAniso = rendererRef.current?.capabilities.getMaxAnisotropy?.() ?? 0
                  if (maxAniso && 'anisotropy' in tex) tex.anisotropy = Math.min(4, maxAniso)
                  res(tex)
                },
                undefined,
                rej,
              )
            }),
        ),
      )

      texturesRef.current = loaded
      imageSizesRef.current = loaded.map(
        (t) => new THREE.Vector2(t.image?.width || 2182, t.image?.height || 558),
      )
      indexRef.current = 0

      const mat = materialRef.current
      const texA = texturesRef.current[0] || null
      const texB = texturesRef.current[1] || texA
      const sizeA = imageSizesRef.current[0] || new THREE.Vector2(2182, 558)
      const sizeB = imageSizesRef.current[1] || sizeA

      mat.uniforms.u_Texture01.value = texA
      mat.uniforms.u_Texture02.value = texB
      mat.uniforms.u_ImageSize01.value.copy(sizeA)
      mat.uniforms.u_ImageSize02.value.copy(sizeB)

      // animate in once
      uAnimateInRef.current = 0
      await tween(uAnimateInRef, 1, 500, easeOutCubic)
    }

    function commitTransition(newIndex) {
      const mat = materialRef.current
      mat.uniforms.u_Texture01.value = texturesRef.current[newIndex]
      mat.uniforms.u_ImageSize01.value.copy(
        imageSizesRef.current[newIndex] || new THREE.Vector2(2182, 558),
      )
      uTransitionRef.current = 0

      const nextIdx = (newIndex + 1) % texturesRef.current.length
      mat.uniforms.u_Texture02.value = texturesRef.current[nextIdx]
      mat.uniforms.u_ImageSize02.value.copy(
        imageSizesRef.current[nextIdx] || imageSizesRef.current[newIndex],
      )

      // turn transition influence off after tween
      mat.uniforms.u_TextureScaleIntensityTransition.value = 0.0
    }

    function show(i) {
      if (!texturesRef.current.length) return
      const n = texturesRef.current.length
      if (n < 2) return
      const target = ((i % n) + n) % n
      if (target === indexRef.current) return
      if (isAnimatingRef.current) return

      const mat = materialRef.current
      mat.uniforms.u_Texture02.value = texturesRef.current[target]
      mat.uniforms.u_ImageSize02.value.copy(
        imageSizesRef.current[target] || new THREE.Vector2(2182, 558),
      )

      // enable transition-only influence during tween
      mat.uniforms.u_TextureScaleIntensityTransition.value = 1.0

      isAnimatingRef.current = true
      uTransitionRef.current = 0
      tween(uTransitionRef, 1, 650, easeInOut).then(() => {
        indexRef.current = target
        commitTransition(target)
        isAnimatingRef.current = false
      })
    }

    function next() {
      materialRef.current.uniforms.u_Direction.value = 1.0 // left → right
      show(indexRef.current + 1)
    }
    function prev() {
      materialRef.current.uniforms.u_Direction.value = -1.0 // right → left
      show(indexRef.current - 1)
    }

    function setDirection(dir) {
      materialRef.current.uniforms.u_Direction.value = dir
    }

    function resize(w, h) {
      sizeRef.current = { w, h }
      const renderer = rendererRef.current
      if (!renderer) return
      renderer.setSize(w, h, false)

      // recenter mouse (keeps masks stable after resize)
      const pr = renderer.getPixelRatio()
      materialRef.current.uniforms.u_Mouse.value.set(w * 0.5 * pr, h * 0.5 * pr)
    }

    useImperativeHandle(ref, () => ({ setImages, show, next, prev, resize, setDirection }), [])

    // pointer → uniforms
    function onPointerEnter() {
      materialRef.current.uniforms.u_EnableEffect.value = 1.0
    }
    function onPointerMove(e) {
      const mount = mountRef.current
      const renderer = rendererRef.current
      if (!mount || !renderer) return
      const rect = mount.getBoundingClientRect()
      const pt = 'clientX' in e ? e : e.touches && e.touches[0]
      if (!pt) return
      const xCss = pt.clientX - rect.left
      const yCss = pt.clientY - rect.top
      const dpr = renderer.getPixelRatio()
      materialRef.current.uniforms.u_Mouse.value.set(xCss * dpr, (rect.height - yCss) * dpr)
    }
    function onPointerLeave() {
      const renderer = rendererRef.current
      if (!renderer) return
      materialRef.current.uniforms.u_EnableEffect.value = 0.0
      const dpr = renderer.getPixelRatio()
      const { w, h } = sizeRef.current
      materialRef.current.uniforms.u_Mouse.value.set(w * 0.5 * dpr, h * 0.5 * dpr)
    }

    return (
      <div
        ref={mountRef}
        className={className}
        onMouseEnter={onPointerEnter}
        onMouseMove={onPointerMove}
        onMouseLeave={onPointerLeave}
        onTouchStart={(e) => {
          onPointerEnter()
          onPointerMove(e)
        }}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerLeave}
        style={{ width: '100%', height: '100%' }}
      />
    )
  }),
)

FeaturedCanvas.displayName = 'FeaturedCanvas'
export default FeaturedCanvas
