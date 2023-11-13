import express from 'express'
import { initApp } from './routes/app.routes'
import cors from 'cors'

export const app = express()

const corsOptions = {
  origin: 'http://localhost:3000', // Substitua pelo URL do seu frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}

app.use(express.json())
app.use(cors(corsOptions))

initApp(app)
