import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { menu, search, thirdweb } from "../assets"
import { CustomButton } from "./customButton"
import { navlinks } from "../constants"
import { StateContext } from "../contexts"
import { metamaskWallet } from "@thirdweb-dev/react"

export function Navbar() {
    const navigate = useNavigate()
    const [isActive, setIsActive] = useState("dashboard")
    const [toggleDrawer, setToggleDrawer] = useState(false)
    const { address, connect, searchCampaign, setSearchCampaign } = useContext(StateContext)

    return (
        <nav className="w-full bg-white shadow-sm py-4 px-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Search Bar */}
                <div className="flex-1 max-w-md mr-4">
                    <div className="relative">
                        <input 
                            type="text"
                            placeholder="Search campaigns..."
                            className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            value={searchCampaign}
                            onChange={(e) => setSearchCampaign(e.target.value)}
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-50 transition-colors">
                            <img src={search} alt="search" className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-4">
                    <CustomButton
                        btnType="button"
                        title={address ? 'Create Campaign' : 'Connect Wallet'}
                        handleClick={() => {
                            if (address) navigate('create-campaign')
                            else connect(metamaskWallet())
                        }}
                    />
                    <Link to="/profile">
                        <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <img src={thirdweb} alt="profile" className="w-6 h-6" />
                        </div>
                    </Link>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center">
                    <button 
                        onClick={() => setToggleDrawer(!toggleDrawer)}
                        className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <img src={menu} alt="menu" className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {toggleDrawer && (
                <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setToggleDrawer(false)}>
                    <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg p-4">
                        <div className="flex flex-col space-y-4">
                            {navlinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => {
                                        setIsActive(link.name)
                                        setToggleDrawer(false)
                                        navigate(link.link)
                                    }}
                                    className={`flex items-center space-x-3 p-2 rounded-lg ${
                                        isActive === link.name ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <img src={link.imgUrl} alt={link.name} className="w-5 h-5" />
                                    <span>{link.name}</span>
                                </button>
                            ))}
                        </div>
                        <div className="mt-6">
                            <CustomButton
                                btnType="button"
                                title={address ? 'Create Campaign' : 'Connect Wallet'}
                                handleClick={() => {
                                    if (address) navigate('create-campaign')
                                    else connect(metamaskWallet())
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}