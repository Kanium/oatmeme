import { Algorithm, Secret, SignOptions, sign } from 'jsonwebtoken'
import { genSalt, hash } from 'bcrypt'
import { APIMemer } from '../models/Memer.model'

export class AuthService {
    private static _instance: AuthService
    public static get instance() {
        if (!this._instance) {
            this._instance = new AuthService()
        }
        return this._instance
    }

    public generateToken(memer: APIMemer, payload?: any) {
        const algorithm: Algorithm = 'RS256'
        const options: SignOptions = { algorithm: algorithm, expiresIn: '1d' } // , issuer: 'oatmeme' }
        const secret: Secret = process.env.JWT_SECRET!

        const token = sign(memer, secret, options)

        return { token, payload, memer }
    }

    public async generateSaltedPassword(password: string) {
        const saltrouds = Number(process.env.PASSWORD_SALTROUNDS) ?? 10
        const salt = await genSalt(saltrouds)
        return await hash(password, salt)
    }
}
