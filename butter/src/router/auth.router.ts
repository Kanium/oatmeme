import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
const router = Router()

interface user{
    username: string,
    password: string
}

router.post('/login', (req: Request, res: Response) => {
    try {
        const user = req.body

        res.status(200).json({})
    } catch (error) {
        res.status(500).send("fix me senpai :)))")   
    }
})


router.post('/register', (req: Request, res: Response) => {
    res.status(200).send("fix me senpai :)))")   
})


export default router
