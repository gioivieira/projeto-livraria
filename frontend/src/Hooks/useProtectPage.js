import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const useProtectPage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/")
        }
    }, [navigate])
}

export default useProtectPage