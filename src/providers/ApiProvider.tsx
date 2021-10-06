import React, { createContext, useContext } from 'react'
import axios from 'axios'
import Config from '../config'
import { MovieAPI, TvShowAPI, PersonAPI } from '../api'

const ApiContext = createContext({})

export const ApiProvider: React.FC = ({ children }) => {
  const api = axios.create({ baseURL: Config.getApiUrl() })

  return (
    <ApiContext.Provider value={{
      movieAPI: new MovieAPI(api),
      tvShowAPI: new TvShowAPI(api),
      personAPI: new PersonAPI(api)
    }}>
      {children}
    </ApiContext.Provider>
  )
}

export const useApiContext = (): apiInterface => {
  const {
    movieAPI, tvShowAPI, personAPI
  } = useContext<{ [key: string]: any }>(ApiContext)
  return {
    movieAPI, tvShowAPI, personAPI
  }
}

interface apiInterface {
  movieAPI: MovieAPI
  tvShowAPI: TvShowAPI
  personAPI: PersonAPI
}
