import { useAuth } from "../../auth/AuthContext"
import { useAvailableProducts } from "../../store/availableProducts"
import { useUsersProducts } from "../../hooks/useUsersProducts"

import DeleteAllProducts from "./DeleteAllProducts"
import ProductList from "./ProductList"
import LoadingBlock from "../../components/LoadingBlock"

const UsersList = () => {

    const {auth} = useAuth()
    const {userProducts} = useAvailableProducts()
    const {isLoading, error} = useUsersProducts()

    if(auth.isAuthenticated)   
    return <section className="users-list">
        <header className="users-list__header">
            <h1 className="users-list__title">
                Your products:
            </h1>
            {
                isLoading || error
                    ? null
                    : <div className="users-list__options">
                        <DeleteAllProducts />
                    </div>
            }
        </header>
        {
            isLoading
                ? <LoadingBlock />
                : error
                    ? <h1 className="users-list__error">
                        Failed to fetch your custom products!
                    </h1>
                    : <ProductList products={userProducts} />
        }
    </section>

    else
    return null

}

export default UsersList
