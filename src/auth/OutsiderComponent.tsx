import {Navigate, Outlet} from "react-router-dom"
import { useAuth } from "./AuthContext"

const OutsiderComponent = () => {
    
    const {auth} = useAuth()
    
    return auth.isAuthenticated
        ?  <Navigate to="/" replace />
        : <Outlet />
}

export default OutsiderComponent
