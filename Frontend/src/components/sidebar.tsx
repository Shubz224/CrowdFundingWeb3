import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SidebarIcon as Icon } from "./sidebarIcon"
import { logo} from "../assets"
import { navlinks } from "../constants"
import { StateContext } from "../contexts"

export function Sidebar() {
    const navigate = useNavigate()
    const [isActive, setIsActive] = useState('dashboard')
    const { disconnect } = useContext(StateContext)

    return (
        <aside className="fixed left-6 top-6 bottom-6 w-24 bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center transition-all duration-300">
            <Link to="/" className="mb-10">
                <Icon styles="w-14 h-14 transition-transform duration-200 hover:scale-105" imgUrl={logo} />
            </Link>

            <div className="flex-1 flex flex-col space-y-6">
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
