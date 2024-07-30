import type { ShoppingListItem } from "../../store/shoppingList"

import ItemCounter from "./ItemCounter"
import RemoveItem from "./RemoveItem"
import CheckItem from "./CheckItem"

import ItemPlaceholder from "../../assets/images/item-placeholder.png"
import { cn } from "../../utils/cn"

type ShoppingListItemProps = {product: ShoppingListItem}

const ShoppingListItem = ({product}: ShoppingListItemProps) => {
    return <li 
        className={cn(
            "list-item",
            product.checked ? "checked" : ""
        )}
    >
        <img 
            src={ItemPlaceholder} 
            alt={product.name}
            className="list-item__icon"
        />
        <div className="list-item__rest">
            <div className="list-item__labels">
                <h2 className="list-item__name">
                    {product.name}
                </h2>
                <h1 className="list-item__price">
                    ${product.price}
                </h1>
            </div>
            <div className="list-item__options">
                <ItemCounter product={product} />
                <RemoveItem id={product.id} />
                <CheckItem id={product.id} checked={product.checked} />
            </div>
        </div>
    </li>
}

export default ShoppingListItem
