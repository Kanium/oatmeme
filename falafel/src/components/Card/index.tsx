import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Meme from '../../models/meme.model'
import styles from './styles.module.css'
import { GoArrowUp, GoArrowDown } from 'react-icons/go'
import { useLocalStorage } from '../../utils/customHooks'
interface MemeCardProps {
    meme: Meme
    skeleton?: boolean
}

const MemeCard: React.FC<MemeCardProps> = ({ meme }: MemeCardProps) => {

    const [value, setValue] = useLocalStorage<number>(meme.id, 0)

    const isMine: boolean = false

    const updoot = () => {
        //TODO control logic
        setValue(value + 1)
    }
    const downdoot = () => {
        //TODO control logic
        setValue(value - 1)

    }


    return (
        <Card className={styles.container}>
            <Card.Header className={styles.header}>{meme.name}
                <div className={styles.deleteIcon} style={{ display: isMine ? 'initial' : 'none' }}>
                    <Button className={styles.deleteIcon}>Test</Button>
            </div>
            </Card.Header>
            <Card.Body className={styles.content}>
                <Card.Img
                    className={styles.image}
                    variant="bottom"
                    src={meme.data}
                    style={{ width: '500px', height: '500px' }}
                />
                <Card.Title className={styles.creator}>{meme.creatorId}</Card.Title>
            </Card.Body>
            <Card.Footer className={styles.footer}>
                <Button className={styles.dootIcon} onClick={updoot}>
                    <GoArrowUp style={{ color: 'green' }} size={20} />
                </Button>
                <Button className={styles.dootIcon} onClick={downdoot}>
                    <GoArrowDown style={{ color: 'red' }} size={20} />
                </Button>
                <span>{value}</span>
            </Card.Footer>
        </Card>
    )
}

export default MemeCard
