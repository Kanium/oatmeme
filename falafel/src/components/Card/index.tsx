import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Meme from '../../models/meme.model'
import styles from './styles.module.css'

interface MemeCardProps {
    meme: Meme
    skeleton?: boolean
}

const MemeCard: React.FC<MemeCardProps> = ({ meme }: MemeCardProps) => {
    const isMine: boolean = false

    return (
        <Card className={styles.container}>
            <Card.Header className={styles.header}>{meme.name}
                <div className={styles.deleteIcon} style={{ display: isMine ? 'initial' : 'none' }}>
                    <Button className={styles.deleteIcon}>Test</Button>
            </div>
            </Card.Header>
            <Card.Body className={styles.content}>
                <Card.Img className={styles.image} variant="bottom" src={meme.data} style={{ width: '500px', height: '500px' }} />
                <Card.Title className={styles.creator}>{meme.creatorId}</Card.Title>
            </Card.Body>
            <Card.Footer className={styles.footer}>
                <Button className={styles.dootIcon}>Test</Button>
                <Button className={styles.dootIcon}>Test</Button>
                <span>testTEEEEEE</span>
            </Card.Footer>
        </Card>
    )
}

export default MemeCard
