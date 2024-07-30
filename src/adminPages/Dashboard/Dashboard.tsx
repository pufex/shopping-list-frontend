import { useState } from "react"

import DefaultProducts from "./DefaultProducts"
import UserProducts from "./UserProducts"

import Button from "../../ui/comps/Button"


const Dashboard = () => {

    const [page, setPage] = useState(1)

    return <>
        <header className="dashboard__header">
            <h1 className="dashboard__heading">
                Welcome to the dashboard!
            </h1>   
        </header>
        <section className='dashboard__options'>
            <Button
                onClick={() => setPage(1)}
                isDisabled={page === 1}
            >
                Default products
            </Button>
            <Button
                onClick={() => setPage(2)}
                isDisabled={page === 2}
            >
                Users Products
            </Button>
        </section>
        {
            page === 1
                && <DefaultProducts />
        }
        {
            page === 2
                && <UserProducts />
        }
    </>
}

export default Dashboard
