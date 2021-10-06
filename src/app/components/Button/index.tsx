import React from 'react'
import './index.css'

const Button: React.FC<{
  onClick: Function
  className?: string
}> = ({ children, onClick, className }) => {
  return (
    <button className={className} onClick={() => onClick()}>{children}</button>
  )
}

export default Button
