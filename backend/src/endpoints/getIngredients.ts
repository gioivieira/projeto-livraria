import { Router, Request, Response } from 'express'
import { IngredientsDatabase } from '../class/IngredientsDatabase'

const router = Router()

router.get('/ingredients', async (req: Request, res: Response): Promise<any> => {
    try {
        const ingredientsDB = new IngredientsDatabase()

        const ingredients = await ingredientsDB.getItems()

        return res.status(200).send(ingredients)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

export default router