import { useNavigate } from "react-router-dom"
import { FaPlus } from "react-icons/fa";

const NavigateToNew = () => {

    const navigate = useNavigate()

    return <FaPlus
        onClick={() => navigate("/home/new-product")}
        className="navigate-to-new"
        size={30}
    />
}

export default NavigateToNew
