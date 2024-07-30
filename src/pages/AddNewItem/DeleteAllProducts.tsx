import { useState } from "react"

import Button from "../../ui/comps/Button"
import DeleteAllProductsModal from "./DeleteAllProductsModal"

const DeleteAllProducts = () => {
    
    const [show, setShow] = useState(false)
    const toggleShow = () => setShow(prev => !prev)
    const closeModal = () => setShow(false)

    return <>
        {
            show
                && <DeleteAllProductsModal closeModal={closeModal} />
        }
        <Button
            onClick={toggleShow}
        >
            Delete all
        </Button>
    </>
}

export default DeleteAllProducts
