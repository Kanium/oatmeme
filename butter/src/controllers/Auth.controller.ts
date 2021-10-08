import { MemerService } from '../services/Memer.service'
import { Logger } from '../utils/Logger'
import { Accept, Path, POST } from 'typescript-rest'
import { Tags } from 'typescript-rest-swagger'
import { Request, Response } from 'express'
import { ResponseError } from '../models/ResponseError.model'
import { BaseController } from './BaseController'
import { compare } from 'bcrypt'
import { APIMemer, Memer } from '../models/Memer.model'
import { AuthService } from '../services/Auth.service'

@Tags('Auth')
@Accept('text/plain')
@Path('/')
export class AuthController extends BaseController {
    private _logger: Logger

    constructor() {
        super()
        this._logger = new Logger('AuthController')
    }

    @POST
    @Path('/login')
    public async _login(body: { username: string; password: string }) {
        const memer = await MemerService.instance.getByUsername(body.username)
        if (!memer) {
            throw new ResponseError('User does not exist', 404)
        }

        const correctLogin = await compare(memer.password, body.password)
        if (correctLogin) {
            return AuthService.instance.generateToken(memer.toJson(), memer.toJson())
        } else {
            throw new ResponseError('Incorrect login details', 401)
        }
    }

    @POST
    @Path('/register')
    private async _register(body: APIMemer & { password: string }) {
        body.password = await AuthService.instance.generateSaltedPassword(body.password)
        const memer = Memer.fromJson(body)
        await MemerService.instance.create(memer)
        const token = AuthService.instance.generateToken(memer.toJson(), memer.toJson())
        return token
    }

    public login(req: Request, res: Response) {
        return this.resolve(req, res, (req: Request) => this._login(req.body), this._logger.error)
    }
    public register(req: Request, res: Response) {
        return this.resolve(req, res, (req: Request) => this._register(req.body), this._logger.error)
    }
}
