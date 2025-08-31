const Footer = () => {
  return (
    <footer className="inner flex h-[var(--footer-h)] items-center justify-between pt-2 pb-2 text-xs">
      <span className="font-mono">© {new Date().getFullYear()} AVQN.dev</span>
      <span className="font-mono">V4.0</span>
    </footer>
  )
}

export default Footer
