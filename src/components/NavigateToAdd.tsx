import { useNavigate } from "react-router-dom"
import { FaCartPlus as CartIcon } from "react-icons/fa6";

const NavigateToAdd = () => {

    const navigate = useNavigate()

    return <CartIcon
        onClick={() => navigate("/home/add-product")}
        className="navigate-to-add"
        size={32}
    />
}

export default NavigateToAdd
