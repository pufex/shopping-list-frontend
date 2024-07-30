import type { RegisterOptions } from "react-hook-form"

import { useEffect, useRef } from "react"
import { useFormContext } from "react-hook-form"

import { cn } from "../../utils/cn";

type TextareaProps = {
    name: string,
    registerOptions?: RegisterOptions,
    errorMessage?: string,
    children?: React.ReactNode,
    placeholder?: string,
    className?: string,
    defaultValue?: string,
}

const Textarea = ({
    className = "",
    errorMessage,
    children,
    name,
    registerOptions,
    placeholder,
    defaultValue
}: TextareaProps) => {

    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const focusInput = () => textareaRef.current?.focus()

    useEffect(() => {
        errorMessage && focusInput()
    }, [errorMessage])

    const {register} = useFormContext()
    const registeredProps = register(name, registerOptions)
    const {ref} = registeredProps

    return <div 
        className={cn(
            "textarea__wrapper",
            className
        )}
    >
        {
            errorMessage || children
                ? <div className="textarea__labels">
                    {
                        children 
                            && <label className="textarea__label">
                                {children}
                            </label>
                    }
                    {
                        errorMessage 
                            && <label className="textarea__label textarea__label--error">
                                {errorMessage}
                            </label>
                    }
                </div>
                : null
        }
        <textarea
            {...registeredProps}
            ref={(e) => {
                ref(e)
                textareaRef.current = e
            }}
            className="textarea__itself"
            placeholder={placeholder}
            defaultValue={defaultValue}
        />
    </div>
   
}

export default Textarea
