import { useNavigate } from "react-router-dom"
import { baseUrlBack } from "../../Constants/Constants"
import { SignUpContainer } from "./style"
import { useEffect, useState } from "react"
import useForm from "../../Hooks/useForm"
import axios from "axios"


const SignUpPage = () => {

    const navigate = useNavigate()

    const [form, onChange, clear] = useForm({ name: "", email: "", password: "" })
    const [errorMessage, setErrorMessage] = useState("")

    const body = {
        "name": form.name,
        "email": form.email,
        "password": form.password
    }

    const signUp = (e) => {
        e.preventDefault()
        axios.post(`${baseUrlBack}/customers/signup`, body)
            .then((response) => {
                navigate("/")
            })
            .catch((er) => {
                const errorMsg = er.response.data || "Erro ao fazer cadastro"
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
        <SignUpContainer>
            <h1>Cadastro</h1>
            <form onSubmit={signUp}>
                <label htmlFor="name">Nome:</label>
                <input onChange={onChange} name="name" value={form.name} id="name" type="name" required />

                <label htmlFor="email">E-mail:</label>
                <input pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={onChange} name="email" value={form.email} id="email" type="email" required />

                <label htmlFor="password">Senha:</label>
                <input onChange={onChange} name="password" value={form.password} id="password" type="password" required />
                <div>
                    <button>Realizar Cadastro</button>

                    {errorMessage && (
                        <div className="error-tooltip">
                            {errorMessage}
                        </div>
                    )}
                </div>
            </form>
        </SignUpContainer>
    )
}

export default SignUpPage