import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { GSDevTools } from 'gsap/GSDevTools'

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger, GSDevTools)

GSDevTools.create()

export { useGSAP, gsap }
