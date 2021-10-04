import React, { CSSProperties } from 'react'
import Meme from '../../../../models/meme.model'
import MemeCard from '../../../Card'

interface ListItemProps {
    key: string | number
    style: CSSProperties
    isScrolling: boolean
    isVisible: boolean
    item: Meme
}

const ListItem: React.FC<ListItemProps> = ({ key, style, isScrolling, isVisible, item }: ListItemProps) => {
    const container = isScrolling ? '... scrolling' : <MemeCard meme={item} />

    return (
        <div  key={key} style={{ display: isVisible ? 'initial' : 'hidden', ...style }}>
            {container}
        </div>
    )
}

export default ListItem
