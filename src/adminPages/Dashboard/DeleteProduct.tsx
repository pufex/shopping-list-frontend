import { useState } from "react"
import { useAvailableProducts } from "../../store/availableProducts"
import Button from "../../ui/comps/Button"
import api from "../../api/api"

type DeleteProductProps = {
    id: string
}

const DeleteProduct = ({id}: DeleteProductProps) => {

    const {deleteProduct} = useAvailableProducts()
    const [isLoading, setLoading] = useState(false)

    const handleDeleting = async () => {
        setLoading(true)
        try{
            await api.delete(`/products/admin/${id}`)
            deleteProduct(id)
        }catch(err){
            console.log(`Failed to delete item (id: ${id})`)
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    return <Button
        onClick={handleDeleting}
        isLoading={isLoading}
        isDisabled={isLoading}
    >
        {
            isLoading
                ? "Deleting..."
                : "Delete"
        }
    </Button>
}

export default DeleteProduct
