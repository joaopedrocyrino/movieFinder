import React from 'react'
import { Card as MuiCard, CardContent, CardMedia } from '@material-ui/core'
import Config from '../../../config'
import { Button } from '..'
import './index.css'

const Card: React.FC<{ imagePath: string, name: string, onClick: Function }> = ({ imagePath, name, onClick }) => {
  return (
    <MuiCard className='card' elevation={4}>
      <CardMedia
        className='cardMedia'
        component="img"
        height="200"
        image={`${Config.getImageUrl()}${imagePath}`}
        alt={name}
      />
      <CardContent className='cardContent'>
        {name}
      </CardContent>
      <Button onClick={onClick}>Saiba mais +</Button>
    </MuiCard>
  )
}

export default Card
