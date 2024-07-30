import type { ProductType } from "../../store/shoppingList"
import { usePagination } from "../../hooks/usePagination"
import ItemPlaceholder from "../../assets/images/item-placeholder.png"
import DeleteProduct from "./DeleteProduct"
import AddItemForm from "./AddItemForm"

type ProductListProps = {
    products: ProductType[],
    emptyMessage?: string
}

const ProductList = ({
    products, 
    emptyMessage = "There are no items to display.",
}: ProductListProps) => {

    const {paginatedList: paginatedProducts, pagination} = usePagination<ProductType>(products, 5)

    if(!products.length)
    return <h1 className="product-list--empty">
        {emptyMessage}
    </h1>

    else
    return <>
        <ul className="product-list">
            {
                paginatedProducts
                    .map(product => (
                        <li className="new-item__container">
                            <img 
                                src={ItemPlaceholder}
                                alt={product.name}
                                className="new-item__icon"
                            />
                            <div className="new-item__rest">
                                <div className="new-item__info">
                                    <h2 className="new-item__name">
                                        {product.name}
                                    </h2>
                                    <span className="new-item__price">
                                        ${product.price}
                                    </span>
                                </div>
                                <div className="new-item__options">
                                    {
                                        product.user_id !== null
                                            && <DeleteProduct product={product} />
                                    }
                                    <AddItemForm product={product} />
                                </div>
                            </div>
                        </li>
                    ))
            }
        </ul>
        {pagination}
    </>
}

export default ProductList
