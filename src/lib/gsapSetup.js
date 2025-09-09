import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger)

export { useGSAP, gsap }
