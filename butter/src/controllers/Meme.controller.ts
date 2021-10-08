import { MemeService } from '../services/Meme.service'
import { Logger } from '../utils/Logger'
import { Accept, DELETE, GET, PATCH, Path, PathParam, POST } from 'typescript-rest'
import { Tags } from 'typescript-rest-swagger'
import { BaseController } from './BaseController'
import { Request, Response } from 'express'
import { APIMeme, Meme } from '../models/Meme.model'
import { AuthService } from '../services/Auth.service'
import { APIMemer } from '../models/Memer.model'
import { ResponseError } from '../models/ResponseError.model'

@Tags('memes')
@Accept('text/plain')
@Path('/memes')
export class MemeController extends BaseController {
    private _logger: Logger

    constructor() {
        super()
        this._logger = new Logger('MemeController')
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
    private async _get(@PathParam('id') memeId: string) {
        const meme = await MemeService.instance.get(memeId)
        if (!meme) {
            throw new ResponseError('Meme doesnt exist', 204)
        }
        return meme?.toJson()
    }

    @GET
    private async _list() {
        const memes = await MemeService.instance.list()
        return memes.map((m) => m.toJson())
    }

    @POST
    private async _create(meme: APIMeme) {
        const newMeme = Meme.fromJson(meme)
        await MemeService.instance.create(newMeme)
        return newMeme.toJson()
    }

    @PATCH
    @Path(':id')
    private async _update(@PathParam('id') memeId: string, meme: Partial<APIMeme>) {
        const updated = await MemeService.instance.update(memeId, meme)
        return updated.toJson()
    }

    @DELETE
    @Path(':id')
    private async _delete(@PathParam('id') memeId: string) {
        await MemeService.instance.delete(memeId)
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
