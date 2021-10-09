import { NextFunction, Request, Response } from 'express'
import { MemerService } from '../services/Memer.service'

export class MemerValidator {
    public static async userAllowedToPerformAction(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const memer = req.user?.memer
        const result = await MemerService.instance.get(memer.id)

        if (result) {
            next()
            return
        }

        res.status(403).send('You are not authorized to perform this update')
    }
}
