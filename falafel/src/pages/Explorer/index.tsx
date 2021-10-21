import React from 'react'
import { Container } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import Header from '../../components/Header'
import VirtualScroll from '../../components/VirtualScroll'
import Meme from '../../models/meme.model'
import useAsync from '../../utils/customHooks/useAsync'
import styles from './styles.module.css'

export interface ExploreProps {

}

const Explore: React.FC = () => {

    const genRandomInt = (min: number, max: number) => {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    const imagesArr = [
        'https://i.imgur.com/tgu9QMB.png',
        'https://i.pinimg.com/originals/0a/4d/cb/0a4dcb92fa2d3c601b58d72720d6bec4.jpg',
        'https://wallpapercave.com/wp/wp4600617.jpg'
    ]

    const generator = (t: number) => {
        const memes: Meme[] = []
        for (let i = 0; i < t; i++) {
            const image = imagesArr[genRandomInt(0, imagesArr.length - 1)]
            memes.push({
                id: 'id#' + i,
                name: 'test' + i,
                data: image,
                updoots: 0,
                downdoots: 9001,
                creatorId: 'someshithead' + i,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        }
        return memes
    }

    const { loading, error, value } = useAsync<Meme[]>(async (): Promise<Meme[]> => {
        const dumy: Meme[] = generator(1000)
        await new Promise((f) => setTimeout(f, 1000))
        return dumy // TODO axios to api
    })

    return (
        <div>
            <Helmet>
                <title>OatMeme - Explore</title>
            </Helmet>
            <div>
                <Header name={'test'} />
                <Container className={styles.container}> 
                    {error ? (
                        <div className="alert alert-danger" role="alert">
                            Bad stuff is happening oh no
                        </div>
                    ) : null}
                    {value ? <VirtualScroll mason={false} items={value} /> : null}
                    {loading ? (
                        <div className="spinner-border text-secondary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : null}
                </Container>
            </div>
        </div>
    )
}

export default Explore
