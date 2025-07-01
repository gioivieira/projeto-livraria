import { useNavigate } from "react-router-dom"
import { baseUrlBack } from "../../Constants/Constants"
import { CustomerOrderContainer } from "./style"
import { useEffect, useState } from "react"
import axios from "axios"

const CustomerOrderPage = () => {

    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState("")
    const [order, setOrder] = useState(null)

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("")
            }, 4000)

            return () => clearTimeout(timer)
        }
    }, [errorMessage])

    useEffect(() => {
        const order = async () => {
            try {
                const orderId = localStorage.getItem("orderId")
                const response = await axios.get(`${baseUrlBack}/orders/${orderId}`)

                const orderData = Array.isArray(response.data) ? response.data[0] : response.data
                console.log("Pedido recebido:", orderData)

                setOrder(orderData)
            } catch (er) {
                const errorMsg = er.response.data || "Erro ao carregar pedido"
                setErrorMessage(errorMsg)
            }
        };

        order()
    }, [])


    return (
        <CustomerOrderContainer>
            {order && (
                <div>
                    <h4>Ingredientes Básicos:</h4>
                    <ul>
                        {/* Renderize os ingredientes básicos aqui, se houver */}
                    </ul>

                    <h4>Extras:</h4>
                    <ul>
                        <li>ID do Pedido: {order.id}</li>
                        <li>Valor Total: R$ {order.total_value}</li>
                    </ul>
                </div>
            )}

            <div>
                <button type="button" onClick={() => { navigate(-1) }}>Realizar novo pedido</button>

                {errorMessage && (
                    <div className="error-tooltip">
                        {errorMessage}
                    </div>
                )}
            </div>
        </CustomerOrderContainer>
    )
}

export default CustomerOrderPage