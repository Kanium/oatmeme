import React from 'react'
import { List as VirtualList } from 'react-virtualized'
import Meme from '../../../models/meme.model'
import ListItem from './ListItem'

export interface ListProps {
    arr: Meme[]
}

//     key: string // Unique key within array of rows
//     index: number // Index of row within collection
//     isScrolling: boolean // The List is currently being scrolled
//     isVisible: boolean // This row is visible within the List (eg it is not an overscanned row)
//     style: any // Style object to be applied to row (to position it)

const List: React.FC<ListProps> = ({ arr }: ListProps) => {
    const generateRow = ({ key, style, index, isScrolling, isVisible }: any) => {
        return <ListItem key={key} style={style} isScrolling={isScrolling} isVisible={isVisible} item={arr[index]} />
    }

    return <VirtualList width={250} height={250} rowCount={arr.length} rowHeight={250} rowRenderer={generateRow} />
}

export default List
