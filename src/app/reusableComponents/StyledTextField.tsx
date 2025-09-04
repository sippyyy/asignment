import React from 'react'

interface StyledTextFieldProps {
    type?: string
    id: string
    placeholder: string
    className?: string
    label?: string
    leftIcon?: React.ReactNode
    name?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const defaultClassName = "w-full p-md border-gray-300 rounded-md text-md"

const StyledTextField = React.forwardRef<HTMLInputElement, StyledTextFieldProps>(({
    label,
    type,
    id,
    placeholder,
    className = defaultClassName,
    leftIcon,
    name,
    onChange,
    onBlur
}, ref) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-main-venice mb-2">
                {label}
            </label>
            <div className={`${className} flex items-center border focus:ring-2 focus:ring-main-shine focus:border-main-shine outline-none transition-colors`}>
                <input
                    ref={ref}
                    type={type}
                    id={id}
                    name={name}
                    className="flex-1 border-none outline-none"
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                {leftIcon && (
                    <div className="flex items-center justify-center p-md">
                        {leftIcon}
                    </div>
                )}
            </div>
        </div>

    )
})

StyledTextField.displayName = 'StyledTextField'

export default StyledTextField