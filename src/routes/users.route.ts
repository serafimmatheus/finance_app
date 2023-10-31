import { Router } from 'express'
import { userController } from '../controllers'

export const usersRouter = Router()

usersRouter.get('/users', userController.getAllUsers)
usersRouter.post('/users', userController.createUser)
