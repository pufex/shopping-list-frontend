import type { ShoppingListItem } from "../../store/shoppingList";

import { useShoppingList } from "../../store/shoppingList";

import { FaPlus as PlusIcon } from "react-icons/fa6";
import { FaMinus as MinusIcon } from "react-icons/fa";

type ItemCounterProps = {
    product: ShoppingListItem
}

const ItemCounter = ({product}: ItemCounterProps) => {

    const {changeCount} = useShoppingList()

    const handleDecrement = () => {
        if(product.quantity <= 1)
            return
        changeCount(product.id, -1)
    }

    const handleIncrement = () => {
        changeCount(product.id, 1)
    }

    return <div className="item-counter">
        <button
            className="item-counter__button"
            disabled={product.quantity <= 1 ? true : false}
            onClick={handleDecrement}
        >
            <MinusIcon 
                className="item-counter__icon" 
                size={20} 
            />
        </button>
        <div className="item-counter__count">
            {product.quantity}
        </div>
        <button
            className="item-counter__button"
            onClick={handleIncrement}
        >
            <PlusIcon 
                className="item-counter__icon" 
                size={25} 
            />
        </button>
    </div>
}

export default ItemCounter
