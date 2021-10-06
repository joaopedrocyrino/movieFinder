import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Container, Button } from '../../components'
import Config from '../../../config'
import './index.css'

const Movie: React.FC = () => {
  const { state: { movie } } = useLocation<{ movie: { title: string, releaseDate: string, rating: number, imagePath: string } }>()
  const history = useHistory()

  return (
        <Container id='Movie'>
            <img
                src={`${Config.getImageUrl()}${movie.imagePath}`}
            />
            <Container>
                <h1>{movie.title}</h1>
                <h3>Avaliação: {movie.rating}</h3>
                <h3>Data de lançamento: {new Date(movie.releaseDate).toLocaleDateString('pt-BR')}</h3>
                <Button onClick={() => history.goBack()}>Voltar</Button>
            </Container>
        </Container>
  )
}

export default Movie
