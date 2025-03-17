import { ChangeEvent, InputHTMLAttributes } from "react";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    labelName: string
    inputType?: "text" | "email" | "password" | "number" | "date" | "url"
    isTextArea?: boolean
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function FormField({
    labelName,
    placeholder,
    inputType,
    isTextArea,
    value,
    handleChange
}: FormFieldProps) {
    return (
        <label className="w-full space-y-2">
            <span className="text-sm font-medium text-gray-700">
                {labelName}
            </span>
            {isTextArea ? (
                <textarea
                    required
                    value={value}
                    onChange={handleChange}
                    rows={6}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
            ) : (
                <input
                    required
                    value={value}
                    onChange={handleChange}
                    type={inputType}
                    step="0.1"
                    placeholder={placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
            )}
        </label>
    )
}