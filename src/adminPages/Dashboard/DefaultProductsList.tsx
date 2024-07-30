import type { ProductType } from "../../store/shoppingList"

import ItemPlaceholder from "../../assets/images/item-placeholder.png"
import DeleteProduct from "./DeleteProduct"
import NavigateToEdit from "./NavigateToEdit"

type DefaultProductsListProps = {
    products: ProductType[]
}

const DefaultProductsList = ({products}: DefaultProductsListProps) => {

    return <ul className="default-products-list">
        {
            products.map(product => (
                <li 
                    className="new-item__container"
                    key={product.id}
                >
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
                            <NavigateToEdit id={product.id} />
                        </div>
                    </div>
                </li>
            ))
        }
    </ul>
}

export default DefaultProductsList
