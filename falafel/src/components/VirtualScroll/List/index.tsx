import React, { useRef } from 'react'
import { AutoSizer, CellMeasurerCache, List as VirtualList } from 'react-virtualized'
import Meme from '../../../models/meme.model'
import ListItem from './ListItem'
import styles from './styles.module.css'

export interface ListProps {
    arr: Meme[]
}

const List: React.FC<ListProps> = ({ arr }: ListProps) => {
    const cache = useRef<CellMeasurerCache>(
        new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 500,
            defaultWidth: 500
        })
    )

    return (
        <AutoSizer>
            {({ width, height }) => {
                return (
                    <VirtualList
                        className={styles.list}
                        deferredMeasurementCache={cache.current}
                        width={width}
                        height={height}
                        rowCount={arr.length}
                        rowHeight={cache.current.rowHeight}
                        rowRenderer={({ key, style, index, isScrolling, isVisible, parent }) => (
                            <ListItem
                                key={key}
                                index={index}
                                style={style}
                                isScrolling={isScrolling}
                                isVisible={isVisible}
                                item={arr[index]}
                                parent={parent}
                                cache={cache.current}
                            />
                        )}
                    />
                )
            }}
        </AutoSizer>
    )
}

export default List
