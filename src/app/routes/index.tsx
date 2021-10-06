import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { useAuthContext } from '../../providers'
import { ApiKey, Filter, Movie, Actor, TvShow } from '../screens'

const Routes: React.FC = () => {
  const { apiKey } = useAuthContext()

  if (apiKey) {
    return (
        <Switch>
          <Route exact path='/' component={Filter}/>
          <Route exact path='/tvShow' component={TvShow} />
          <Route exact path='/person' component={Actor} />
          <Route exact path='/movie' component={Movie} />
        </Switch>
    )
  }

  return (
    <Switch>
        <Route exact path='/' component={ApiKey} />
    </Switch>
  )
}

export default Routes
