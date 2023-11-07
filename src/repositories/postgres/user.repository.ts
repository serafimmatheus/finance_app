import { prisma } from '../../lib/prisma'

interface User {
  email: string
  firstName: string
  lastName: string
  password: string
}

interface UserUpdated {
  firstName: string
  lastName: string
}

interface IUserRepository {
  save: (user: User) => Promise<User>
  listAll: () => Promise<User[]>
  findByEmail: (email: string) => Promise<User | null>
  findById: (id: string) => Promise<User | null>
  update: (id: string, user: UserUpdated) => Promise<User>
  delete: (id: string) => Promise<User>
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

  findById = async (id: string): Promise<User | null> => {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  update = async (id: string, user: UserUpdated): Promise<User> => {
    const userUpdate = await prisma.user.update({
      where: {
        id,
      },
      data: user,
    })

    return userUpdate
  }

  delete = async (id: string): Promise<User> => {
    const userDelete = await prisma.user.delete({
      where: {
        id,
      },
    })

    return userDelete
  }
}

export default new UserRepository()
