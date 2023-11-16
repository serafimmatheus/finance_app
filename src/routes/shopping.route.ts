import { Router } from 'express'
import { validateTokenMiddleware } from '../middlewares/validatedToken.middleware'
import { shoppingController } from '../controllers'

export const shoppingRouter = Router()

shoppingRouter.post(
  '/shopping',
  validateTokenMiddleware,
  shoppingController.create
)

shoppingRouter.get(
  '/shopping',
  validateTokenMiddleware,
  shoppingController.getAll
)

shoppingRouter.get(
  '/shopping/:id',
  validateTokenMiddleware,
  shoppingController.getById
)

shoppingRouter.put(
  '/shopping/:id',
  validateTokenMiddleware,
  shoppingController.update
)

shoppingRouter.delete(
  '/shopping/:id',
  validateTokenMiddleware,
  shoppingController.delete
)
