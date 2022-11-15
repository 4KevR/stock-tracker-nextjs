import prisma from '../../../lib/prisma'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

export default async function handle(req, res) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session) {
        switch (req.method) {
            case 'POST': {
                const user = await prisma.user.findUnique({
                    where: {
                        name: session.user.name,
                    }
                });

                const reqData = JSON.parse(req.body)
                let stockExists = await prisma.stock.findFirst({
                    where: {
                        symbol: reqData.symbol,
                    }
                })

                if (stockExists === null) {
                    stockExists = await prisma.stock.create({
                        data: reqData,
                    })
                }

                let newStockUser = await prisma.stocksOnUsers.findFirst({
                    where: {
                        userId: user.id,
                        stockId: stockExists.id,
                    }
                })

                if (newStockUser === null) {
                    const newStockUser = await prisma.stocksOnUsers.create({
                        data: {
                            userId: user.id,
                            stockId: stockExists.id,
                        }
                    });
                }

                return res.status(200).json(newStockUser)
            }
        }
    }
    return res.status(401).send({ error: 'Auth required' })
}