import { useState, useLayoutEffect } from "react"
import { useAuth } from "../../auth/AuthContext"

import DefaultList from "./DefaultList"
import UsersList from "./UsersList"
import Button from "../../ui/comps/Button"

const AddNewItem = () => {
    
    const {auth} = useAuth()
    const [page, setPage] = useState(1)

    useLayoutEffect(() => {
        if(!auth.isAuthenticated)
            setPage(1)
    }, [auth])

    return <section className="items__lists">
        <header className="items__header">
            <h1 className="heading center">
                Add items!
            </h1>
        </header>
        {
            auth.isAuthenticated
                && <section className="items__options">
                    <Button
                        role="button"
                        onClick={() => setPage(1)}
                    >
                        Default products
                    </Button>
                    <Button
                        role="button"
                        onClick={() => setPage(2)}
                    >
                        Custom products
                    </Button>
                </section>
        }
        {
            page === 1
                && <DefaultList />
        }
        {
            page === 2
                && <UsersList />
        }
    </section>
}

export default AddNewItem
