import { Request, Response } from 'express'
import zod from 'zod'
import { userService } from '../services'
import { ErrorHandler } from '../err/errorHandler'
import { userRepository } from '../repositories'

class UserController {
  login = async (req: Request, res: Response) => {
    const schemaBody = zod.object({
      email: zod.string().email(),
      password: zod.string(),
    })

    try {
      const { email, password } = schemaBody.parse(req.body)

      const user = await userService.login(email, password)

      return res.status(200).json(user)
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

  getAllUsers = async (_: Request, res: Response) => {
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

  getUserById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const user = await userService.findById(id)

      if (!user) {
        throw new ErrorHandler(404, 'User not found')
      }

      const { password, ...userWithoutPassword } = user

      return res.status(200).json(userWithoutPassword)
    } catch (error) {
      if (error instanceof ErrorHandler) {
        return res.status(error.statusCode).json({
          message: error.message,
        })
      }
      return res.status(400).json(error)
    }
  }

  getUserByEmail = async (req: Request, res: Response) => {
    const schemaParams = zod.object({
      email: zod.string().email(),
    })

    const { email } = schemaParams.parse(req.params)

    try {
      const user = await userService.findByEmail(email)

      if (!user) {
        throw new ErrorHandler(404, 'User not found')
      }

      const { password, ...userWithoutPassword } = user

      return res.status(200).json(userWithoutPassword)
    } catch (error) {
      if (error instanceof ErrorHandler) {
        return res.status(error.statusCode).json({
          message: error.message,
        })
      }
      return res.status(400).json(error)
    }
  }

  updateUser = async (req: Request, res: Response) => {
    const schemaBody = zod.object({
      firstName: zod.string(),
      lastName: zod.string(),
    })

    const schemaParams = zod.object({
      id: zod.string(),
    })

    const { id } = schemaParams.parse(req.params)

    if (req.decoded.id !== id) {
      return res.status(401).json({
        message: 'Unauthorized',
      })
    }

    try {
      const userUpdated = schemaBody.parse(req.body)

      await userService.update(id, userUpdated)

      return res.status(204).send()
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

  deleteUser = async (req: Request, res: Response) => {
    const schemaParams = zod.object({
      id: zod.string(),
    })

    const { id } = schemaParams.parse(req.params)

    if (req.decoded.id !== id) {
      return res.status(401).json({
        message: 'Unauthorized',
      })
    }

    try {
      await userService.delete(id)

      return res.status(204).send()
    } catch (error) {
      if (error instanceof zod.ZodError) {
        return res.status(400).json({
          message: error.errors,
        })
      }

      if (error instanceof ErrorHandler) {
        return res.status(error.statusCode).json({
          message: error.message,
        })
      }
      return res.status(400).json(error)
    }
  }
}

export default new UserController()
