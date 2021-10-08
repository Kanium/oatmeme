import { Router, Request, Response } from 'express'
import authRouter from './auth.router'
import memeRouter from './meme.router'

const router = Router()

router.use(authRouter)
router.use('/memes', memeRouter)

router.get('/', (req: Request, res: Response) => {
    res.status(401).send()
})

export default router
