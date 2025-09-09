import { Link } from 'react-router'

const LinkButton = ({ to, external = false, children, className = '', ...props }) => {
  const baseClasses =
    'uppercase inline-flex items-center gap-2 rounded-sm px-1 py-1 font-mono text-xs transition-colors bg-accent text-bg hover:bg-accent/80 justify-between'

  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${className}`}
        {...props}
      >
        {children}
        {/* optional external icon */}
        <img src="/icons/arrow-up-right.svg" className="inline-block size-3" />
      </a>
    )
  }

  return (
    <Link to={to} className={`${baseClasses} ${className}`} {...props}>
      {children}
      <img src="/icons/arrow-up-right.svg" className="inline-block size-3" />
    </Link>
  )
}

export default LinkButton
