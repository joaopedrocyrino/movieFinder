import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Card } from '../../components'
import { useFilterContext } from '.'

const ActorsSection: React.FC = () => {
  const { persons } = useFilterContext()
  const history = useHistory()

  if (!persons.length) { return null }

  return (
    <Container id='ActorsSection'>
      <h2>Atores</h2>
      <Container>
        {persons.map(person => {
          return (
            <Card name={person.name} imagePath={person.imagePath} onClick={() => {
              history.push({
                pathname: '/person',
                state: { person }
              })
            }} />
          )
        })}
      </Container>
    </Container>
  )
}

export default ActorsSection
