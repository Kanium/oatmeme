import { Logger } from '../utils/Logger'
import { Accept, DELETE, GET, PATCH, Path, POST } from 'typescript-rest'
import { Tags } from 'typescript-rest-swagger'
import { BaseController } from './BaseController'
import { Request, Response } from 'express'
import { AuthService } from '../services/Auth.service'
import { APIMemer, CreateMemerRequest, PatchMemerRequest } from '../models/Memer.model'
import { ResponseError } from '../models/ResponseError.model'
import { MemerService } from '../services/Memer.service'

@Tags('memers')
@Accept('text/plain')
@Path('/memers')
export class MemerController extends BaseController {
    private _logger: Logger

    constructor() {
        super()
        this._logger = new Logger('MemerController')
    }

    protected resolve(req: Request, res: Response, func: (req: Request) => any, log?: (obj: any) => void) {
        return super.resolve(
            req,
            res,
            () => {
                // @ts-ignore
                const memer = req.user?.memer as any as APIMemer
                const res = func(req)
                const token = AuthService.instance.generateToken(memer, res)
                return token
            },
            log
        )
    }

    @GET
    @Path(':id')
    private async _get(memerId: string) {
        const memer = await MemerService.instance.get(memerId)
        if (!memer) {
            throw new ResponseError('Memer doesnt exist', 204)
        }
        return memer?.toJson()
    }

    @GET
    private async _list() {
        const memers = await MemerService.instance.list()
        return memers.map((m) => m.toJson())
    }

    @POST
    private async _create(memer: CreateMemerRequest) {
        const newMemer = await MemerService.instance.create(memer)
        return newMemer.toJson()
    }

    @PATCH
    @Path(':id')
    private async _update(memerId: string, memer: PatchMemerRequest) {
        const updated = await MemerService.instance.update(memerId, memer)
        return updated.toJson()
    }

    @DELETE
    @Path(':id')
    private async _delete(memerId: string) {
        await MemerService.instance.delete(memerId)
    }

    public get(req: Request, res: Response) {
        return this.resolve(req, res, (req: Request) => this._get(req.params.id), this._logger.error)
    }

    public list(req: Request, res: Response) {
        return this.resolve(req, res, () => this._list(), this._logger.error)
    }

    public create(req: Request, res: Response) {
        return this.resolve(req, res, (req: Request) => this._create(req.body), this._logger.error)
    }

    public update(req: Request, res: Response) {
        return this.resolve(req, res, (req: Request) => this._update(req.params.id, req.body), this._logger.error)
    }

    public delete(req: Request, res: Response) {
        return this.resolve(req, res, (req: Request) => this._delete(req.params.id), this._logger.error)
    }
}
