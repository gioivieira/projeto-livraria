import { Router, Request, Response } from 'express'
import { IdGenerator } from '../services/idGenerator'
import { CustomersDatabase } from '../class/CustomersDatabase'
import bcrypt from 'bcryptjs'

const router = Router()

router.post('/customers/signup', async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, password } = req.body
        const idGenerator = new IdGenerator()
        const customersDB = new CustomersDatabase()
        const id = idGenerator.generate()
        let customer

        if (!email || !name || !password) {
            throw new Error("Obrigatório informar nome, e-mail e senha.")
        } else {
            customer = await customersDB.getItem("email", email)
        }

        if (customer.length === 1) {
            return res.status(409).send("Usuário já existe.")
        } else if (customer.length === 0) {
            const hashedPassword = await bcrypt.hash(password, 10)

            const newCustomer = {
                id: id,
                name: name,
                email: email,
                password: hashedPassword,
                created_at: new Date()
            }

            await customersDB.createItem(newCustomer)
            return res.status(201).send("Usuário criado com sucesso.")
        }
    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

export default router