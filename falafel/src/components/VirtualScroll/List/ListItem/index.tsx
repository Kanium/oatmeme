import React, { CSSProperties } from 'react'
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import { MeasuredCellParent } from 'react-virtualized/dist/es/CellMeasurer'
import Meme from '../../../../models/meme.model'
import MemeCard from '../../../Card'

interface ListItemProps {
    key: string | number
    index: number
    style: CSSProperties
    isScrolling: boolean
    isVisible: boolean
    item: Meme
    parent: MeasuredCellParent
    cache: CellMeasurerCache
}

const ListItem: React.FC<ListItemProps> = ({
    key,
    style,
    index,
    isScrolling,
    isVisible,
    item,
    parent,
    cache
}: ListItemProps) => {
    // Add skeleton of memecard for scrolling
    // https://www.youtube.com/watch?v=ZVug65gW-fc

    return (
        <CellMeasurer key={key} cache={cache} parent={parent} columnIndex={0} rowIndex={index}>
            <div style={{ display: isVisible ? 'initial' : 'hidden', ...style }}>
                <MemeCard meme={item} skeleton={isScrolling} />
            </div>
        </CellMeasurer>
    )
}

export default ListItem
