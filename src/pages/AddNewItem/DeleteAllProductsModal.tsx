import { useState } from "react"
import { useAvailableProducts } from "../../store/availableProducts"
import Button from "../../ui/comps/Button"
import api from "../../api/api"

type DeleteAllProductsModalProps = {
    closeModal: () => void
}

const DeleteAllProductsModal = ({closeModal}:DeleteAllProductsModalProps) => {

    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const {setUsersProducts} = useAvailableProducts()
    const handleDeletingAllProducts = async () => {
        setLoading(true)
        setError("")
        try{
            await api.delete("/products/all")
            setUsersProducts([])
            closeModal()
        }catch(err){
            console.log(err)
            setError("Something went wrong...")
        }finally{
            setLoading(false)
        }
    }

    return <div className="delete-all-products-modal">
        <div className="delete-all-products-modal__card">
            <h1 className="delete-all-products-modal__heading">
                Delete ALL products?
            </h1>
            {
                error
                    && <h1 className="delete-all-products-modal__error">
                        {error}
                    </h1>
            }
            <p className="delete-all-products-modal__information">
                Deleting all products will permamently remove them forever! It's irreversible! Are you sure you want to proceed?
            </p>
            <div className="delete-all-products-modal__buttons">
                <Button onClick={closeModal}>
                    Cancel
                </Button>
                <Button
                    onClick={handleDeletingAllProducts}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                >
                    {
                        isLoading
                            ? "Deleting all..."
                            : "Delete all products!"
                    }
                </Button>
            </div>
        </div>
    </div>
}

export default DeleteAllProductsModal
