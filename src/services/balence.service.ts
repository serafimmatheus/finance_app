import { balenceRepository } from '../repositories'

class BalencesServices {
  getAllBalences = async (userId: string, date: string) => {
    const balences = await balenceRepository.getAllBalences(userId, date)

    return balences
  }
}

export default new BalencesServices()
