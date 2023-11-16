import { prisma } from '../../lib/prisma'

interface IBalencesRepository {
  getAllBalences: (userId: string, date: string) => Promise<any>
}

class BalencesRepository implements IBalencesRepository {
  getAllBalences = async (userId: string, date: string) => {
    console.log(date)
    const balences: any = await prisma.$queryRaw`
        SELECT
            SUM(CASE WHEN "type" = 'perdas' THEN "amount" ELSE 0 END) as "earnings",
            SUM(CASE WHEN "type" = 'ganhos' THEN "amount" ELSE 0 END) as "expenses",
            SUM(CASE WHEN "type" = 'investimentos' THEN "amount" ELSE 0 END) as "investments",

            SUM(CASE WHEN "type" = 'ganhos' THEN "amount" ELSE 0 END)
            - SUM(CASE WHEN "type" = 'investimentos' THEN "amount" ELSE 0 END)
            - (SUM(CASE WHEN "type" = 'perdas' THEN "amount" ELSE 0 END)) as "balence"
        FROM "transactions"
        WHERE "userId" = ${userId}
        AND TO_CHAR("date", 'YYYY-MM') = ${date};
    `

    return {
      userId,
      ...balences[0],
    }
  }
}

export default new BalencesRepository()
