import React from 'react'
import ListScroll from './List'
// import styles from './styles.module.css'
import MasonScroll from './Mason'

export interface VirtScrollProps {
    mason: boolean
}

// eslint-disable-next-line no-empty-pattern
const VirtScroll = ({ mason }: VirtScrollProps) => {
    if (mason) {
        return <MasonScroll />
    } else {
        return <ListScroll />
    }
}

VirtScroll.defaultProps = { //TODO do this the right way
    mason: false
}

export default VirtScroll
