import { $Enums } from '@prisma/client'
import { transactionRepository } from '../repositories'

interface Transaction {
  name: string
  amount: number
  date: Date
  userId: string
  type: $Enums.TransactionType
}

interface ITransactionUpdated {
  name?: string
  amount?: number
  date?: Date
  type?: $Enums.TransactionType
}

class TransactionServices {
  create = async (transaction: Transaction) => {
    const transactionCreate = await transactionRepository.createTransaction(
      transaction
    )

    return transactionCreate
  }

  update = async (id: string, transaction: ITransactionUpdated) => {
    const transactionUpdate = await transactionRepository.updateTransaction(
      id,
      transaction
    )

    return transactionUpdate
  }

  delete = async (id: string) => {
    const transactionDelete = await transactionRepository.deleteTransaction(id)

    return transactionDelete
  }
}

export default new TransactionServices()
