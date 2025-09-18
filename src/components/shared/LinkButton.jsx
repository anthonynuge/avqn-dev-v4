import React from 'react'
import ArrowRight from '../../assets/ArrowRight'

const LinkButton = ({ to, className, children, ...props }) => {
  const base =
    'inline-flex items-center justify-between hover:bg-accent w-full hover:text-bg group px-1'
  return (
    <a
      href={to}
      className={`${base} ${className}`}
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      data-out="fade"
      data-in="fade"
    >
      <span>{children}</span>
      <ArrowRight className="inline-block size-3 transition-transform duration-300 group-hover:-rotate-45"></ArrowRight>
    </a>
  )
}

export default LinkButton
