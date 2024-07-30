import RegisterForm from "../../auth/RegisterForm"
import { Link } from "react-router-dom"

const RegisterPage = () => {
    return <section className="register-page">
        <div className="register-page__card">
            <h1 className="auth__heading center register-page__heading">
                Create an account
            </h1>
            <RegisterForm />
            <div className="register-page__options">
                <p className="auth__option">
                    Already have an account? <Link className="auth__link" to="/login">Go to login!</Link>
                </p>
            </div>
        </div>
    </section>
}

export default RegisterPage
