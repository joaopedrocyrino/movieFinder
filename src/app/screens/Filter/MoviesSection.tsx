import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Card } from '../../components'
import { useFilterContext } from '.'

const MoviesSection: React.FC = () => {
  const { movies } = useFilterContext()
  const history = useHistory()

  if (!movies.length) { return null }

  return (
    <Container id='MoviesSection'>
      <h2>Filmes</h2>
      <Container>
        {movies.map(movie => {
          return (
            <Card name={movie.title} imagePath={movie.imagePath} onClick={() => {
              history.push({
                pathname: '/movie',
                state: { movie }
              })
            }} />
          )
        })}
      </Container>
    </Container>
  )
}

export default MoviesSection
