import { Collection, ObjectId } from 'mongodb'
import { Meme, MemeQuery } from '../models/Meme.model'
import MongoConnector from '../utils/MongoConnector'

export class MemeService {
    private static _instance: MemeService
    public static get instance() {
        if (!this._instance) {
            this._instance = new MemeService()
        }
        return this._instance
    }

    private _db: Collection<Meme>

    constructor() {
        this._db = MongoConnector.instance.collection<Meme>('meme')
    }

    public async get(id: string | ObjectId) {
        const oId = new ObjectId(id)
        const obj = await this._db.findOne({ _id: oId })
        return obj
    }

    public async list() {
        const cursor = await this._db.find({})
        const array = await cursor.toArray()
        return array
    }

    public async create(meme: Meme) {
        await this._db.insertOne(meme)
    }

    public async update(id: string | ObjectId, updateObj: Partial<Meme>) {
        const oId = new ObjectId(id)

        delete updateObj._id
        delete updateObj.createdAt
        updateObj.updatedAt = new Date()

        await this._db.findOneAndUpdate({ _id: oId }, updateObj)
    }

    public async remove(id: string | ObjectId) {
        const oId = new ObjectId(id)
        await this._db.findOneAndDelete({ _id: oId })
    }

    public async query(queryObj: MemeQuery) {
        const mongoQuery: any = { $and: [] }

        if (queryObj.query.createFrom) {
            mongoQuery.$and.push({ createdAt: { $gte: queryObj.query.createFrom } })
        } else if (queryObj.query.createdAt) {
            mongoQuery.$and.push({ createdAt: { $eq: queryObj.query.createFrom } })
        }

        if (queryObj.query.name) {
            mongoQuery.$and.push({ name: queryObj.query.name })
        }

        if (queryObj.query.updoots) {
            mongoQuery.$and.push({ updoots: { $gte: queryObj.query.updoots } })
        } else if (queryObj.query.downdoots) {
            mongoQuery.$and.push({ downdoots: { $lte: queryObj.query.downdoots } })
        }

        const cursor = await this._db.find(mongoQuery.$and.length ? mongoQuery : {})
        return cursor
    }
}
