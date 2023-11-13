import { $Enums } from '@prisma/client'
import { prisma } from '../../lib/prisma'

interface Transaction {
  name: string
  amount: number
  date: Date
  userId: string
  type: $Enums.TransactionType
}

interface ITransactionUpdated {
  name?: string
  amoun?: number
  date?: Date
  type?: $Enums.TransactionType
}

interface ITransactionRepository {
  createTransaction: (transaction: Transaction) => Promise<Transaction>
  getTransaction: (id: string) => Promise<Transaction[] | null>
  getTransactionsById: (id: string) => Promise<Transaction>
  updateTransaction: (
    id: string,
    transaction: ITransactionUpdated
  ) => Promise<ITransactionUpdated>
  deleteTransaction: (id: string) => Promise<Transaction>
}

class TransactionRepository implements ITransactionRepository {
  createTransaction = async (transaction: Transaction) => {
    const transactionCreate = await prisma.transaction.create({
      data: transaction,
    })

    return transactionCreate
  }

  getTransaction = async (id: string) => {
    const transaction = await prisma.transaction.findMany({
      where: {
        userId: id,
      },

      orderBy: {
        date: 'desc',
      },
    })

    return transaction
  }

  getTransactionsById = async (id: string) => {
    const transactions = await prisma.transaction.findFirstOrThrow({
      where: {
        id,
      },
    })

    return transactions
  }

  updateTransaction = async (id: string, transaction: ITransactionUpdated) => {
    const transactionUpdate = await prisma.transaction.update({
      where: {
        id,
      },
      data: transaction,
    })

    return transactionUpdate
  }

  deleteTransaction = async (id: string) => {
    const transactionDelete = await prisma.transaction.delete({
      where: {
        id,
      },
    })

    return transactionDelete
  }
}

export default new TransactionRepository()
