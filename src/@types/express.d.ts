import { Transaction } from '@prisma/client'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
}

declare global {
  namespace Express {
    interface Request {
      validated: User | Transaction
      decoded: Partial<User>
      user: User
    }
  }
}
