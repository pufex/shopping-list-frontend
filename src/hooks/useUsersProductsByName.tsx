import type { ProductType } from "../store/shoppingList";

import { useAuth } from "../auth/AuthContext";
import { useAvailableProducts } from "../store/availableProducts";
import { useState, useEffect } from "react";

import api from "../api/api";

export const useUsersProductsByName = (name: string) => {
    
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
                if(!auth.isAuthenticated || !auth.user.isAdmin)
                    return
                if(!name)
                    return
                const userProductsResponse = await api.post(
                    "/products/admin/all", 
                    {name},
                    {signal: userSignal}
                )
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
    }, [auth, name])

    return { isLoading, error }
}


