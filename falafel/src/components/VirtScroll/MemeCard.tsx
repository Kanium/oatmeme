import React from 'react'
import { Card } from 'react-bootstrap'
import Meme from '../../models/meme.model'

interface MemeCardProps {
    meme: Meme
    style?: any
}

export const MemeCard = ({ meme, style }: MemeCardProps) => {
    return (
        <Card style={style}>
            <Card.Header>{meme.name}</Card.Header>
            <Card.Img variant="bottom" src={meme.data} />
            <Card.Body>
                <Card.Title>{meme.creatorId}</Card.Title>
            </Card.Body>
        </Card>
    )
}
