import type { ProductType } from "../../store/shoppingList"
import DeleteProduct from "./DeleteProduct"
import ItemPlaceholder from "../../assets/images/item-placeholder.png"

type UserProductsListProps = {
    products: ProductType[]
}

const UserProductsList = ({products}: UserProductsListProps) => {
    return <ul className="user-products-list">
        {
            products.map(product => (
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
                            <DeleteProduct id={product.id} />
                        </div>
                    </div>
                </li>
            ))
        }
    </ul>
}

export default UserProductsList
