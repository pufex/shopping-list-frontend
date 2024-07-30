import { useState, useEffect } from "react"

export const useFetch = <T,>(url: string) => {
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [data, setData] = useState<T | undefined | null | []>(undefined)

    useEffect(() => {

    }, [])
}