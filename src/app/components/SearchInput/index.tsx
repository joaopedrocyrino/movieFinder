import React, { useState } from 'react'
import { InputAdornment } from '@material-ui/core'
import { FaSearch, FaTimes } from 'react-icons/fa'
import Input from '../Input'
import './index.css'

const SearchInput: React.FC<{ setSearch: Function }> = ({ setSearch }) => {
  const [value, setValue] = useState<string>('')
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>(setTimeout(() => { }, 1))

  const onSearch = (search: string): void => {
    if (search !== value) {
      setValue(search)
      clearTimeout(timeoutId)
      const id = setTimeout(() => { setSearch(search ?? undefined) }, 700)
      setTimeoutId(id)
    }
  }

  return (
    <Input
      className='searchInput'
      label='Buscar'
      value={value}
      setValue={onSearch}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {value ? <FaTimes className='icon' onClick={() => onSearch('')} /> : <FaSearch className='icon' />}
          </InputAdornment>)
      }}
    />
  )
}

export default SearchInput
