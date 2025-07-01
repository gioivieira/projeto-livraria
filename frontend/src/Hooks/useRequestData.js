import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

const useRequestData = (url) => {

    const [data, setData] = useState(undefined)
    const [isLoading, setIsLoading] = useState(undefined)
    const [error, setError] = useState(undefined)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axios.get(url,)
            .then((response) => {
                setIsLoading(false)
                setData(response.data)
            })
            .catch((er) => {
                setIsLoading(false)
                setError(er.response.data.message)
            })
    }, [url, reload])

    return [data, isLoading, error, reload, setReload]
}

export default useRequestData


