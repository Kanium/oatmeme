import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { MemerService } from '../services/Memer.service'

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    issuer: 'http://oatme.me'
}

passport.use(
    new Strategy(opts, async (payload, done) => {
        try {
            const user = await MemerService.instance.getByUsername(payload.username)
            if (!user) {
                return done(null, false, { message: 'could not find the user' })
            }
            return done(null, user)
        } catch (error) {
            done(error)
        }
    })
)

module.exports = passport
