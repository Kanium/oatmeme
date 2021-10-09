import { Db, MongoClient, Document, Collection } from 'mongodb'

export default class MongoConnector {
    private static _instance: MongoConnector
    public static get instance() {
        if (!this._instance) {
            this._instance = new MongoConnector()
        }
        return this._instance
    }
    public static heartbeatInterval = Number(process.env.HEATLH_CHECK_INTERVAL) ?? 3.6e6 // 1 hour

    private _client: MongoClient | null
    private _db: Db | null
    private _promise: Promise<void> | null
    private _interval: NodeJS.Timer | null

    public get db () {
        return this._db
    }

    public collection<T extends Document>(collectionName: string) {
        return this._db?.collection<T>(collectionName) as Collection<T>
    }

    public async healthCheck() {
        const stats = await this._db?.stats()
        if (!stats || !stats.ok) {
            throw Error('Mongo not connected')
        }
        return stats.ok
    }

    constructor(db?: string) {
        this._client = null
        this._db = null
        this._interval = null
        const user_pwd = process.env.MONOG_USER ? `${process.env.MONOG_USER}:${process.env.MONOG_PASSWORD}@` : '' //this allows me to localy dev database
        const uri = `mongodb${process.env.MONGO_PREFIX ?? ''}://${user_pwd}${process.env.MONGO_HOST ?? 'localhost:27017'}/${ db ?? process.env.MOGNO_DB }?retryWrites=true&w=majority`

        this._promise = this._connect(uri, db)
    }

    private async _connect(uri: string, db?: string) {
        this._client = await MongoClient.connect(uri)
        this._db = this._client.db(db)
        this._promise = null
        this._interval = setInterval(this.healthCheck, MongoConnector.heartbeatInterval)
    }

    public async awaitConnection() {
        if (this._promise) {
            await this._promise
        }
    }

    public async close() {
        if (this._interval) {
            clearInterval(this._interval)
            this._interval = null
        }
        await this._client?.close()
    }
}
