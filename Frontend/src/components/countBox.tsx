type CountBoxProps = {
    title: string;
    value: string | number;
}

export function CountBox({ title, value }: CountBoxProps) {
    return (
        <div className="flex flex-col items-center w-full max-w-[180px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="w-full py-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h4 className="text-3xl font-bold text-gray-900 text-center truncate px-2">
                    {value}
                </h4>
            </div>
            <div className="w-full py-3 bg-white">
                <p className="text-sm font-medium text-gray-600 text-center">
                    {title}
                </p>
            </div>
        </div>
    )
}