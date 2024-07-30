import type { ProductType } from "./shoppingList"
import {create} from "zustand"

type AvailableProductsState = {
    products: ProductType[],
    deleteProduct: (id: string) => void,
    updateProduct: (updatedProduct: ProductType) => void
    pushDefaultProduct: (newProduct: ProductType) => void
    userProducts: ProductType[],
    setProducts: (products: ProductType[]) => void,
    setUsersProducts: (userProducts: ProductType[]) => void,
    pushProduct: (newProduct: ProductType) => void,
    deleteUserProduct: (id: string) => void
}

export const useAvailableProducts = create<AvailableProductsState>((set) => ({
    products: [],
    deleteProduct: (id) => set((state) => ({
        products: state.products.filter(product => product.id !== id)
    })),
    updateProduct: (updatedProduct) => set((state) => ({
        products: state.products.map(product => {
            if(product.id !== updatedProduct.id)
                return product
            else return updatedProduct
        })
    })),
    pushDefaultProduct: (newProduct) => set((state) => ({
        products: [...state.products, newProduct]
    })),
    userProducts: [],
    setProducts: (products) => set(() => ({products})),
    setUsersProducts: (userProducts) => set(() => ({userProducts})),
    pushProduct: (newProduct) => set((state) => ({
        userProducts: [...state.userProducts, newProduct]
    })),
    deleteUserProduct: (id) => set((state) => ({
        userProducts: state.userProducts.filter(product => product.id !== id)
    }))
}))