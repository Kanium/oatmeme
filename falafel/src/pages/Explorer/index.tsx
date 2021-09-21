import React from 'react'
import styles from './styles.module.css'
import { Helmet } from 'react-helmet'
import { List, InfiniteLoader, AutoSizer } from 'react-virtualized'

interface ExploreProps {}

const Explore: React.FC = (props: ExploreProps) => {
    const data = []
    const size = 10
    const loadMore = (): Promise<void> => {
        return new Promise(() => {})
    }
    const render = () => (<div></div>)

    return (
        <div>
            <Helmet>
                <title>OatMeme - Explore</title>
            </Helmet>
            <div>
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
