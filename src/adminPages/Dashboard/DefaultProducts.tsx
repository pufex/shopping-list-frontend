import type { ProductType } from "../../store/shoppingList"

import { useMemo, useState } from "react"
import { useProducts } from "../../hooks/useProducts"
import { useAvailableProducts } from "../../store/availableProducts"
import { usePagination } from "../../hooks/usePagination"

import SearchForm from "../../components/SearchForm"
import DefaultProductsList from "./DefaultProductsList"
import LoadingBlock from "../../components/LoadingBlock"

const DefaultProducts = () => {

    const {error, isLoading} = useProducts()
    const {products} = useAvailableProducts()

    const [search, setSearch] = useState("")
    const memoProducts = useMemo(() => {
        return search === ""
            ? products
            : products.filter(product => (
                product.name.toLowerCase().includes(search.toLowerCase())
            ))
    }, [products, search])

    const {paginatedList, pagination} = usePagination<ProductType>(memoProducts, 5)

    return <section className="default-products">
        <header className="default-products__header">
            Default products
        </header>
        <section className="default-products__list-container">
            {
                isLoading
                ? <LoadingBlock />
                : error || !memoProducts.length
                    ? <h1 className="default-products-list--empty"> 
                        There is no products to display.
                    </h1>
                    : <>
                        <SearchForm 
                            onSearch={(val) => setSearch(val)}
                            className="default-products__search" 
                        />
                        <DefaultProductsList products={paginatedList} />
                        {pagination}
                    </>
            }
        </section>
    </section>
}

export default DefaultProducts
