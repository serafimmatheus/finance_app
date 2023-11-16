import { $Enums } from '@prisma/client'
import { shoppingsRepository } from '../repositories'

interface Shopping {
  userId: string
  name: string
  amount: number
  type: $Enums.ShoppingType
  quantity: number
}

class ShoppingService {
  create = async (data: Shopping) => {
    const shopping = await shoppingsRepository.create(data)

    return shopping
  }

  getAll = async (userId: string) => {
    const shoppings = await shoppingsRepository.getAll(userId)

    return shoppings
  }

  getById = async (id: string) => {
    const shopping = await shoppingsRepository.getById(id)

    return shopping
  }

  update = async (data: any, id: string) => {
    const shopping = await shoppingsRepository.update(data, id)

    return shopping
  }

  delete = async (id: string) => {
    const shopping = await shoppingsRepository.delete(id)

    return shopping
  }
}

export default new ShoppingService()
