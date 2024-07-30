import { useShoppingList } from "../../store/shoppingList"
import { FaCheck as CheckIcon} from "react-icons/fa";
import { cn } from "../../utils/cn";

type CheckItemProps = {
    id: string,
    checked: boolean
}

const CheckItem = ({
    id,
    checked
}: CheckItemProps) => {
    
    const {checkItem} = useShoppingList()
    
    return <div 
        className={cn(
            "check-item__container",
            checked ? "checked" : ""
        )}
        onClick={() => checkItem(id)}
    >
        {
            checked
                && <CheckIcon 
                    className="check-icon"
                    size={30}
                />
        }
    </div>
}

export default CheckItem
