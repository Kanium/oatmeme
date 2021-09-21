import { Router, Request, Response } from 'express'
import jwt, { Secret, SignOptions } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { MemerService } from '../services/Memer.service'
const router = Router()

interface User {
    username: string
    password: string
}

router.post('/login', async (req: Request, res: Response) => {
    try {
        const body: User = req.body
        const user = await MemerService.instance.getByUsername(body.username)
        if (!user) {
            res.status(404).send('User Not found') //FIXME
        }

        if (await bcrypt.compare(user!.password, body.password)) {
            const algorithm: jwt.Algorithm = 'RS256' //this must be specific ...
            const options: SignOptions = { algorithm: algorithm, expiresIn: '1h' } //TODO Experation
            const secret: Secret = process.env.JWT_SECRET!

            const token = jwt.sign(user!, secret, options)
            const display_user = user //TODO obviously placeholder, strip all unwanted fields from user var here

            res.status(200).json({ token: token, user: display_user, experation: 3600, message: 'login successfull' })
        }
        res.status(203).json({  message: 'invalid password' })

    } catch (error) {
        res.status(500).send('Placeholder error message') //FIXME
    }
})

router.post('/register', (req: Request, res: Response) => {
    //how to hash in bcrypt using salt
    const entry = req.body
    const saltrouds = Number(process.env.PASSWORD_SALTROUNDS) || 10 
    entry.password = bcrypt.genSalt(saltrouds, (err, salt) => bcrypt.hashSync(entry.password, salt)) // pray to jesus if this works

    res.status(200).send('placeholder') 
})

export default router
