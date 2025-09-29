import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js'

const HeadModel = forwardRef(function HeadModel({ onReady }, ref) {
  const containerRef = useRef(null)
  const cameraRef = useRef(null)
  const modelRef = useRef(null)

  // Expose LIVE getters so parent always sees latest values
  useImperativeHandle(ref, () => ({
    get camera() {
      return cameraRef.current
    },
    get model() {
      return modelRef.current
    },
  }))

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Sizes
    const getSize = () => ({
      w: container.clientWidth || window.innerWidth,
      h: container.clientHeight || window.innerHeight,
    })
    let { w, h } = getSize()

    // Renderer for ASCII effect
    const asciiRenderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true, // Enable transparency
    })
    asciiRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    asciiRenderer.setSize(w, h)
    asciiRenderer.setClearColor(0x000000, 0) // Transparent clear color

    // ASCII effect wraps the ASCII renderer - focused on model shape
    const effect = new AsciiEffect(asciiRenderer, ' .:-+*=%@#avqnAVQN', {
      invert: false,
      resolution: 0.15, // Lower resolution for cleaner ASCII on model
    })
    effect.setSize(w, h)

    // Styling for white ASCII on transparent background
    effect.domElement.style.backgroundColor = 'transparent'
    effect.domElement.style.color = 'text-accent'
    effect.domElement.style.fontFamily = 'monospace'
    effect.domElement.style.fontSize = '8px'
    effect.domElement.style.lineHeight = '6px'
    effect.domElement.style.position = 'absolute'
    effect.domElement.style.top = '0'
    effect.domElement.style.left = '0'
    effect.domElement.style.width = '100%'
    effect.domElement.style.height = '100%'
    effect.domElement.style.fontWeight = 'bold'

    // ASCII effect ready to render

    // Put ASCII layer in the container
    container.innerHTML = '' // clear anything inside
    container.appendChild(effect.domElement)

    // Scene / camera
    const scene = new THREE.Scene()
    scene.background = null // Transparent background so only model shows ASCII
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    camera.position.set(0, 0, 2) // Better position for viewing
    cameraRef.current = camera

    // Controls (bind to ASCII's element so pointer events work)
    // const controls = new OrbitControls(camera, effect.domElement)

    // Lights - brighter lighting for better ASCII visibility
    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.0))
    const dir = new THREE.DirectionalLight(0xffffff, 2.0)
    dir.position.set(2, 2, 2)
    scene.add(dir)

    // Add ambient light for even illumination
    const ambient = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambient)

    let model

    // Try to load the actual model
    const loader = new GLTFLoader()
    loader.load(
      '/wolf-cut-mesh.glb',
      (g) => {
        model = g.scene
        model.rotation.y = Math.PI
        // model.rotation.y = Math.PI/2
        // model.rotation.y = -Math.PI
        // Optional: wireframe (ASCII renders luminance; wireframe can be noisy — up to you)
        model.traverse((o) => {
          if (o.isMesh && o.material) {
            o.material.wireframe = false // try turning this off if it looks too busy
          }
        })
        scene.add(model)
        onReady?.({ camera: cameraRef.current, model: modelRef.current })
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error)
      },
    )

    // Resize
    const onResize = () => {
      const size = getSize()
      w = size.w
      h = size.h
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      asciiRenderer.setSize(w, h)
      effect.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // Animate
    let raf = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)

      // Rotate the model if it exists
      if (model) {
        model.rotation.y += 0.001 // Rotate around Y axis
      }

      // controls.update()

      // Render ASCII effect
      effect.render(scene, camera) // IMPORTANT: render via effect
    }
    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      asciiRenderer.dispose()

      // dispose geometries/materials
      scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry?.dispose?.()
          if (obj.material?.map) obj.material.map.dispose?.()
          obj.material?.dispose?.()
        }
      })

      // remove ASCII DOM
      if (effect.domElement && effect.domElement.parentNode) {
        effect.domElement.parentNode.removeChild(effect.domElement)
      }
    }
  }, [])

  // Make sure this div has a size (via class or inline styles)
  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
})

export default HeadModel
