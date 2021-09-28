import React from 'react'
// import useArray from '../../utils/customHooks/useArray'
import Meme from '../../models/meme.model'
import useAsync from '../../utils/customHooks/useAsync'
import { List } from 'react-virtualized'
import ReactDOM from 'react-dom'
import { MemeCard } from './memeCard'
export interface ListProps {}
const { loading, error, value } = useAsync(async (): Promise<Meme[]> => {
    const dumy: Meme[] = [
        {
            id: '1',
            name: 'test1',
            data: 'https://imgur.com/t/funny/tgu9QMB',
            updoots: 0,
            downdoots: 9001,
            creatorId: 'shithead1',
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            id: '2',
            name: 'test2',
            data: 'https://imgur.com/t/funny/tgu9QMB',
            updoots: 0,
            downdoots: 9001,
            creatorId: 'shithead1',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '3',
            name: 'test3',
            data: 'https://imgur.com/t/funny/tgu9QMB',
            updoots: 0,
            downdoots: 9001,
            creatorId: 'shithead2',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '4',
            name: 'test4',
            data: 'https://imgur.com/t/funny/tgu9QMB',
            updoots: 0,
            downdoots: 9001,
            creatorId: 'shithead1',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '5',
            name: 'test5',
            data: 'https://imgur.com/t/funny/tgu9QMB',
            updoots: 0,
            downdoots: 9001,
            creatorId: 'shithead9',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '6',
            name: 'test6',
            data: 'https://imgur.com/t/funny/tgu9QMB',
            updoots: 0,
            downdoots: 9001,
            creatorId: 'shithead3',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '7',
            name: 'test7',
            data: 'https://imgur.com/t/funny/tgu9QMB',
            updoots: 0,
            downdoots: 9001,
            creatorId: 'shithead8',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]
    await new Promise((f) => setTimeout(f, 5000))
    return dumy // TODO axios to api
})
interface IListControl {
    key: string // Unique key within array of rows
    index: number // Index of row within collection
    isScrolling: boolean // The List is currently being scrolled
    isVisible: boolean // This row is visible within the List (eg it is not an overscanned row)
    style: any // Style object to be applied to row (to position it)
}

//FIXME i dont know the right convention here
function rowRenderer({ key, style, index, isScrolling, isVisible }: Partial<IListControl>) {
    const memeber = (value! as Meme[])[index!]
    const container = isScrolling ? '... scrolling' : <MemeCard meme={memeber} />
    if (isVisible) {
        return (
            <div key={key} style={style}>
                {container}
            </div>
        )
    } else {
        <div key={key} style={style}>
            ...
        </div>
    }
}
// eslint-disable-next-line no-empty-pattern
const ListScroll = ({}: ListProps) => {
    // const memes = useArray<Meme[]>()

    return (
        <div>
            {loading ? (
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            ) : error ? (
                <div className="alert alert-danger" role="alert">
                    This is a danger alert—check it out!
                </div>
            ) : value ? (
                <p> anything </p>
            ) : (
                <p>Empty List !!!</p>
            )}
        </div>
    )
}

ReactDOM.render(
    <List width={300} height={300} rowCount={(value! as Meme[]).length} rowHeight={20} rowRenderer={rowRenderer} />,
    document.getElementById('example')
)
export default ListScroll
