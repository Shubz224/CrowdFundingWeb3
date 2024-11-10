
type CountBoxProps = {
    title: string;
    value: string | number;
}

export function CountBox({
    title,
    value
}: CountBoxProps) {
    return (
        <div className="flex flex-col items-center w-[150px]">
            <h4 className="font-epilogue font-bold text-[30px] text-black p-3 bg-[#ECF1FF]
             rounded-t-[10px] w-full text-center truncate"
            >
                {value}
            </h4>
            <p className="font-epilogue font-normal text-[16px] text-[#808091]
             bg-[#ECF1FF] px-3 py-2 w-full rounded-b-[10px] text-center"
            >
                {title}
            </p>
        </div>
    )
}