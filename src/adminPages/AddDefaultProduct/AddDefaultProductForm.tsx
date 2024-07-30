import type { FieldValues } from "react-hook-form"
import type { ProductTypeInForm, ProductType } from "../../store/shoppingList"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { useAvailableProducts } from "../../store/availableProducts"

import Input from "../../ui/comps/Input"
import Textarea from "../../ui/comps/Textarea"
import Button from "../../ui/comps/Button"
import Checkbox from "../../ui/comps/Checkbox"
import { FormProvider } from "react-hook-form"

import api from "../../api/api"
import { isAxiosError } from "axios"

const AddDefaultProductForm = () => {

    const {pushDefaultProduct} = useAvailableProducts()

    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const methods = useForm()
    const {handleSubmit, reset, formState: {errors}, watch} = methods
    
    const isDiscounted = watch("isDiscounted")

    const onSubmit = async (data: FieldValues) => {
        let {
            name,
            price, 
            description,
            isDiscounted,
            discount,
            isKilogrames,
        } = data

        const payload: ProductTypeInForm = {
            name,
            price, 
            description,
            isDiscounted,
            discount,
            isKilogrames,
        }

        
        if(!isDiscounted)
            discount = null
        else if(!discount)
            isDiscounted = false

        setLoading(true)
        try{
            const result = await api.post("/products/admin/new", payload)
            const newProduct = result.data as ProductType
            pushDefaultProduct(newProduct)
            reset()
        }catch(err){
            console.log(err)
            if(isAxiosError(err)){
                setError("Failed to add new product.")
            }else setError("An unknown error occured...")
        }finally{
            setLoading(false)
        }

    }

    return <FormProvider {...methods}>
        <form
            className="add-default-product-form"
            onSubmit={handleSubmit(onSubmit)}
        >
            {
                error 
                    && <h1 className="add-default-product-form__error">
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
            >
                Name
            </Input>
            <Input
                name="price"
                registerOptions={{}}
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
                errorMessage={`${errors.description?.message ?? ""}`}
                placeholder="What is it about?"
            >
                Description
            </Textarea>
            <Checkbox 
                name="isDiscounted"
                className="add-default-product-form__is-discounted"
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
                        className="add-default-product-form__discount"
                    >
                        Discount
                    </Input>
            }
            <Checkbox name="isKilogrames">
                Is the product in kilogrames?
            </Checkbox>
            <Button
                isLoading={isLoading}
                isDisabled={isLoading}
                className="add-default-product-form__submit"
            >
                {
                    isLoading
                        ? "Creating..."
                        : "Create"
                }
            </Button>
        </form>
    </FormProvider>
}

export default AddDefaultProductForm
