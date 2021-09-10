import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Memer } from '../models/Memer.model'
import MongoConnector from '../utils/MongoConnector'

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    issuer: 'http://oatme.me'
}

passport.use(
    new Strategy(opts, async (payload, done) => {
        try {
            const user = await MongoConnector.instance
                .collection<Memer>('memer')
                .findOne({ username: payload.username })
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
