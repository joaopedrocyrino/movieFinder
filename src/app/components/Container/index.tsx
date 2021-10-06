import React from 'react'
import './index.css'

const Container: React.FC<{ id?: string }> = ({ children, id }) => {
  return (
    <div id={id} className='container'>
      {children}
    </div>
  )
}

export default Container
