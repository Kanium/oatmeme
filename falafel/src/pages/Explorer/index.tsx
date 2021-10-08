import React from 'react'
import { Container } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import Header from '../../components/Header'
import VirtualScroll from '../../components/VirtualScroll'
import Meme from '../../models/meme.model'
import useAsync from '../../utils/customHooks/useAsync'
import styles from './styles.module.css'
import { Helmet } from 'react-helmet'
import { List, InfiniteLoader, AutoSizer } from 'react-virtualized'

export interface ExploreProps {

}

const Explore: React.FC = (props: ExploreProps) => {
    const data = []
    const size = 10
    const loadMore = (): Promise<void> => {
        return new Promise(() => {})
    }
    const render = () => (<div></div>)

    const generator = (t: number) => {
        const memes: Meme[] = []
        for (let i = 0; i < t; i++) {
            memes.push({
                id: 'id#' + i,
                name: 'test' + i,
                data: 'https://i.imgur.com/tgu9QMB.png',
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
                <Container className="d-flex justify-content-center"> 
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
                <InfiniteLoader isRowLoaded={() => true} loadMoreRows={loadMore} rowCount={data.length}>
                    {({ onRowsRendered, registerChild }) => (
                        <AutoSizer disableHeight>
                            {({ width }) => (
                                <List
                                    ref={registerChild}
                                    className={styles.List}
                                    height={200}
                                    onRowsRendered={onRowsRendered}
                                    rowCount={data.length}
                                    rowHeight={30}
                                    rowRenderer={render}
                                    width={width}
                                />
                            )}
                        </AutoSizer>
                    )}
                </InfiniteLoader>
            </div>
        </div>
    )
}

export default Explore
