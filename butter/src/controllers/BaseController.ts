import { Request, Response } from 'express'

export abstract class BaseController {
    protected resolve(req: Request, res: Response, func: (req: Request) => any, log?: (obj: any) => void) {
        try {
            const res = func(req)
            res.json(res)
        } catch (error: any) {
            error.status = error.status ?? 500
            error.message = error.message ?? 'Something Went Wrong'
            error.stack = error.stack ?? {}

            res.status(error.status).send(error.message)
            if (log) {
                log(error)
            }
        }
    }
}
