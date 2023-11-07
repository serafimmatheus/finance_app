import { Transaction } from '@prisma/client'
import { prisma } from '../../lib/prisma'

interface ITransactionRepository {
  createTransaction: (transaction: Transaction) => Promise<Transaction>
  getTransaction: (id: string) => Promise<Transaction[] | null>
  updateTransaction: (
    id: string,
    transaction: Transaction
  ) => Promise<Transaction>
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
        id,
      },
    })

    return transaction
  }

  updateTransaction = async (id: string, transaction: Transaction) => {
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
