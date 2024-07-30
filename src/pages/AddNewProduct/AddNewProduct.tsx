import type { ProductType } from "../../store/shoppingList"
import type { FieldValues } from "react-hook-form"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAvailableProducts } from "../../store/availableProducts"

import { FormProvider } from "react-hook-form"
import Button from "../../ui/comps/Button"
import Input from "../../ui/comps/Input"
import Textarea from "../../ui/comps/Textarea"
import Checkbox from "../../ui/comps/Checkbox"

import api from "../../api/api"

const AddNewProduct = () => {

    const navigate = useNavigate()

    const {pushProduct} = useAvailableProducts()

    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const methods = useForm()
    const {handleSubmit, formState: {errors}, watch, reset} = methods
    const isDiscounted = watch("isDiscounted")

    const onSubmit = async(data: FieldValues) => {
        let {
            name, 
            price, 
            description, 
            isDiscounted, 
            discount,
            isKilogrames,
        } = data
        
        if(!isDiscounted)
            discount = 0
        else if(!discount)
            isDiscounted = false

        const payload = {
            name, 
            price, 
            description, 
            isDiscounted, 
            discount,
            isKilogrames,
        }

        setError("")
        setLoading(true)
        try{
            const response = await api.post("/products", payload)
            const newProduct = response.data as ProductType
            pushProduct(newProduct)
            reset()
            navigate("/home/add-product")
        }catch(err){
            console.log(err)
            setError("Something went wrong...")
        }finally{
            setLoading(false)
        }


    }

    return <section className="add-new-product">
        <div className="add-new-product__card">
            <h1 className="heading center add-new-product__heading">
                Add new product
            </h1>
            <FormProvider {...methods}>
                <form
                    className="add-new-product__form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {
                        error
                            && <h1 className="form__heading--error">
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
                        placeholder={"Product's name"}
                        errorMessage={`${errors?.name?.message ?? ""}`}
                    >
                        Name
                    </Input>
                    <Textarea 
                        name="description"
                        registerOptions={{
                            maxLength: {
                                value: 200,
                                message: "Max. 200 chars."
                            }
                        }}
                        placeholder={"Provide description"}
                        errorMessage={`${errors?.description?.message ?? ""}`}
                    >
                        Description
                    </Textarea>
                    <Input 
                        name="price"
                        placeholder={"Product's price"}
                        errorMessage={`${errors?.price?.message ?? ""}`}
                    >
                        Price
                    </Input>
                    <Checkbox
                        name="isDiscounted"
                        defaultChecked={false}
                        className="add-new-product__is-discounted"
                    >
                        Is this product on discount?
                    </Checkbox>
                    {
                        isDiscounted
                            && <Input 
                                name="discount"
                                registerOptions={{}}
                                placeholder={"Insert discount here..."}
                                errorMessage={`${errors?.discount?.message ?? ""}`}
                                className="add-new-product__input--discount"
                            >
                                Discount
                            </Input>
                    }
                    <Checkbox
                        name="isKilogrames"
                        defaultChecked={false}
                    >
                        Is this product in kilogrames?
                    </Checkbox>
                    <Button
                        isDisabled={isLoading}
                        isLoading={isLoading}
                        className="add-new-product__submit"
                    >
                        {
                            isLoading
                                ? "Creating..."
                                : "Create product"
                        }
                    </Button>
                </form>
            </FormProvider>
        </div>
    </section>
}

export default AddNewProduct
