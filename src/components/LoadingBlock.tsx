import { ImSpinner9 as LoadingIcon } from "react-icons/im";

type LoadingBlockProps = {
    size?: number,
    height?: string,
}

const LoadingBlock = ({
    size = 40,
    height = "400px"
}: LoadingBlockProps) => {
    return <div className="loading-block" style={{height}}>
        <LoadingIcon 
            className="loading-block__icon"
            size={size}
        />
    </div>
}

export default LoadingBlock
