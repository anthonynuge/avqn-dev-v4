import { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import TransitionLink from '../shared/TransitionLink'
import { socials } from '../../data/profile'

function NavItem({ to, children, onClick, isMobile = false }) {
  const { pathname } = useLocation()
  const isActive = pathname === to
  return (
    <TransitionLink
      to={to}
      className={isActive && !isMobile ? 'text-accent' : ''}
      data-active={isActive}
      onClick={onClick}
    >
      {children}
    </TransitionLink>
  )
}

const navItems = [
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: `mailto:${socials.email}`, label: 'Contact' },
]

const socialLinks = [
  { href: socials.resume, label: 'Resume' },
  { href: socials.github, label: 'GitHub' },
  { href: socials.linkedin, label: 'LinkedIn' },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)

  // lock page scroll while open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = prev)
  }, [open])

  // close on escape
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="inner sticky top-0 z-80 flex w-full items-center justify-between pt-2 md:pt-3">
      <Link to="/" aria-label="Home">
        {/* your logo unchanged */}
        <svg
          width="160"
          height="76"
          viewBox="0 0 160 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-accent"
        >
          <path
            d="M46.0836 16.226L54.713 22.104V23.2921L27.9493 63H26.7612L18.1317 57.122V55.9339L23.0093 48.6801V44.428L10.5028 63H9.31472L0.685284 57.122V55.9339L27.449 16.226H28.6371L37.2666 22.104H40.956L44.8955 16.226H46.0836ZM23.8222 43.2399H26.6986L37.1415 27.7319V23.4797L23.8222 43.2399ZM81.0137 16.226L89.6431 22.104V23.2921L67.2566 56.4967L66.2561 57.1845H49.3724L45.4329 63H44.2448L35.6153 57.122V55.9339L62.3791 16.226H63.5672L72.1966 22.104V23.2921L53.1869 51.4941V55.7463L79.8255 16.226H81.0137ZM115.944 16.226L124.573 22.104V23.2921L97.8094 63H96.6213L88.0544 57.1845H84.3024L80.3629 63H79.1748L70.5454 57.122V55.9339L97.3091 16.226H98.4972L107.064 22.0415H110.816L114.756 16.226H115.944ZM88.1169 55.7463L107.002 27.7319V23.4797L88.1169 51.4941V55.7463ZM85.6782 59.3106H86.8663L95.4957 65.1886V66.3767L89.6177 75.0687H88.4296L79.8001 69.1907V68.0026L85.6782 59.3106ZM150.874 16.226L159.503 22.104V23.2921L132.739 63H131.551L122.922 57.122V55.9339L141.932 27.7319V23.4797L115.293 63H114.105L105.475 57.122V55.9339L132.239 16.226H133.427L141.994 22.0415H145.746L149.686 16.226H150.874Z"
            fill="currentColor"
          />
        </svg>
      </Link>

      <nav className="hidden md:block">
        <ul className="nav-link space-y-[0.5px]">
          {navItems.map((item) => (
            <li key={item.label} className="hover:bg-accent hover:text-bg px-1 md:pr-6">
              {item.label === 'Contact' ? (
                <a href={item.to}>{item.label}</a>
              ) : (
                <NavItem to={item.to} isMobile={false}>
                  {item.label}
                </NavItem>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* MOBILE: hamburger */}
      <button
        className="relative block h-9 w-9 md:hidden"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {/* 3 bars that morph to X */}
        <span
          className={`bg-fg absolute top-[9px] left-1/2 block h-[2px] w-6 -translate-x-1/2 rounded transition-transform duration-300 ${
            open ? 'translate-y-[7px] rotate-45' : ''
          }`}
        />
        <span
          className={`bg-fg absolute top-1/2 left-1/2 block h-[2px] w-6 -translate-x-1/2 -translate-y-1/2 rounded transition-all duration-300 ${
            open ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`bg-fg absolute bottom-[9px] left-1/2 block h-[2px] w-6 -translate-x-1/2 rounded transition-transform duration-300 ${
            open ? '-translate-y-[7px] -rotate-45' : ''
          }`}
        />
      </button>

      {/* MOBILE: backdrop + sliding sheet */}
      {/* Backdrop */}
      <div
        className={`bg-bg/60 fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
      />
      {/* Sheet */}
      <aside
        ref={panelRef}
        className={`bg-bg/95 ring-fg/10 fixed top-0 right-0 z-80 h-dvh w-[84%] max-w-sm p-4 shadow-2xl ring-1 transition-transform duration-300 md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-caption-1 text-fg/60 tracking-wide uppercase">Menu</span>
          <button
            className="border-fg/20 hover:bg-fg/5 text-caption-1 px-3 py-1"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            Close
          </button>
        </div>

        {/* primary links */}
        <ul className="mb-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.label === 'Contact' ? (
                <a
                  href={item.to}
                  download
                  className="hover:bg-fg/5 text-caption-1 block rounded-xl px-3 py-2 text-base"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <NavItem to={item.to} onClick={() => setOpen(false)} isMobile={true}>
                  <span className="hover:bg-fg/5 text-caption-1 data-[active]:text-bg block rounded-xl px-3 py-2 text-base data-[active]:underline data-[active]:decoration-2 data-[active]:underline-offset-4">
                    {item.label}
                  </span>
                </NavItem>
              )}
            </li>
          ))}
        </ul>

        <div className="bg-fg/10 my-3 h-px w-full" />

        {/* socials */}
        <p className="text-fg/60 mb-2 text-sm tracking-wide uppercase">Social</p>
        <ul className="text-caption-1 flex flex-col gap-2">
          {socialLinks.map((s) => (
            <li key={s.label}>
              {s.href === socials.email ? (
                <a
                  href={`mailto:${s.href}`}
                  className="flex flex-col px-3 py-1 text-sm"
                  onClick={() => setOpen(false)}
                >
                  {s.label}
                </a>
              ) : (
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col px-3 py-1 text-sm"
                  onClick={() => setOpen(false)}
                >
                  {s.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </header>
  )
}

export default Navbar
