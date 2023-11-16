import { $Enums } from '@prisma/client'
import { prisma } from '../../lib/prisma'

interface Shopping {
  userId: string
  name: string
  amount: number
  type: $Enums.ShoppingType
  quantity: number
}

interface IShoppingsRepository {
  create: (data: Shopping) => Promise<Shopping>
  getAll: (userId: string) => Promise<Shopping[]>
  getById: (id: string) => Promise<Shopping | null>
  update: (data: any, id: string) => Promise<Shopping>
  delete: (id: string) => Promise<Shopping>
}

class ShoppingsRepository implements IShoppingsRepository {
  create = async (data: Shopping): Promise<Shopping> => {
    const createShopping = await prisma.shopping.create({
      data,
    })

    return createShopping
  }

  getAll = async (userId: string): Promise<Shopping[]> => {
    const shoppings = await prisma.shopping.findMany({
      where: {
        userId,
      },
    })

    return shoppings
  }

  getById = async (id: string): Promise<Shopping | null> => {
    const shopping = await prisma.shopping.findUnique({
      where: {
        id,
      },
    })

    return shopping
  }

  update = async (data: any, id: string): Promise<Shopping> => {
    const updateShopping = await prisma.shopping.update({
      where: {
        id,
      },
      data,
    })

    return updateShopping
  }

  delete = async (id: string): Promise<Shopping> => {
    const deleteShopping = await prisma.shopping.delete({
      where: {
        id,
      },
    })

    return deleteShopping
  }
}

export default new ShoppingsRepository()
