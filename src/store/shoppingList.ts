import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProductType = {
    id: string,
    name: string,
    description: string | null,
    price: number,
    isDiscounted: boolean,
    discount: number | null,
    isKilogrames: boolean,
    user_id: string | null,
}

export type ProductTypeInForm = Omit<ProductType, "id" | "user_id">

export type ShoppingListItem = ProductType & {
    quantity: number,
    checked: boolean,
}

export type ShoppingListType = ShoppingListItem[]

export type ShoppingListState = {
    shoppingList: ShoppingListType,
    changeCount: (id: string, value: number) => void
    removeItem: (id: string) => void
    checkItem: (id: string) => void
    addItem: (product: ProductType, count: number) => void
}

export const useShoppingList = create<ShoppingListState>()(
    persist(
        (set) => ({
            shoppingList: [],
            changeCount: (id, value) => set((state) => ({
                shoppingList: state.shoppingList.map((item) => {
                    if(item.id !== id)
                        return item
                    else return {
                        ...item,
                        quantity: item.quantity + value 
                    }
                })
            })),
            removeItem: (id) => set((state) => ({
                shoppingList: state.shoppingList.filter((item) => item.id !== id)
            })),
            checkItem: (id) => set((state) => ({
                shoppingList: state.shoppingList.map((item) => {
                    if(item.id !== id)
                        return item
                    else return {
                        ...item,
                        checked: !item.checked
                    }
                })
            })),
            addItem: (product, count) => set((state) => {
                const foundItem = state.shoppingList.find(item => item.id === product.id)
                if(foundItem){
                    return {
                        shoppingList: state.shoppingList.map((item) => {
                            if(item.id !== product.id)
                                return item
                            else return {
                                ...item,
                                quantity: item.quantity + count
                            }
                        })
                    }
                }else{
                    return {
                        shoppingList: [...state.shoppingList, {
                            ...product,
                            quantity: count,
                            checked: false
                        }]
                    }
                }
            })
        }),
        {
            name: "shoppingList"
        }
    )
)