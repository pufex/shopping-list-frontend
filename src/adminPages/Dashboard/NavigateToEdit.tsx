import { useNavigate } from "react-router-dom"
import Button from "../../ui/comps/Button"

type EditDefaultProductProps = {
    id: string
}

const NavigateToEdit = ({id}: EditDefaultProductProps) => {
    
    const navigate = useNavigate()
    
    return <Button
        onClick={() => navigate(`/dashboard/edit/${id}`)}
    >
        Edit
    </Button>
}

export default NavigateToEdit
