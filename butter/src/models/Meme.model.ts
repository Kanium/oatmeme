import { Dictionary } from 'lodash'
import { Document, ObjectId } from 'mongodb'
import Validate from '../utils/Validate'

export interface MemeDocument extends Document {
    _id: ObjectId
    name: string
    data: string
    updoots: number
    downdoots: number
    creatorId: ObjectId
    createdAt: Date
    updatedAt: Date
}

export interface MemeQuery {
    query: {
        name?: string
        updoots?: number
        downdoots?: number
        createdAt?: Date
        createFrom?: Date
    }
    sort?: {
        order: 'ASC' | 'DES'
        field: ''
    }
}

export class Meme implements MemeDocument {
    public static fromJson(dict: Dictionary<string>) {
        return new Meme(dict)
    }

    public _id: ObjectId
    public name: string
    public data: string
    public updoots: number
    public downdoots: number
    public creatorId: ObjectId
    public createdAt: Date
    public updatedAt: Date

    constructor(meme: Partial<Meme>) {
        this._id = Validate.ObjectId(meme._id, 'meme._id', true)
        this.name = Validate.String(meme.name, 'meme.name')
        this.data = Validate.String(meme.data, 'meme.data')
        this.updoots = meme.updoots ?? 0
        this.downdoots = meme.downdoots ?? 0
        this.creatorId = Validate.ObjectId(meme.creatorId, 'meme.creatorId')
        this.createdAt = meme.createdAt ?? new Date()
        this.updatedAt = meme.updatedAt ?? this.createdAt
    }

    public toJson() {
        return {
            _id: this._id.toHexString(),
            name: this.name,
            data: this.data,
            updoots: this.updoots,
            downdoots: this.downdoots,
            creatorId: this.creatorId.toHexString(),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
}
