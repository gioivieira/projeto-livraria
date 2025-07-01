import { Router, Request, Response } from 'express'
import { CustomersDatabase } from '../class/CustomersDatabase'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = Router()

router.post('/customers/login', async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body
        const customersDB = new CustomersDatabase()

        if (!email || !password) {
            throw new Error("Obrigatório informar e-mail e senha.")
        }

        const customer = await customersDB.getItem("email", email)

        if (customer.length === 0) {
            throw new Error("E-mail incorreto.")
        }

        const isPasswordCorrect = await bcrypt.compare(password, customer[0].password)

        if (!isPasswordCorrect) {
            throw new Error("Senha incorreta.")
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("Chave JWT não configurada.")
        }

        const token = jwt.sign(req.body, process.env.JWT_SECRET, { expiresIn: '2h' })

        return res.status(200).send({ token: token, customerId: customer[0].id })
    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

export default router