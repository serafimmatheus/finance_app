import { hash } from 'bcrypt'
import { userRepository } from '../repositories'
import { ErrorHandler } from '../err/errorHandler'

interface User {
  email: string
  firstName: string
  lastName: string
  passwordHash: string
}

class UserService {
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
}

export default new UserService()
