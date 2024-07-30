import { createContext, useContext, useState, useEffect, useLayoutEffect } from "react";
import LoadingBlock from "../components/LoadingBlock";
import api from "../api/api";

export type UserType = {
    id: string,
    name: string,
    isAdmin: boolean,
    createdAt: Date,
    updatedAt: Date
}

export type LoggedOutAuth = {
    isAuthenticated: false,
    user?: null,
    token?: null
}

export type LoggedInAuth = {
    isAuthenticated: true,
    user: UserType,
    token: string
}

export type AuthObject = LoggedOutAuth | LoggedInAuth

export type AuthContextType = {
    auth: AuthObject,
    setAuth: React.Dispatch<React.SetStateAction<AuthObject>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const auth = useContext(AuthContext)
    if(!auth) throw new Error("useAuth() cannot be used outside its auth provider.")
    return auth
}

type AuthProviderProps = {
    children: React.ReactNode
}

const AuthProvider = ({
    children
}: AuthProviderProps) => {

    const [isLoading, setLoading] = useState(true)
    const [auth, setAuth] = useState<AuthObject>({ isAuthenticated: false })

    useEffect(() => console.log(auth), [auth])

    useEffect(() => {
        const refetchToken = async () => {
            setLoading(true)
            try{
                const response = await api.get("/auth/refresh")
                const authObj = response.data as LoggedInAuth
                setAuth(authObj)
            }catch(err){
                console.log(err)
                setAuth({ isAuthenticated: false })
            }finally{
                setLoading(false)
            }
        }

        refetchToken()
    }, [])

    useLayoutEffect(() => {
        const reqInterceptor = api
            .interceptors
            .request
            .use((config) => {
                config.headers.authorization = auth.isAuthenticated
                    ? `Bearer ${auth.token}`
                    : config.headers.auth
                return config
            })

        return () => {
            api.interceptors.request.eject(reqInterceptor)
        }

    }, [auth])

    useLayoutEffect(() => {
        const responseInterceptor =  api
            .interceptors
            .response
            .use(
                (result) => result,
                async (error) => {
                    const originalRequest = error.config
                    if(
                        error.response?.status === 403
                        && originalRequest._retry 
                    ) {
                        try{
                            const response = await api.get("/auth/refresh")
                            const authObj = response.data as LoggedInAuth
                            setAuth(authObj)
                            
                            originalRequest.headers.authorization = `Bearer ${response.data.accessToken}`
                            originalRequest._retry = true;
        
                            return api(originalRequest)
                        }catch{
                            setAuth({ isAuthenticated: false })
                        }
                    }

                    return Promise.reject(error)
                }
            )

        return () => {
            api.interceptors.response.eject(responseInterceptor)
        }
    }, [auth])

    return <AuthContext.Provider value={{auth, setAuth}}>
        {
            isLoading
                ? <LoadingBlock height="100vh" />
                : children
        }
    </AuthContext.Provider>
}

export default AuthProvider
