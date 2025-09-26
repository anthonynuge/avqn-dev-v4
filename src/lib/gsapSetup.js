import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Observer from 'gsap/Observer'
// import { GSDevTools } from 'gsap/GSDevTools'

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger, Observer)

// GSDevTools.create()

export { useGSAP, gsap, Observer }
