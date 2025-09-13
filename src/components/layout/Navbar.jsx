import { Link, useLocation } from 'react-router'
import TransitionLink from '../shared/TransitionLink'

function NavItem({ to, children }) {
  const { pathname } = useLocation()
  const isActive = pathname === to
  return (
    <TransitionLink
      to={to}
      className={isActive ? 'bg-accent text-bg px-1' : ''}
      data-active={isActive}
    >
      {children}
    </TransitionLink>
  )
}

const Navbar = () => {
  return (
    <header className="inner sticky top-0 z-50 flex w-full justify-between pt-2 md:pt-4">
      <Link to="/">
        <img src={'/images/dark-logo.svg'} alt="AVQN Logo" />
      </Link>

      {/* Hamburger Icon */}
      <div className="block md:hidden"></div>

      <nav className="hidden md:block">
        <ul className="nav-link">
          <li>
            <NavItem to="/projects">Projects</NavItem>
          </li>
          <li>
            <NavItem to="/about">About</NavItem>
          </li>
          <li>
            <NavItem to="/contact">Contact</NavItem>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
