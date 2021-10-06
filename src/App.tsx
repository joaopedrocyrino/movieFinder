import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider as MaterialThemeProvider } from '@material-ui/core/styles'
import { ApiProvider, NotifyProvider, AuthProvider } from './providers'
import Routes from './app/routes'
import './App.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c2c30'
    }
  }
})

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MaterialThemeProvider theme={theme}>
        <AuthProvider>
          <ApiProvider>
            <NotifyProvider>
              <Routes />
            </NotifyProvider>
          </ApiProvider>
        </AuthProvider>
      </MaterialThemeProvider>
    </BrowserRouter>
  )
}

export default App
