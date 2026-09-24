const Footer = () => {
  return (
    <footer className="inner flex h-[var(--footer-h)] items-center justify-between pt-1 pb-[1px] text-xs lg:fixed lg:bottom-0 lg:pt-2 lg:pb-2">
      <span className="font-mono">© {new Date().getFullYear()} AVQN.dev</span>
      <span className="font-mono">V4.0</span>
    </footer>
  )
}

export default Footer
