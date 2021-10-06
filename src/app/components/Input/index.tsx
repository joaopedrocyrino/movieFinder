import React from 'react'
import { TextField } from '@material-ui/core'

const Input: React.FC<{
  value?: string | number | Date
  setValue: Function
  validate?: boolean
  onEnter?: Function
  label?: string
  className?: string
  InputProps?: any
}> = ({
  value,
  setValue,
  validate,
  onEnter,
  label,
  className,
  InputProps
}) => {
  const handleKeyDown = (event: any): void => {
    if (onEnter && event.key === 'Enter') {
      onEnter()
    }
  }

  return (
      <div className={className}>
        <TextField
          error={validate}
          fullWidth
          variant='outlined'
          label={label}
          value={value}
          onChange={({ target: { value } }) => setValue(value)}
          onKeyDown={handleKeyDown}
          InputProps={InputProps}
        />
      </div>
  )
}

export default Input
