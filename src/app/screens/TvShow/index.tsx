import React, { useState, useEffect, Fragment } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import { Container, Button } from '../../components'
import { useApiContext, useNotifyContext } from '../../../providers'
import Config from '../../../config'
import './index.css'

const TvShow: React.FC = () => {
  const { state: { tvShow } } = useLocation<{ tvShow: { id: number } }>()
  const history = useHistory()
  const { tvShowAPI } = useApiContext()
  const { notify } = useNotifyContext()
  const [loading, setLoading] = useState<boolean>(true)
  const [show, setShow] = useState<{
    name: string
    imagePath: string
    releaseDate: string
    seasons: number
  } | undefined>()

  useEffect(() => {
    tvShowAPI.getTvShow(tvShow.id)
      .then(res => setShow(res))
      .catch(() => {
        notify('Erro ao buscar programa de tv', 'error')
        history.goBack()
      })
      .finally(() => setLoading(false))
  }, [])

  return (
        <Container id='TvShow'>
            {loading
              ? <CircularProgress />
              : show && <Fragment>
            <img
                src={`${Config.getImageUrl()}${show.imagePath}`}
            />
            <Container>
                <h1>{show.name}</h1>
                <h3>Data de lançamento: {new Date(show.releaseDate).toLocaleDateString('pt-BR')}</h3>
                <h3>Número de temporadas: {show.seasons}</h3>
                <Button onClick={() => history.goBack()}>Voltar</Button>
            </Container>
            </Fragment>
        }
        </Container>
  )
}

export default TvShow
