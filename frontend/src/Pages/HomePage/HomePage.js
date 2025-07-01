import { useNavigate } from "react-router-dom"
import useProtectPage from "../../Hooks/useProtectPage.js"
import { HomeContainer, IngredientsContainer } from "./style"
import { useEffect, useState } from "react"
import { baseUrlBack } from "../../Constants/Constants"
import axios from "axios"

const HomePage = ({ dataIngredients, isLoadingIngredients, errorIngredients }) => {

    useProtectPage()
    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState("")
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [orderId, setOrderId] = useState(localStorage.getItem("orderId"))

    useEffect(() => {
        const interval = setInterval(() => {
            const storedOrderId = localStorage.getItem("orderId")
            if (storedOrderId !== orderId) {
                setOrderId(storedOrderId)
            }
        }, 500)

        return () => clearInterval(interval)
    }, [orderId])

    const handleClick = () => {
        navigate(`/orders/${orderId}`)
    }

    const handleIngredientChange = (id) => {
        setSelectedIngredients((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        )
    }

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("")
            }, 4000)

            return () => clearTimeout(timer)
        }
    }, [errorMessage])

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("")
            }, 4000)

            return () => clearTimeout(timer)
        }
    }, [errorMessage])

    const createOrder = (e) => {
        e.preventDefault()
        const basicIngredients = dataIngredients
            .filter(ing => selectedIngredients.includes(ing.id) && ing.type === "basic")
            .map(ing => ing.name)

        const extraIngredients = dataIngredients
            .filter(ing => selectedIngredients.includes(ing.id) && ing.type === "extra")
            .map(ing => ing.name)

        const body = {
            basicIngredients,
            extraIngredients,
            "costumerId": localStorage.getItem("customerId")
        }

        axios.post(`${baseUrlBack}/orders`, body)
            .then((response) => {
                if (response.data.message) {
                    localStorage.setItem("orderId", response.data.orderId)
                    alert(response.data.message)
                } else {
                    alert(response.data)
                }
            })
            .catch((er) => {
                const errorMsg = er.response.data || "Erro ao fazer pedido"
                setErrorMessage(errorMsg)
            })

        setSelectedIngredients([])
    }

    const basicIngredients = dataIngredients && dataIngredients.map((ingredient) => {
        if (ingredient.type === "basic") {
            return (
                <IngredientsContainer key={ingredient.id}>
                    <label>
                        <input
                            type="checkbox"
                            value={ingredient.id}
                            onChange={() => handleIngredientChange(ingredient.id)}
                            checked={selectedIngredients.includes(ingredient.id)}
                        />
                        <strong>{ingredient.name.toUpperCase()}</strong>
                    </label>
                </IngredientsContainer>
            )
        }
        return null
    })

    const extraIngredients = dataIngredients && dataIngredients.map((ingredient) => {
        if (ingredient.type === "extra") {
            return (
                <IngredientsContainer key={ingredient.id}>
                    <label>
                        <input
                            type="checkbox"
                            value={ingredient.id}
                            onChange={() => handleIngredientChange(ingredient.id)}
                            checked={selectedIngredients.includes(ingredient.id)}
                        />
                        <strong>{ingredient.name.toUpperCase()}</strong>
                    </label>
                </IngredientsContainer>
            )
        }
        return null
    })

    return (
        <HomeContainer>
            <h1>Realize seu pedido:</h1>

            <form onSubmit={createOrder}>
                <h3>Escolha os ingredientes básicos:</h3>
                {basicIngredients}

                <h3>Escolha os ingredientes adicionais:</h3>
                {extraIngredients}

                <button>Realizar pedido</button>

                {orderId && (
                    <button onClick={handleClick}>
                        Visualizar pedido criado
                    </button>
                )}
            </form>

            {errorMessage && (
                <div className="error-tooltip">
                    {errorMessage}
                </div>
            )}
        </HomeContainer>
    )
}

export default HomePage