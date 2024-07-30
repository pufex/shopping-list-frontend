import {useShoppingList} from "../../store/shoppingList.ts"
import ShoppingListItem from "./ShoppingListItem.tsx"


const ShoppingList = () => {
    
    const {shoppingList} = useShoppingList()

    return <section className="shopping-list">
        <h1 className="heading center shopping-list__heading">
            Shopping List
        </h1>
        {
            !shoppingList.length
                ? <p className="center shopping-list--empty">
                    Add new products to see them on the list!
                </p>
                : <ul className="shopping-list__grid">
                    {
                        shoppingList
                            .sort(function(x, y) {
                                return Number(x.checked) - Number(y.checked);
                            })
                            .map((item) => (
                                <ShoppingListItem product={item} />
                            ))
                    }
                </ul>
        }
    </section>
}

export default ShoppingList
