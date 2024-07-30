import type { ProductType } from "../../store/shoppingList"

import { useUsersProductsByName } from "../../hooks/useUsersProductsByName"
import { useAvailableProducts } from "../../store/availableProducts"
import { usePagination } from "../../hooks/usePagination"
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

import SearchForm from "../../components/SearchForm"
import LoadingBlock from "../../components/LoadingBlock"
import UserProductsList from "./UserProductsList"

const UserProducts = () => {
	
	const [params, setParams] = useSearchParams()

	const userSearch = params.get("userSearch")
	const productSearch = params.get("productSearch")

	const handleUserSearch = (val: string) => {
		setParams(prev => {
			prev.set("userSearch", val)
			return prev
		})
	}

	const handleProductSearch = (val: string) => {
		setParams(prev => {
			prev.set("productSearch", val)
			return prev
		})
	}

	const {error, isLoading} = useUsersProductsByName(userSearch ?? "")
	const {userProducts} = useAvailableProducts()
	
	const memoProducts = useMemo(() => {
		return !productSearch 
			? userProducts
			: userProducts.filter(product => (
				product.name.toLowerCase().includes(productSearch.toLowerCase())
			))
	}, [userProducts, productSearch])
	const {paginatedList, pagination} = usePagination<ProductType>(memoProducts)

	return <section className="user-products">
        <header className="user-products__header">
			<label className="user-products__user-search__label">
				Search for user by their name
			</label>
			<SearchForm 
				onSearch={(val) => handleUserSearch(val)}
				placeholder="Search for user by name..."
				defaultValue={userSearch ?? undefined}
				className="user-products__user-search"
			/>
        </header>
		{
			error === "User not found."
				&& <h1 className="user-products__error">
					{error}
				</h1>	
		}
		{
			error === "" && userSearch
				? isLoading
					? <LoadingBlock />
					: !userProducts.length
							? <h1 className="default-products-list--empty"> 
								There is no products to display.
							</h1>
							: <section className="user-products__list-container">
								<SearchForm 
									onSearch={(val) => handleProductSearch(val)}
									defaultValue={productSearch ?? undefined}
									placeholder="Search for a product!"
									className="user-products__products-search"
								/>
								{
									!paginatedList.length
										? <h1 className="default-products-list--empty">
											No product matched the search.
										</h1>
										: <UserProductsList products={paginatedList} />
								}
								{pagination}
							</section>
				: null
		}
    </section>
}

export default UserProducts
