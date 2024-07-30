import { useAvailableProducts } from "../../store/availableProducts"
import { useProducts } from "../../hooks/useProducts"

import ProductList from "./ProductList"
import LoadingBlock from "../../components/LoadingBlock"

const DefaultList = () => {

    const {isLoading, error} = useProducts()
    const {products} = useAvailableProducts()

    return <section className="default-list">
        <h1 className="default-list__title"> 
            Available Products:
        </h1>
        {
            isLoading
                ? <LoadingBlock />
                : error
                    ? <h1 className="default-list__error">
                        Failed to fetch this resource!
                    </h1>
                    : <ProductList products={products} />
        }
    </section>
}

export default DefaultList
