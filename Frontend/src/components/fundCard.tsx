import { thirdweb } from "../assets"
import { daysLeft } from "../utils"

type ParsedCampaign = {
    owner: string
    title: string
    description: string
    target: string
    deadline: number
    amountCollected: string
    image: string
    pId: string
}

type FundCardProps = ParsedCampaign & {
    handleClick: () => void
}

export function FundCard({
    owner,
    title,
    description,
    target,
    deadline,
    amountCollected,
    image,
    handleClick,
}: FundCardProps) {
    const remainingDays = daysLeft(deadline)
    const progressPercentage = ((Number(amountCollected) / Number(target)) * 100).toFixed(1)

    return (
        <div 
            className="w-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
            onClick={handleClick}
        >
            <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img 
                    src={image} 
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute bottom-2 right-2 backdrop-blur-sm bg-white/80 px-3 py-1 rounded-lg text-xs font-medium text-gray-700">
                    {remainingDays} days left
                </div>
            </div>

            <div className="p-5 space-y-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="space-y-3">
                    <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                            <span className="text-xs font-semibold text-emerald-600">
                                {progressPercentage}%
                            </span>
                            <span className="text-xs font-semibold text-gray-500">
                                Goal: {target} ETH
                            </span>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-100">
                            <div 
                                style={{ width: `${progressPercentage}%` }}
                                className="bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full transition-all duration-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xl font-bold text-gray-900">
                                {amountCollected} ETH
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Raised</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white shadow-sm overflow-hidden">
                                <img 
                                    src={thirdweb} 
                                    alt="owner" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-medium text-gray-600">
                                    By {owner.slice(0, 6)}...{owner.slice(-4)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}