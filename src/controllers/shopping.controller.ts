import { Request, Response } from 'express'
import { ZodError, z } from 'zod'
import { shoppingService } from '../services'

class ShoppingController {
  create = async (req: Request, res: Response) => {
    try {
      const userId = req.decoded.id!

      const schemaBody = z.object({
        name: z.string().min(3).max(255),
        amount: z.number().positive(),
        type: z.enum(['un', 'kg']),
        quantity: z.number().positive(),
      })

      const { name, amount, type, quantity } = schemaBody.parse(req.body)

      const shopping = await shoppingService.create({
        userId,
        name,
        amount,
        type,
        quantity,
      })

      return res.status(201).json(shopping)
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error })
      }

      return res.status(500).json({ message: error })
    }
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const userId = req.decoded.id!

      const shoppings = await shoppingService.getAll(userId)

      return res.status(200).json(shoppings)
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const shopping = await shoppingService.getById(id)

      return res.status(200).json(shopping)
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const schemaBody = z.object({
        name: z.string().min(3).max(255),
        amount: z.number().positive(),
        type: z.enum(['un', 'kg']),
        quantity: z.number().positive(),
      })

      const { name, amount, type, quantity } = schemaBody.parse(req.body)

      const shopping = await shoppingService.update(
        {
          name,
          amount,
          type,
          quantity,
        },
        id
      )

      return res.status(200).json(shopping)
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const shopping = await shoppingService.delete(id)

      return res.status(200).json(shopping)
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }
}

export default new ShoppingController()
