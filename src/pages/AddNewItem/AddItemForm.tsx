import type { ProductType } from '../../store/shoppingList';

import { useState } from 'react'
import { useShoppingList } from '../../store/shoppingList';

import { FaPlus as PlusIcon } from "react-icons/fa6";
import { FaMinus as MinusIcon } from "react-icons/fa";
import Button from '../../ui/comps/Button';

type AddItemFormProps = {
    product: ProductType
}

const AddItemForm = ({
    product
}: AddItemFormProps) => {

    const {addItem} = useShoppingList()
    const [count, setCount] = useState(0)

    const decreaseCount = () => {
        setCount(prev => prev <= 0
            ? prev
            : prev - 1
        )
    }

    const increaseCount = () => {
        setCount(prev => prev >= 99
            ? prev
            : prev + 1
        )
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(count <= 0)
            return
        addItem(product, count)
        setCount(0)
    }

    return <form
        onSubmit={handleSubmit}
        className='add-item-form'
    >
        <div className='add-item-form__counter'>
            <button
                onClick={decreaseCount}
                className='add-item-form__button'
                type="button"
            >
                <MinusIcon 
                    className='add-item-form__icon'
                    size={20}
                />
            </button>
            <div className='add-item-form__count'>
                {count}
            </div>  
            <button
                onClick={increaseCount}
                className='add-item-form__button'
                type="button"
            >
                <PlusIcon 
                    className='add-item-form__icon'
                    size={25}
                />
            </button>
        </div>
        <Button 
            className='add-item-form__submit'
        >
            Add
        </Button>
    </form>
}

export default AddItemForm
