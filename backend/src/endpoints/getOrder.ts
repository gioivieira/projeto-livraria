import { Router, Request, Response } from 'express'
import { OrdersDatabase } from '../class/OrdersDatabase'

const router = Router()

router.get('/orders/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id as string
        const ordersDB = new OrdersDatabase()

        const order = await ordersDB.getItem("id", id)

        return res.status(200).send(order)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

export default router