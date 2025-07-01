import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import createOrderRouter from './src/endpoints/createOrder'
import createCustomerRouter from './src/endpoints/createCustomer'
import login from './src/endpoints/login'
import getOrder from './src/endpoints/getOrder'
import getIngredients from './src/endpoints/getIngredients'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use(createOrderRouter)
app.use(createCustomerRouter)
app.use(getOrder)
app.use(getIngredients)
app.use(login)

const PORT = process.env.APP_PORT || 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
