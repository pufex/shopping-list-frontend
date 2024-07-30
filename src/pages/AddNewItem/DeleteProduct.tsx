import type { ProductType } from "../../store/shoppingList";
import { useState } from "react";

import { FaTrashCan as TrashIcon } from "react-icons/fa6";
import DeleteItemModal from "./DeleteProductModal";

type DeleteProductProps = {
    product: ProductType,
}

const DeleteProduct = ({product}: DeleteProductProps) => {
    const [show, setShow] = useState(false)
    const toggleShow = () => setShow(prev => !prev)
    const closeModal = () => setShow(false)

    return <>
        {
            show
                && <DeleteItemModal 
                    id={product.id} 
                    name={product.name}
                    closeModal={closeModal}
                />
        }
        <button
            className="delete-product__button"
            onClick={toggleShow}
        >
            <TrashIcon 
                className="delete-product__icon"
                size={20}
            />
        </button>
    </>

}

export default DeleteProduct
