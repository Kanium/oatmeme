import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { MemeService } from '../services/Meme.service'

export class MemeValidator {
    public static async userAllowedToPerformAction(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const memer = req.user?.memer
        const result = await MemeService.instance.query({
            query: {
                creatorId: memer.id
            }
        })

        while (await result.hasNext()) {
            const r = await result.next()
            const oId = new ObjectId(req.params.id)
            if (r?._id === oId) {
                next()
                return
            }
        }

        res.status(403).send('You are not authorized to perform this update')
    }
}
