import { Express } from 'express'
import { usersRouter } from './users.route'

export function initApp(app: Express): void {
    app.use('/api', usersRouter)
}
