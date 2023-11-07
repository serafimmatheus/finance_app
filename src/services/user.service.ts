import { compare, hash } from 'bcrypt'
import { userRepository } from '../repositories'
import { ErrorHandler } from '../err/errorHandler'
import { User as UserPrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

interface User {
  email: string
  firstName: string
  lastName: string
  passwordHash: string
}

interface UserUpdated {
  firstName: string
  lastName: string
}

class UserService {
  login = async (email: string, password: string) => {
    const user: any = await userRepository.findByEmail(email)

    if (!user) {
      throw new ErrorHandler(400, 'User or password is invalid')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new ErrorHandler(400, 'User or password is invalid')
    }

    const newUserToken = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    }

    const token = jwt.sign(newUserToken, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    })

    return token
  }

  create = async (user: User) => {
    const password = await hash(user.passwordHash, 10)

    const userLreadyExists = await userRepository.findByEmail(user.email)

    if (userLreadyExists) {
      throw new ErrorHandler(400, 'User already exists')
    }

    const newUser = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password,
    }

    const userCreate = await userRepository.save(newUser)

    return userCreate
  }

  listAll = async () => {
    const users = await userRepository.listAll()

    return users
  }

  findByEmail = async (email: string) => {
    const user = await userRepository.findByEmail(email)

    return user
  }

  findById = async (id: string) => {
    const user = await userRepository.findById(id)

    return user
  }

  update = async (id: string, user: UserUpdated) => {
    const userUpdate = await userRepository.update(id, user)

    return userUpdate
  }

  delete = async (id: string) => {
    const userDelete = await userRepository.delete(id)

    return userDelete
  }
}

export default new UserService()
