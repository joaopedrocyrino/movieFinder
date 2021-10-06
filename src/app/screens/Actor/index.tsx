import React, { useState, useEffect, Fragment } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import { Container, Button } from '../../components'
import { useApiContext, useNotifyContext } from '../../../providers'
import Config from '../../../config'
import './index.css'

const Actor: React.FC = () => {
  const { state: { person } } = useLocation<{ person: { id: number } }>()
  const history = useHistory()
  const { personAPI } = useApiContext()
  const { notify } = useNotifyContext()
  const [loading, setLoading] = useState<boolean>(true)
  const [actor, setActor] = useState<{
    name: string
    age: number
    imagePath: string
    lastMovie: string
  } | undefined>()

  useEffect(() => {
    personAPI.getPerson(person.id)
      .then(res => setActor(res))
      .catch(() => {
        notify('Erro ao buscar pessoa', 'error')
        history.goBack()
      })
      .finally(() => setLoading(false))
  }, [])

  return (
        <Container id='Actor'>
            {loading
              ? <CircularProgress />
              : actor && <Fragment>
            <img
                src={`${Config.getImageUrl()}${actor.imagePath}`}
            />
            <Container>
                <h1>{actor.name}</h1>
                <h3>Idade: {actor.age} anos</h3>
                <h3>Último filme: {actor.lastMovie}</h3>
                <Button onClick={() => history.goBack()}>Voltar</Button>
            </Container>
            </Fragment>
        }
        </Container>
  )
}

export default Actor
