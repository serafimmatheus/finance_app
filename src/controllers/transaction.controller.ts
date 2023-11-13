import { Request, Response } from 'express'
import zod, { ZodError } from 'zod'
import { transactionService } from '../services'
import { ErrorHandler } from '../err/errorHandler'
import { transactionRepository } from '../repositories'

class TransactionController {
  createTransaction = async (req: Request, res: Response) => {
    try {
      const schemaBody = zod.object({
        name: zod.string(),
        amount: zod.number(),
        type: zod.enum(['perdas', 'ganhos', 'investimentos']),
      })

      const { name, amount, type } = schemaBody.parse(req.body)

      const transaction = {
        name,
        amount,
        date: req.body.date,
        userId: req.decoded.id!,
        type,
      }

      const transactionCreate = await transactionService.create(transaction)
      return res.status(201).json(transactionCreate)
    } catch (error) {
      if (error instanceof ErrorHandler) {
        return res.status(error.statusCode).json({ message: error.message })
      }

      if (error instanceof ZodError) {
        return res.status(400).json({ message: error })
      }

      return res.status(500).json({ message: error })
    }
  }

  getTransaction = async (req: Request, res: Response) => {
    try {
      const transaction = await transactionRepository.getTransaction(
        req.decoded.id!
      )

      return res.status(200).json(transaction)
    } catch (error) {
      if (error instanceof ErrorHandler) {
        return res.status(error.statusCode).json({ message: error.message })
      }

      return res.status(500).json({ message: error })
    }
  }

  updateTransaction = async (req: Request, res: Response) => {
    try {
      const schemaBody = zod.object({
        name: zod.string().optional(),
        amount: zod.number().optional(),
        type: zod.enum(['perdas', 'ganhos', 'investimentos']).optional(),
        date: zod.date().optional(),
      })

      const schemaParams = zod.object({
        id: zod.string(),
      })

      const { id } = schemaParams.parse(req.params)
      const { name, amount, type, date } = schemaBody.parse(req.body)

      const transaction = {
        name,
        amount,
        date,
        type,
      }

      const userId = req.decoded.id!

      const userTransaction = await transactionRepository.getTransactionsById(
        id
      )

      if (userId !== userTransaction.userId) {
        throw new ErrorHandler(401, 'Unauthorized')
      }

      await transactionService.update(id, transaction)

      return res.status(204).send()
    } catch (error) {
      if (error instanceof ErrorHandler) {
        return res.status(error.statusCode).json({ message: error.message })
      }

      if (error instanceof ZodError) {
        return res.status(400).json({ message: error })
      }

      return res.status(500).json({ message: error })
    }
  }

  deleteTransaction = async (req: Request, res: Response) => {
    try {
      const schemaParams = zod.object({
        id: zod.string(),
      })

      const { id } = schemaParams.parse(req.params)

      const userId = req.decoded.id!

      const userTransaction = await transactionRepository.getTransactionsById(
        id
      )

      if (userId !== userTransaction.userId) {
        throw new ErrorHandler(401, 'Unauthorized')
      }

      await transactionService.delete(id)

      return res.status(204).send()
    } catch (error) {
      if (error instanceof ErrorHandler) {
        return res.status(error.statusCode).json({ message: error.message })
      }

      if (error instanceof ZodError) {
        return res.status(400).json({ message: error })
      }

      return res.status(500).json({ message: error })
    }
  }
}

export default new TransactionController()
