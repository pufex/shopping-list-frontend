import { Outlet, Navigate, Link } from "react-router-dom"
import { useAuth } from "../../auth/AuthContext"

const DashboardLayout = () => {

    const {auth} = useAuth()

    if(!auth.isAuthenticated || !auth.user.isAdmin)
    return <Navigate to="/home" replace />

    else
    return <>
        <div className="nav--fake"/>
        <nav className="nav">
            <section className="nav--side">
                <Link
                    className="nav__link"
                    to="/dashboard"
                >
                    Dashboard
                </Link>
                <Link
                    className="nav__link"
                    to="/home"
                >
                    Home
                </Link>
            </section>
            <section className="nav--side">
                <Link
                    className="nav__link"
                    to="/dashboard/new"
                >
                    Add Default Product
                </Link>
            </section>
        </nav>
        <main className="Admin">
            <Outlet />
        </main>
    </>
}

export default DashboardLayout
