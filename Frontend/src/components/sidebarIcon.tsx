
type SidebarIconProps = {
    styles?: string
    name?: string
    imgUrl: string
    isActive?: string
    disabled?: boolean
    handleClick?: () => void
}

export function SidebarIcon({
    styles = "",
    name,
    imgUrl,
    isActive,
    disabled = false,
    handleClick = () => {},
}: SidebarIconProps) {
    return (
        <div className={`w-[48px] h-[48px] rounded-[10px]
            ${isActive && isActive === name && 'bg-[white]'}
            flex justify-center items-center 
            ${!disabled && 'cursor-pointer'}
            ${styles}
         `}
         onClick={handleClick}
        >
          {!isActive ? (
            <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
          ): (
            <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
          )}
        </div>
    )
}