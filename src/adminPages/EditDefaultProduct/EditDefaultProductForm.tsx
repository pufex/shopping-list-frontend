import type { FieldValues } from "react-hook-form"
import type { ProductTypeInForm, ProductType } from "../../store/shoppingList"

import { useForm } from "react-hook-form"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import { useAvailableProducts } from "../../store/availableProducts"

import Input from "../../ui/comps/Input"
import Textarea from "../../ui/comps/Textarea"
import Button from "../../ui/comps/Button"
import Checkbox from "../../ui/comps/Checkbox"
import { FormProvider } from "react-hook-form"
import { Navigate } from "react-router-dom"

import api from "../../api/api"
import { isAxiosError } from "axios"

const EditDefaultProductForm = () => {
    
    const navigate = useNavigate()

    const {id} = useParams() 
    const {
        products, 
        updateProduct,
        deleteProduct
    } = useAvailableProducts()

    const product = useMemo(() => (
        products.find(product => product.id === id)
    ), [products])

    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const methods = useForm()
    const {handleSubmit, formState: {errors}, watch} = methods
    
    const isDiscounted = watch("isDiscounted")

    const onSubmit = async (data: FieldValues) => {
        
        if(!product || !id)
            return navigate("/dashboard")
        
        let {
            name,
            price, 
            description,
            isDiscounted,
            discount,
            isKilogrames,
        } = data

        if(!isDiscounted)
            discount = null
        else if(!discount)
            isDiscounted = false

        const payload: ProductTypeInForm = {
            name,
            price, 
            description,
            isDiscounted,
            discount,
            isKilogrames,
        }

        setLoading(true)
        try{
            const result = await api.patch(`/products/admin/${id}`, payload)
            const updatedProduct = result.data as ProductType
            updateProduct(updatedProduct)
            navigate("/dashboard")
        }catch(err){
            console.log(err)
            if(isAxiosError(err)){
                if(err.response?.status === 404){
                    setError("Product not found...")
                    deleteProduct(id)
                }else setError("Failed to add new product.")
            }else setError("An unknown error occured...")
        }finally{
            setLoading(false)
        }

    }

    if(product)
    return <FormProvider {...methods}>
        <form
            className="edit-default-product-form"
            onSubmit={handleSubmit(onSubmit)}
        >
            {
                error 
                    && <h1 className="edit-default-product-form__error">
                        {error}
                    </h1>
            }
            <Input
                name="name"
                registerOptions={{
                    required: "Required",
                    minLength: {
                        value: 2,
                        message: "Min. 2 chars."
                    },
                    maxLength: {
                        value: 50,
                        message: "Max. 50 chars."
                    }
                }}
                errorMessage={`${errors.name?.message ?? ""}`}
                placeholder="Product's name"
                defaultValue={product.name}
            >
                Name
            </Input>
            <Input
                name="price"
                registerOptions={{}}
                defaultValue={product.price.toString()}
                errorMessage={`${errors.price?.message ?? ""}`}
                placeholder="Product's price"

            >
                Price
            </Input>
            <Textarea
                name="description"
                registerOptions={{
                    maxLength: {
                        value: 200,
                        message: "Max. 200 chars."
                    }
                }}
                defaultValue={product.description ?? undefined}
                errorMessage={`${errors.description?.message ?? ""}`}
                placeholder="What is it about?"
            >
                Description
            </Textarea>
            <Checkbox 
                name="isDiscounted"
                defaultChecked={product.isDiscounted}
                className="edit-default-product-form__is-discounted"
            >
                Is the product on discount?
            </Checkbox>
            {
                isDiscounted
                    && <Input
                        name="discount"
                        registerOptions={{}}
                        errorMessage={`${errors.discount?.message ?? ""}`}
                        placeholder="Product's discount"
                        defaultValue={product.discount?.toString() ?? undefined}
                        className="edit-default-product-form__discount"
                    >
                        Discount
                    </Input>
            }
            <Checkbox 
                name="isKilogrames"
                defaultChecked={product.isKilogrames}
            >
                Is the product on discount?
            </Checkbox>
            <Button
                isLoading={isLoading}
                isDisabled={isLoading}
                className="edit-default-product-form__submit"
            >
                {
                    isLoading
                        ? "Saving changes..."
                        : "Save"
                }
            </Button>
        </form>
    </FormProvider>

    else 
    return <Navigate to="/dashboard" replace />
}

export default EditDefaultProductForm
