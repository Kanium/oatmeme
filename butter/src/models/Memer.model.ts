import { Dictionary } from 'lodash'
import { Document, ObjectId } from 'mongodb'
import Validate from '../utils/Validate'

export interface MemerDocument extends Document {
    _id: ObjectId
    username: string
    password: string
    discordUserId?: string
    profilePic?: string
    createdAt: Date
    updatedAt: Date
}

export class Memer implements MemerDocument {
    public static fromJson(dict: Dictionary<string>) {
        return new Memer(dict)
    }

    public _id: ObjectId
    public username: string
    public password: string
    public displayName?: string
    public discordUserId?: string
    public profilePic?: string
    public createdAt: Date
    public updatedAt: Date

    constructor(meme: Partial<Memer>) {
        this._id = Validate.ObjectId(meme._id, 'meme._id', true)
        this.username = Validate.String(meme.username, 'meme.username')
        this.password = Validate.String(meme.password, 'meme.password')
        this.displayName = meme.displayName
        this.discordUserId = meme.discordUserId
        this.profilePic = meme.profilePic
        this.createdAt = meme.createdAt ?? new Date()
        this.updatedAt = meme.updatedAt ?? this.createdAt
    }

    public toJson() {
        return {
            _id: this._id.toHexString(),
            username: this.username,
            password: this.password,
            displayName: this.displayName,
            discordUserId: this.discordUserId,
            profilePic: this.profilePic,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
}
