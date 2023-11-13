import { Router } from 'express'
import { validateTokenMiddleware } from '../middlewares/validatedToken.middleware'
import { balenceController } from '../controllers'

export const balenceRouter = Router()

balenceRouter.get(
  '/balence/:date',
  validateTokenMiddleware,
  balenceController.getAllBalences
)
