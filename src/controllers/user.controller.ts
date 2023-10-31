import { Request, Response } from 'express'
import zod from 'zod'
import { userService } from '../services'
import { ErrorHandler } from '../err/errorHandler'
import { userRepository } from '../repositories'

class UserController {
  getAllUsers = async (req: Request, res: Response) => {
    const users = await userRepository.listAll()

    const usersWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    })

    return res.status(200).json(usersWithoutPassword)
  }

  createUser = async (req: Request, res: Response) => {
    const schemaBody = zod.object({
      firstName: zod.string(),
      lastName: zod.string(),
      email: zod
        .string()
        .email()
        .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
      passwordHash: zod
        .string()
        .min(8, { message: 'Minimo 8 caracteres' })
        .max(30, { message: 'Maximo 30 caracteres' }),
    })

    try {
      const newUser = schemaBody.parse(req.body)

      const user = await userService.create(newUser)

      return res.status(201).json(user)
    } catch (error) {
      if (error instanceof zod.ZodError) {
        return res.status(400).json({
          error: error.errors,
        })
      }

      if (error instanceof ErrorHandler) {
        return res.status(error.statusCode).json({
          message: error.message,
        })
      }

      return res.status(500).json({
        message: error,
      })
    }
  }
}

export default new UserController()
