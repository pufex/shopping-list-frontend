import LoginForm from "../../auth/LoginForm"
import { Link } from "react-router-dom"

const LoginPage = () => {
    return <section className="login-page">
        <div className="login-page__card">
            <h1 className="auth__heading center login-page__heading">
                Login now!
            </h1>
            <LoginForm />
            <div className="login__options">
                <p className="auth__option">
                    You don't have an account? <Link className="auth__link" to="/register">Register now!</Link>
                </p>
            </div>
        </div>
    </section>
}

export default LoginPage
