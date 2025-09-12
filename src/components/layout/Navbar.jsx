import { Link } from 'react-router'
import TransitionLink from '../shared/TransitionLink'

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
            <TransitionLink to="/projects">Projects</TransitionLink>
          </li>
          <li>
            <TransitionLink to="/about">About</TransitionLink>
          </li>
          <li>
            <TransitionLink to="/contact">Contact</TransitionLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
