import type { FieldValues } from "react-hook-form"

import { useForm } from "react-hook-form"

import { FormProvider } from "react-hook-form"
import Input from "../ui/comps/Input"
import Button from "../ui/comps/Button"

import { cn } from "../utils/cn"

type SearchProductsProps = {
    onSearch: (val: string) => void,
    className?: string,
    placeholder?: string,
    defaultValue?: string,
}

const SearchForm = ({
    onSearch,
    className = "",
    placeholder = "Search here...",
    defaultValue
}: SearchProductsProps) => {

    const methods = useForm()
    const {handleSubmit} = methods

    const onSubmit = (data: FieldValues) => {
        const {search} = data
        onSearch(search)
    }

    return <FormProvider {...methods}>
        <form
            className={cn(
                "search-products__form",
                className
            )}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input 
                name="search"
                registerOptions={{
                    maxLength: {
                        value: 50,
                        message: "Max. 50 chars."
                    }
                }}
                defaultValue={defaultValue}
                placeholder={placeholder}
            />
            <Button>
                Search
            </Button>
        </form>
    </FormProvider>
}

export default SearchForm
