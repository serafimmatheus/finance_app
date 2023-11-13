import { Express } from 'express'
import { usersRouter } from './users.route'
import { transactionsRouter } from './transaction.route'
import { balenceRouter } from './balence.route'

export function initApp(app: Express): void {
  app.use('/api', usersRouter)
  app.use('/api', transactionsRouter)
  app.use('/api', balenceRouter)
}
