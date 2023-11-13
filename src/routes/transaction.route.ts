import { Router } from 'express'
import { validateTokenMiddleware } from '../middlewares/validatedToken.middleware'
import { transactionController } from '../controllers'

export const transactionsRouter = Router()

transactionsRouter.get(
  '/transactions',
  validateTokenMiddleware,
  transactionController.getTransaction
)

transactionsRouter.post(
  '/transactions',
  validateTokenMiddleware,
  transactionController.createTransaction
)

transactionsRouter.put(
  '/transactions/:id',
  validateTokenMiddleware,
  transactionController.updateTransaction
)

transactionsRouter.delete(
  '/transactions/:id',
  validateTokenMiddleware,
  transactionController.deleteTransaction
)
