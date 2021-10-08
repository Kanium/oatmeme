import { Router } from 'express'
import passport from 'passport'
import { MemeController } from '../controllers/Meme.controller'
import { MemeValidator } from '../validations/Meme.validator'

const router = Router()
const controller = new MemeController()

router.get('/:id', controller.get)
router.get('/', controller.list)
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    MemeValidator.userAllowedToPerformAction,
    controller.create
)
router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    MemeValidator.userAllowedToPerformAction,
    controller.update
)
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    MemeValidator.userAllowedToPerformAction,
    controller.delete
)

export default router
