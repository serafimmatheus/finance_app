import { prisma } from '../lib/prisma'

interface User {
  email: string
  firstName: string
  lastName: string
  password: string
}

interface IUserRepository {
  save: (user: User) => Promise<User>
  listAll: () => Promise<User[]>
}

class UserRepository implements IUserRepository {
  save = async (user: User): Promise<User> => {
    const userCreate = await prisma.user.create({
      data: user,
    })
    return userCreate
  }

  listAll = async (): Promise<User[]> => {
    return await prisma.user.findMany()
  }

  findByEmail = async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  }
}

export default new UserRepository()
