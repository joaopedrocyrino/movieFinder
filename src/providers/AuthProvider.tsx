import React, { useContext, createContext, useState, useEffect } from 'react'

const AuthContext = createContext({})

export const AuthProvider: React.FC = ({ children }) => {
  const [apiKey, setApiKey] = useState<string>('')

  useEffect(() => {
    const storedApiKey = localStorage.getItem('apiKey')
    if (storedApiKey) {
      setApiKey(storedApiKey)
    }
  }, [])

  const setPersistentApiKey = (value?: string): void => {
    setApiKey(value ?? '')
    if (value) {
      localStorage.setItem('apiKey', value)
    } else { localStorage.removeItem('apiKey') }
  }

  return (
    <AuthContext.Provider value={{
      apiKey,
      setPersistentApiKey
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = (): authInterface => {
  const {
    apiKey,
    setPersistentApiKey
  } = useContext<{ [key: string]: any }>(AuthContext)
  return {
    apiKey,
    setPersistentApiKey
  }
}

interface authInterface {
  apiKey: string
  setPersistentApiKey: Function
}
