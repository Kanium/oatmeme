import { Collection, Db, MongoClient } from 'mongodb'

export default class MongoConnector<T extends Document> {
    private _client: MongoClient | null
    private _db: Db | null
    private _collection: Collection<T> | null
    private _promise: Promise<void> | null

    public get collection() {
        return this._collection
    }

    constructor(_collectionName: string) {
        this._client = null
        this._db = null
        this._collection = null
        this._promise = this._initlize(_collectionName)
    }

    private async _initlize(_collectionName: string) {
        this._client = await MongoClient.connect('', {})
        this._db = this._client.db()
        this._collection = this._db.collection(_collectionName)
    }

    public async awaitConnection() {
        if (this._promise) {
            await this._promise
        }
    }
}
