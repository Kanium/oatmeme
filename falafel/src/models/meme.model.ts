export default interface Meme {
    id: string
    name: string
    data: string //TODO bad naming this should pe picture or something
    updoots: number
    downdoots: number
    creatorId: string
    createdAt: Date
    updatedAt: Date
}
