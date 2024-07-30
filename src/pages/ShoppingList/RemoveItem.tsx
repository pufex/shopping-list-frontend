import { useShoppingList } from "../../store/shoppingList"

import { FaTrashCan as TrashIcon} from "react-icons/fa6";

type RemoveItemProps = {
    id: string
}

const RemoveItem = ({id}:RemoveItemProps) => {
    
    const {removeItem} = useShoppingList()

    const handleItemRemoval = () => {
        removeItem(id)
    }

    return <button
        className="remove-item__button"
        onClick={handleItemRemoval}
    >
        <TrashIcon 
            className="remove-item__icon"
            size={25}
        />
    </button>
}

export default RemoveItem
