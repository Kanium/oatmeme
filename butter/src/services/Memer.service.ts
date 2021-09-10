import { Collection, ObjectId } from 'mongodb'
import { Memer } from '../models/Memer.model'
import MongoConnector from '../utils/MongoConnector'

export class MemerService {
    private static _instance: MemerService
    public static get instance() {
        if (!this._instance) {
            this._instance = new MemerService()
        }
        return this._instance
    }

    private _db: Collection<Memer>

    constructor() {
        this._db = MongoConnector.instance.collection<Memer>('memer')
    }

    public async get(id: string | ObjectId) {
        const oId = new ObjectId(id)
        const obj = await this._db.findOne({ _id: oId })
        return obj
    }

    public async getByUsername(username: string) {
        const obj = await this._db.findOne({ username: username })
        return obj
    }

    public async list() {
        const cursor = await this._db.find({})
        const array = await cursor.toArray()
        return array
    }

    public async create(meme: Memer) {
        await this._db.insertOne(meme)
    }

    public async update(id: string | ObjectId, updateObj: Partial<Memer>) {
        const oId = new ObjectId(id)

        delete updateObj._id
        delete updateObj.createdAt
        delete updateObj.username

        updateObj.updatedAt = new Date()

        await this._db.findOneAndUpdate({ _id: oId }, updateObj)
    }

    public async remove(id: string | ObjectId) {
        const oId = new ObjectId(id)
        await this._db.findOneAndDelete({ _id: oId })
    }
}
