import { ObjectId } from 'mongodb'
import { CreateMemerRequest, Memer, PatchMemerRequest } from '../models/Memer.model'
import { ResponseError } from '../models/ResponseError.model'
import { deleteEmpty as clearEmpty } from '../utils'
import MongoConnector from '../utils/MongoConnector'

export class MemerService {
    private static _instance: MemerService
    public static get instance() {
        if (!this._instance) {
            this._instance = new MemerService()
        }
        return this._instance
    }

    public static instanceWithConnection(connector?: MongoConnector) {
        MemerService._instance = new MemerService(connector)
        return MemerService._instance
    }

    public get collection () {
        return this._mongo.collection<Memer>('meme')
    }

    constructor(private _mongo: MongoConnector = MongoConnector.instance) {}

    public async get(id: string | ObjectId) {
        const oId = new ObjectId(id)
        const obj = await this.collection.findOne({ _id: oId })
        return obj
    }

    public async getByUsername(username: string) {
        const obj = await this.collection.findOne({ username: username })
        return obj
    }

    public async list() {
        const cursor = await this.collection.find({})
        const array = await cursor.toArray()
        return array
    }

    public async create(meme: CreateMemerRequest) {
        const newMemer = new Memer(meme)
        await this.collection.insertOne(newMemer)
        return newMemer
    }

    public async update(id: string | ObjectId, updateObj: PatchMemerRequest) {
        const oId = new ObjectId(id)

        let update: { [key: string]: any } = Object.assign({}, updateObj, { updatedAt: new Date() })
        update = clearEmpty(update)

        const updated = await this.collection.findOneAndUpdate({ _id: oId }, update)
        if (!updated.ok || !updated.value) {
            throw new ResponseError('Error occured while updating', 500)
        }

        return new Memer(updated.value)
    }

    public async delete(id: string | ObjectId) {
        const oId = new ObjectId(id)
        await this.collection.findOneAndDelete({ _id: oId })
    }
}
