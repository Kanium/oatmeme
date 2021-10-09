import { Router } from 'express'
import passport from 'passport'
import { MemerController } from '../controllers/Memer.controller'
import { MemerValidator } from '../validations/Memer.validator'

const router = Router()
const controller = new MemerController()

router.get('/:id', controller.get)
router.get('/', controller.list)
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    MemerValidator.userAllowedToPerformAction,
    controller.create
)
router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    MemerValidator.userAllowedToPerformAction,
    controller.update
)
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    MemerValidator.userAllowedToPerformAction,
    controller.delete
)

export default router
