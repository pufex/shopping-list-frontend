import type { FieldValues } from "react-hook-form"

import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import Button from "../ui/comps/Button"
import Input from "../ui/comps/Input"
import { FormProvider } from "react-hook-form"

import api from "../api/api"
import { isAxiosError } from "axios"

const RegisterForm = () => {


    const navigate = useNavigate()

    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const methods = useForm()
    const {handleSubmit, formState: {errors}} = methods

    const onSubmit = async (data: FieldValues) => {
        const {name, password} = data
        setError("")
        setLoading(true)
        try{
            await api.post("/auth/register", {name, password})
            navigate("/login")
        }catch(err){
            if(isAxiosError(err)){
                if(err.response?.status === 409){
                    return setError("This user already exists.")
                }else setError("Something went wrong...")
            }else return setError("An unknown error occured.")
        }finally{
            setLoading(false)
        }
    }

    return <FormProvider {...methods}>
        <form
            className="auth__form"
            onSubmit={handleSubmit(onSubmit)}
        >
            {
                error
                    && <h1 className="auth__error">
                        {error}
                    </h1>
            }
            <Input
                name="name"
                registerOptions={{
                    required: "Required",
                    minLength: {
                        value: 6,
                        message: "Min. 6 char."
                    },
                    maxLength: {
                        value: 30,
                        message: "Max. 30 char"
                    }
                }}
                errorMessage={`${errors.name?.message ?? ""}`}
                placeholder="Your username"
            >
                Username
            </Input>
            <Input
                name="password"
                registerOptions={{
                    required: "Required",
                    minLength: {
                        value: 8,
                        message: "Min. 8 char."
                    },
                    maxLength: {
                        value: 16,
                        message: "Max. 16 char"
                    }
                }}
                errorMessage={`${errors.password?.message ?? ""}`}
                placeholder="Your password"
                isPassword
            >
                Password
            </Input>
            <Button
                isLoading={isLoading}
                isDisabled={isLoading}
                className="auth__submit"
            >
                {
                    isLoading
                        ? "Registering..."
                        : "Register now!"
                }
            </Button>
        </form>
    </FormProvider>
}

export default RegisterForm
