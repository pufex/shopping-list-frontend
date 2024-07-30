import { useState } from "react"
import { useAuth } from "./AuthContext"
import Button from "../ui/comps/Button"
import api from "../api/api"

const LogoutButton = () => {

    const {setAuth} = useAuth()
    const [isLoading, setLoading] = useState(false)

    const handleLogout = async () => {
        setLoading(true)
        try{
            await api.get("/auth/logout")
            setAuth({isAuthenticated: false})
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    return <Button
        type="raw"
        onClick={handleLogout}
        isLoading={isLoading}
        isDisabled={isLoading}
    >
        {
            isLoading
                ? "Logging out..."
                : "Logout"
        }
    </Button>
}

export default LogoutButton
