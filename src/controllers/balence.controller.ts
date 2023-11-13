import { Request, Response } from 'express'
import { balenceService } from '../services'
import { ZodError } from 'zod'

class BalencesControllers {
  getAllBalences = async (req: Request, res: Response) => {
    try {
      const userId = req.decoded.id!

      const { date } = req.params

      const balences = await balenceService.getAllBalences(
        userId,
        date as string
      )

      return res.status(200).json(balences)
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error })
      }

      return res.status(500).json({ message: error })
    }
  }
}

export default new BalencesControllers()
