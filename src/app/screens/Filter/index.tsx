import React, { createContext, useContext, useEffect, useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import { Container, SearchInput } from '../../components'
import { useNotifyContext, useApiContext } from '../../../providers'
import MoviesSection from './MoviesSection'
import TvShowsSection from './TvShowsSection'
import ActorsSection from './ActorsSection'
import './index.css'

const FilterContext = createContext({})

const Filter: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [movies, setMovies] = useState<Array<{ title: string, releaseDate: string, rating: number, imagePath: string }>>([])
  const [tvShows, setTvShows] = useState<Array<{ id: number, name: string, imagePath: string }>>([])
  const [persons, setPersons] = useState<Array<{ id: number, name: string, imagePath: string }>>([])
  const { notify } = useNotifyContext()
  const { movieAPI, personAPI, tvShowAPI } = useApiContext()

  useEffect(() => {
    if (search) {
      setLoading(true)
      Promise.all([
        movieAPI.searchMovies(search)
          .then((res) => setMovies(res))
          .catch(() => notify('Erro ao buscar filmes', 'error')),
        personAPI.searchPerson(search)
          .then((res) => setPersons(res))
          .catch(() => notify('Erro ao buscar atores', 'error')),
        tvShowAPI.searchTvShow(search)
          .then((res) => setTvShows(res))
          .catch(() => notify('Erro ao buscar programas de TV', 'error'))
      ])
        .finally(() => setLoading(false))
    } else {
      setMovies([])
      setTvShows([])
      setPersons([])
    }
  }, [search])

  return (
    <FilterContext.Provider value={{
      movies,
      persons,
      tvShows
    }}>
      <Container id='Filter'>
        <SearchInput setSearch={setSearch} />
        {search && (loading
          ? <CircularProgress />
          : <div className='cardContainer'>
            <MoviesSection />
            <TvShowsSection />
            <ActorsSection />
          </div>
        )}
      </Container>
    </FilterContext.Provider>
  )
}

export default Filter

export const useFilterContext = (): {
  movies: Array<{
    title: string
    releaseDate: string
    rating: number
    imagePath: string
  }>
  persons: Array<{
    id: number
    name: string
    imagePath: string
  }>
  tvShows: Array<{
    id: number
    name: string
    imagePath: string
    releaseDate: string
  }>
} => {
  const {
    movies,
    persons,
    tvShows
  } = useContext<{ [key: string]: any }>(FilterContext)
  return {
    movies,
    persons,
    tvShows
  }
}
