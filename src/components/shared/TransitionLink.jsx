import useTransition from '../../transition/useTransition'
export default function TransitionLink({ to, children, options, onClick, ...rest }) {
  const { transitionTo } = useTransition()

  const handle = async (e) => {
    onClick?.(e)
    if (e.defaultPrevented) return
    e.preventDefault()
    await transitionTo(to, options)
  }

  return (
    <a href={typeof to === 'string' ? to : '#'} onClick={handle} {...rest}>
      {children}
    </a>
  )
}
