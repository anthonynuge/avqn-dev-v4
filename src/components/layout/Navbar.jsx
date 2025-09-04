import { Link } from 'react-router'

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
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
