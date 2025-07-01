import { Router, Request, Response } from 'express'
import { IdGenerator } from '../services/idGenerator'
import { OrdersDatabase } from '../class/OrdersDatabase'
import { ClassicCoffeesDatabase } from '../class/ClassicCoffeesDatabase'

const router = Router()

router.post('/orders', async (req: Request, res: Response): Promise<any> => {
    try {
        const { costumerId, basicIngredients, extraIngredients } = req.body
        const idGenerator = new IdGenerator()
        const ordersDB = new OrdersDatabase()
        const classicCoffeesDB = new ClassicCoffeesDatabase()
        const allClassicCoffees = await classicCoffeesDB.getItems()
        const id = idGenerator.generate()

        if (basicIngredients.length < 2) {
            throw new Error("É necessário adicionar pelo menos 2 ingredientes básicos.")
        }

        if (basicIngredients.length < 2) {
            throw new Error("É necessário adicionar pelo menos 2 ingredientes básicos.")
        }

        if (extraIngredients.length > 2) {
            throw new Error("Não é permitido adicionar mais que 2 ingredientes extras.")
        }

        for (const classicCoffee of allClassicCoffees) {
            if (JSON.stringify(basicIngredients.sort()) === JSON.stringify(classicCoffee.ingredients.sort())) {
                const newOrder = {
                    id: id,
                    total_value: classicCoffee.price,
                    extra_ingredients: extraIngredients,
                    fk_classic_coffees: classicCoffee.id,
                    fk_customers: costumerId,
                    created_at: new Date()
                }

                await ordersDB.createItem(newOrder)
                return res.status(201).send({message: `Sabor clássico reconhecido: Você criou um ${classicCoffee.name}!`, orderId: id })
            }
        }

        return res.status(202).send("Café personalizado sujeito a verificação de disponibilidade.")

    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

export default router