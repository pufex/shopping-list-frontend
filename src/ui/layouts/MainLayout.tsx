import { useAuth } from "../../auth/AuthContext"
import { useLocation } from "react-router-dom"

import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import NavigateToAdd from "../../components/NavigateToAdd"
import NavigateToNew from "../../components/NavigateToNew"
import LogoutButton from "../../auth/LogoutButton"

const MainLayout = () => {

    const {pathname} = useLocation()
    const {auth} = useAuth()

    return <>
        <div className="nav--fake" />
        <nav className="nav">
            <div className="nav--side">
                <Link className="nav__link" to="/home">
                    Home
                </Link>
                {
                    auth.isAuthenticated && auth.user.isAdmin
                        && <Link 
                            to="/dashboard" 
                            className="nav__link"
                        >
                            Dashboard
                        </Link>
                }
                {
                    auth.isAuthenticated
                        ? <LogoutButton />
                        : <Link 
                            to="/login" 
                            state={{previous: pathname}}
                            className="nav__link"
                        >
                            Login
                        </Link>
                }
            </div>
            <div className="nav--side">
                <NavigateToAdd />
                {
                    auth.isAuthenticated
                        && <NavigateToNew />
                }
            </div>
        </nav>
        <main className="App">
            <Outlet />
        </main>
    </> 
}

export default MainLayout
