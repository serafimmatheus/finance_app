import express, { Request, Response } from 'express'
import { initApp } from './routes/app.routes'
import { errorHandler } from './err/errorHandler'

export const app = express()

app.use(express.json())

initApp(app)

app.use((err: Error, _: Request, res: Response) => {
    return errorHandler(err, res)
})
