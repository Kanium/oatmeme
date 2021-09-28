import React from 'react'
import Meme from '../../models/meme.model'
import List from './List'
import Mason from './Mason'

export interface VirtScrollProps {
    items: Meme[]
    mason: boolean
}

const VirtScroll: React.FC<VirtScrollProps> = ({ items, mason }: VirtScrollProps) => {
    return mason ? <Mason /> : <List arr={items} />
}

export default VirtScroll
