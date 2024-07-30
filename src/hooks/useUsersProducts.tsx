import type { ProductType } from "../store/shoppingList";

import { useAuth } from "../auth/AuthContext";
import { useAvailableProducts } from "../store/availableProducts";
import { useState, useEffect } from "react";

import api from "../api/api";

export const useUsersProducts = () => {
    
    const {auth} = useAuth()
    const {setUsersProducts} = useAvailableProducts()

    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {       
        const userController = new AbortController()
        const userSignal = userController.signal

        const fetchProducts = async () => {
            setError("")
            setLoading(true)
            try{
                if(!auth.isAuthenticated)
                    return
                const userProductsResponse = await api.get("/products/users", {signal: userSignal})
                const userProducts = userProductsResponse.data as ProductType[]
                setUsersProducts(userProducts)
            }catch(err){
                console.log(err)
            }finally{
                setLoading(false)
            }
        }

        fetchProducts()

        return () => userController.abort()
    }, [auth])

    return { isLoading, error }
}


