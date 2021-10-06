import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Card } from '../../components'
import { useFilterContext } from '.'

const TvShowsSection: React.FC = () => {
  const { tvShows } = useFilterContext()
  const history = useHistory()

  if (!tvShows.length) { return null }

  return (
    <Container id='TvShowsSection'>
      <h2>Programas de TV</h2>
      <Container>
        {tvShows.map(tvShow => {
          return (
            <Card name={tvShow.name} imagePath={tvShow.imagePath} onClick={() => {
              history.push({
                pathname: '/tvShow',
                state: { tvShow }
              })
            }} />
          )
        })}
      </Container>
    </Container>
  )
}

export default TvShowsSection
