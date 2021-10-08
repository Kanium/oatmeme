import React, { useRef } from 'react'
import { AutoSizer, CellMeasurer, CellMeasurerCache, List as VirtualList } from 'react-virtualized'
import Meme from '../../../models/meme.model'
import MemeCard from '../../Card'
// import ListItem from './ListItem'

export interface ListProps {
    arr: Meme[]
}

//     key: string // Unique key within array of rows
//     index: number // Index of row within collection
//     isScrolling: boolean // The List is currently being scrolled
//     isVisible: boolean // This row is visible within the List (eg it is not an overscanned row)
//     style: any // Style object to be applied to row (to position it)

const List: React.FC<ListProps> = ({ arr }: ListProps) => {
    const cache = useRef<CellMeasurerCache>(
        new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 500,
            defaultWidth: 500
        })
    )

    // const generateRow = ({ key, style, index, isScrolling, isVisible }: any) => {
    //     return <ListItem key={key} style={style} isScrolling={isScrolling} isVisible={isVisible} item={arr[index]} />
    // }

    return (
        <AutoSizer>
            {({ width, height }) => {
                return (
                    <VirtualList
                        deferredMeasurementCache={cache.current}
                        width={width}
                        height={height}
                        rowCount={arr.length}
                        rowHeight={cache.current.rowHeight}
                        rowRenderer={({ key, style, index, isScrolling, isVisible, parent }) => {
                            //Like this or not we need to let cell measure wrap this and access same cache as this propertiy
                            const item = arr[index]
                            const container = isScrolling ? '... scrolling' : <MemeCard meme={item} /> // Add skeleton of memecard for scrolling
                            // https://www.youtube.com/watch?v=ZVug65gW-fc

                            return (
                                <CellMeasurer
                                    key={key}
                                    cache={cache.current}
                                    parent={parent}
                                    columnIndex={0}
                                    rowIndex={index}>
                                    <div style={{ display: isVisible ? 'initial' : 'hidden', ...style }}>
                                        {container}
                                    </div>
                                </CellMeasurer>
                            )
                        }}
                    />
                )
            }}
        </AutoSizer>
    )
}

export default List


{/* <InfiniteLoader isRowLoaded={() => true} loadMoreRows={loadMore} rowCount={data.length}>
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
</InfiniteLoader> */}
