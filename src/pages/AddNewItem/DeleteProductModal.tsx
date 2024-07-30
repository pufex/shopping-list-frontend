import { useState } from "react"
import { useAvailableProducts } from "../../store/availableProducts"

import Button from "../../ui/comps/Button"

import api from "../../api/api"

type DeleteProductModalProps = {
    id: string,
    name: string,
    closeModal: () => void
}

const DeleteProductModal = ({id, name, closeModal}: DeleteProductModalProps) => {
    
    const {deleteUserProduct} = useAvailableProducts()

    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleDeleting = async () => {
        setError("")
        setLoading(true)
        try {
            await api.delete(`/products/${id}`)
            deleteUserProduct(id)
            closeModal()
        }catch(err){
            console.log(err)
            setError("Something went wrong...")
        }finally{
            setLoading(false)
        }
    }
    
    return <div className='delete-item-modal'>
        <div className='delete-item-modal__card'>
            <h1 className='delete-item-modal__heading center'>
                Are you sure?
            </h1>
            {
                error
                    && <h1 className="delete-item-modal__error">
                        {error}
                    </h1>   
            }
            <p className='delete-item-modal__information'>
                Do you really want to remove "{name}" permamently?
            </p>
            <div className="delete-item-modal__buttons">
                <Button onClick={closeModal}>
                    Cancel
                </Button>
                <Button 
                    onClick={handleDeleting}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    className="delete-item-modal__submit"
                >
                    {
                        isLoading    
                            ? "Deleting..."
                            : "Proceed"
                    }
                </Button>
            </div>
        </div>
    </div>
}

export default DeleteProductModal
