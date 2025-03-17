import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SidebarIcon as Icon } from "./sidebarIcon"
import { logo, sun } from "../assets"
import { navlinks } from "../constants"
import { StateContext } from "../contexts"

export function Sidebar() {
    const navigate = useNavigate()
    const [isActive, setIsActive] = useState('dashboard')
    const { disconnect } = useContext(StateContext)

    return (
        <aside className="fixed left-6 top-6 bottom-6 w-20 bg-white rounded-xl shadow-lg p-4 flex flex-col items-center">
            <Link to="/" className="mb-8">
                <Icon styles="w-12 h-12" imgUrl={logo} />
            </Link>

            <div className="flex-1 flex flex-col space-y-4">
                {navlinks.map((link) => (
                    <Icon
                        key={link.name}
                        {...link}
                        isActive={isActive}
                        handleClick={() => {
                            if (link.name === 'logout') {
                                disconnect()
                            } else if (!link.disabled) {
                                setIsActive(link.name)
                                navigate(link.link)
                            }
                        }}
                    />
                ))}
            </div>
        </aside>
    )
}