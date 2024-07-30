import type { ProductType } from "../store/shoppingList";

import { useAvailableProducts } from "../store/availableProducts";
import { useState, useEffect } from "react";

import api from "../api/api";

export const useProducts = () => {
    
    const {setProducts} = useAvailableProducts()

    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const productsController = new AbortController()
        const productsSignal = productsController.signal

        const fetchProducts = async () => {
            setError("")
            setLoading(true)
            try{
                const defaultProductsResponse = await api.get("/products/all", {signal: productsSignal})
                const products = defaultProductsResponse.data as ProductType[]
                setProducts(products)
            }catch(err){
                console.log(err)
            }finally{
                setLoading(false)
            }
        }

        fetchProducts()

        return () => productsController.abort()
    }, [])

    return { isLoading, error }
}


