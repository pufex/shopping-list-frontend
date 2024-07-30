import {Navigate, Outlet, useLocation} from "react-router-dom"
import { useAuth } from "./AuthContext"

const SecureComponent = () => {
    
    const {pathname} = useLocation()
    const {auth} = useAuth()
    
    return !auth.isAuthenticated
        ?  <Navigate to="/login" replace state={{previous: pathname}} />
        : <Outlet />
}

export default SecureComponent
