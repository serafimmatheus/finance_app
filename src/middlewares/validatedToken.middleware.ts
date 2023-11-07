import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { User } from '@prisma/client'

export async function validateTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(400).json({ message: 'Missing authorization token.' })
  }

  return jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: 'Invalid token.' })
    }

    req.decoded = decoded as Partial<User>

    return next()
  })
}
