import React from 'react'
import styles from './styles.module.css'

interface EntryProps {
    key: any
    index: number
    list: any[]
    loadedMap: any
}

const Entry: React.FC<EntryProps> = ({ key, index, list, loadedMap }: EntryProps) => {

    // @ts-ignore
    const row = list.get(index);
    let content;

    if (loadedMap[index] === 2) {
      content = row.name;
    } else {
      content = (
        <div className={styles.placeholder} style={{width: row.size}} />
      );
    }

    return (
      <div className={styles.row} key={key} style={styles}>
        {content}
      </div>
    );
}

export default Entry