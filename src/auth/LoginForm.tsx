import type { FieldValues } from "react-hook-form"
import type { LoggedInAuth } from "./AuthContext"

import { useForm } from "react-hook-form"
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "./AuthContext"

import Button from "../ui/comps/Button"
import Input from "../ui/comps/Input"
import { FormProvider } from "react-hook-form"

import api from "../api/api"
import { isAxiosError } from "axios"

const LoginForm = () => {

    const {setAuth} = useAuth()

    const navigate = useNavigate()
    const {state} = useLocation()

    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const methods = useForm()
    const {handleSubmit, formState: {errors}} = methods

    const onSubmit = async (data: FieldValues) => {
        const {name, password} = data
        setError("")
        setLoading(true)
        try{
            const response = await api.post("/auth/login", {name, password})
            const authObj = response.data as LoggedInAuth
            setAuth(authObj)
            if(state.previous)
                return navigate(state.previous)
            else return navigate("/home")
        }catch(err){
            if(isAxiosError(err)){
                if(err.response?.status === 401){
                    return setError("User not found.")
                }else if(err.response?.status === 409){
                    return setError("Wrong username or password.")
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
                        ? "Logging in..."
                        : "Login"
                }
            </Button>
        </form>
    </FormProvider>
}

export default LoginForm
