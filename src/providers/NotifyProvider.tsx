import React, { createContext, useContext, useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

const NotifyContext = createContext({})

export const NotifyProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [severity, setSeverity] = useState<'error' | 'warning' | 'info' | 'success'>()

  const handleClose = (event?: React.SyntheticEvent, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const notify = (message: string, severity?: 'error' | 'warning' | 'info'): void => {
    setOpen(true)
    setMessage(message)
    setSeverity(severity)
  }

  return (
    <NotifyContext.Provider value={{ notify }}>
      {children}
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
          {message}
        </MuiAlert>
      </Snackbar>
    </NotifyContext.Provider>
  )
}

export const useNotifyContext = (): INotifyContext => {
  const { notify } = useContext<{ [key: string]: any }>(NotifyContext)
  return { notify }
}

interface INotifyContext {
  notify: (message: string, severity?: 'error' | 'warning' | 'info') => void
}
