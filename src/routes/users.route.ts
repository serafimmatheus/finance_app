import { Router } from 'express'
import { userController } from '../controllers'
import { validateTokenMiddleware } from '../middlewares/validatedToken.middleware'

export const usersRouter = Router()

usersRouter.get('/users', validateTokenMiddleware, userController.getAllUsers)
usersRouter.get(
  '/users/:id',
  validateTokenMiddleware,
  userController.getUserById
)
usersRouter.get(
  '/users/email/:email',
  validateTokenMiddleware,
  userController.getUserByEmail
)
usersRouter.post('/users', userController.createUser)
usersRouter.post('/users/login', userController.login)
usersRouter.put(
  '/users/:id',
  validateTokenMiddleware,
  userController.updateUser
)
usersRouter.delete(
  '/users/:id',
  validateTokenMiddleware,
  userController.deleteUser
)
