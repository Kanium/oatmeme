import { ObjectId } from 'mongodb'
import { APIMeme, Meme, MemeQuery } from '../models/Meme.model'
import { ResponseError } from '../models/ResponseError.model'
import MongoConnector from '../utils/MongoConnector'

export class MemeService {
    private static _instance: MemeService
    public static get instance() {
        if (!this._instance) {
            this._instance = new MemeService()
        }
        return this._instance
    }

    public static instanceWithConnection(connector?: MongoConnector) {
        MemeService._instance = new MemeService(connector)
        return MemeService._instance
    }

    public get collection () {
        return this._mongo.collection<Meme>('meme')
    }

    constructor(private _mongo: MongoConnector = MongoConnector.instance) {}

    public async get(id: string | ObjectId) {
        const oId = new ObjectId(id)
        const obj = await this.collection.findOne({ _id: oId })
        return obj
    }

    public async list() {
        const cursor = await this.collection.find({})
        const array = await cursor.toArray()
        return array
    }

    public async create(meme: Meme) {
        await this.collection.insertOne(meme)
    }

    public async update(id: string | ObjectId, updateObj: Partial<APIMeme>) {
        const oId = new ObjectId(id)

        delete updateObj.createdAt
        delete updateObj.creatorId
        delete updateObj.id
        updateObj.updatedAt = new Date()

        const updated = await this.collection.findOneAndUpdate({ _id: oId }, updateObj)
        if (!updated.ok || !updated.value) {
            throw new ResponseError('Error occured while updating', 500)
        }

        return new Meme(updated.value)
    }

    public async delete(id: string | ObjectId) {
        const oId = new ObjectId(id)
        await this.collection.findOneAndDelete({ _id: oId })
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

        if (queryObj.query.creatorId) {
            mongoQuery.$and.push({ creatorId: queryObj.query.creatorId })
        }

        const cursor = await this.collection.find(mongoQuery.$and.length ? mongoQuery : {})
        return cursor
    }
}
