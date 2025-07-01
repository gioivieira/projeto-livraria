import { useNavigate } from "react-router-dom"
import { baseUrlBack } from "../../Constants/Constants"
import { LoginContainer } from "./style"
import { useEffect, useState } from "react"
import useForm from "../../Hooks/useForm"
import axios from "axios"

const LoginPage = () => {

    const navigate = useNavigate()

    const [form, onChange, clear] = useForm({ email: "", password: "" })
    const [errorMessage, setErrorMessage] = useState("")

    const body = {
        "email": form.email,
        "password": form.password
    }

    const logIn = (e) => {
        e.preventDefault()
        axios.post(`${baseUrlBack}/customers/login`, body)
            .then((response) => {
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("customerId", response.data.customerId)
                navigate("/home")
            })
            .catch((er) => {
                const errorMsg = er.response.data || "Erro ao fazer login"
                setErrorMessage(errorMsg)
            })

        clear()
    }

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("")
            }, 4000)

            return () => clearTimeout(timer)
        }
    }, [errorMessage])

    return (
        <LoginContainer>
            <h1>Login</h1>
            <form onSubmit={logIn}>
                <label htmlFor="email">E-mail:</label>
                <input pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={onChange} name="email" value={form.email} id="email" type="email" required />

                <label htmlFor="password">Senha:</label>
                <input onChange={onChange} name="password" value={form.password} id="password" type="password" required />
                <div>
                    <button type="button" onClick={() => { navigate("/customers/signup") }}>Ainda não é cliente?</button>
                    <button>Entrar</button>

                    {errorMessage && (
                        <div className="error-tooltip">
                            {errorMessage}
                        </div>
                    )}
                </div>
            </form>
        </LoginContainer>
    )
}

export default LoginPage