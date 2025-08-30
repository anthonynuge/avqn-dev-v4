import { Link } from 'react-router'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      <Link to="/">
        <img src={'/images/light-logo.svg'} alt="AVQN Logo" />
      </Link>
    </header>
  )
}

export default Navbar
