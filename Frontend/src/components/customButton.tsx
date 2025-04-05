import { ReactNode } from "react"

type CustomButtonProps = {
    btnType: "button" | "submit" | "reset"
    title: string | ReactNode
    styles?: string
    handleClick?: () => void
    disabled?: boolean  // Added the disabled prop
}

export function CustomButton({ btnType, title, styles, handleClick, disabled }: CustomButtonProps) {
    return (
        <button
            type={btnType}
            className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white transition-all duration-200
                bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700
                focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
                ${styles}`}
            onClick={handleClick}
            disabled={disabled}
        >
            {title}
        </button>
    )
}