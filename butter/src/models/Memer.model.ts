import { Document, ObjectId } from 'mongodb'
import Validate from '../utils/Validate'

export interface APIMemer {
    id: string
    username: string
    displayName?: string
    discordUserId?: string
    profilePic?: string
    createdAt: Date
    updatedAt: Date
}

export interface PatchMemerRequest {
    username?: string
    displayName?: string
    discordUserId?: string
    profilePic?: string
}

export interface CreateMemerRequest {
    username: string
    password: string
    displayName?: string
    discordUserId?: string
    profilePic?: string
}

export interface MemerDocument extends Document {
    _id: ObjectId
    username: string
    password: string
    displayName?: string
    discordUserId?: string
    profilePic?: string
    createdAt: Date
    updatedAt: Date
}

export class Memer implements MemerDocument {
    public static fromJson(dict: APIMemer & { password: string }) {
        const doc: MemerDocument = {
            _id: new ObjectId(dict.id),
            username: dict.username,
            password: dict.password,
            displayName: dict.displayName,
            discordUserId: dict.discordUserId,
            profilePic: dict.profilePic,
            createdAt: dict.createdAt,
            updatedAt: dict.updatedAt
        }

        return new Memer(doc)
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

    public toJson(): APIMemer {
        return {
            id: this._id.toHexString(),
            username: this.username,
            displayName: this.displayName,
            discordUserId: this.discordUserId,
            profilePic: this.profilePic,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
}
