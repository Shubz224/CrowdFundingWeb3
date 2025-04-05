import { useNavigate } from "react-router-dom"
import { calculateBarPercentage, daysLeft } from "../utils"


type ParsedCampaign = {
    owner: string
    title: string
    description: string
    target: string
    deadline: number
    amountCollected: string
    image: string
    pId: string
    status: string
    rejectionReason?: string
    donators?:string
}

type DisplayCampaignsProps = {
    title: string
    isLoading: boolean
    campaigns: ParsedCampaign[]
}

export function DisplayCampaigns({
    title,
    isLoading,
    campaigns,
}: DisplayCampaignsProps) {
    const navigate = useNavigate()

    function handleNavigate(campaign: ParsedCampaign) {
        navigate(`/campaign-details/${campaign.title}`, { state: campaign })
    }

    const CampaignCard = ({ campaign }: { campaign: ParsedCampaign }) => {
        const getStatusBadge = () => {
            switch(campaign.status) {
                case "0": 
                    return <span className="border border-amber-300 text-amber-600 px-3 py-1 rounded-full text-xs font-medium">Pending</span>;
                case "1": 
                    return <span className="border border-emerald-300 text-emerald-600 px-3 py-1 rounded-full text-xs font-medium">Active</span>;
                case "2": 
                    return (
                        <div className="flex flex-col gap-1">
                            <span className="border border-rose-300 text-rose-600 px-3 py-1 rounded-full text-xs font-medium">Rejected</span>
                            {campaign.rejectionReason && (
                                <span className="text-rose-500 text-xs mt-1">Reason: {campaign.rejectionReason}</span>
                            )}
                        </div>
                    );
                default: 
                    return null;
            }
        };

        return (
            <div 
                className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-out cursor-pointer overflow-hidden group"
                onClick={() => handleNavigate(campaign)}
            >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img 
                        src={campaign.image} 
                        alt={campaign.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute bottom-2 right-2 backdrop-blur-sm bg-white/80 px-3 py-1 rounded-lg text-xs font-medium text-gray-700">
                        {daysLeft(campaign.deadline)} days left
                    </div>
                </div>

                <div className="p-5 space-y-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white shadow-sm overflow-hidden">
                                <img 
                                    src={campaign.image} 
                                    alt="campaign" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-sm font-medium text-gray-500">{campaign.owner.slice(0, 6)}...{campaign.owner.slice(-4)}</span>
                        </div>
                        {getStatusBadge()}
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{campaign.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                            {campaign.description}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold text-emerald-600">
                                        {((Number(campaign.amountCollected) / Number(campaign.target)) * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-gray-500">
                                        Goal: {campaign.target} ETH
                                    </span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-100">
                                <div 
                                    style={{ width: `${calculateBarPercentage(Number(campaign.target), Number(campaign.amountCollected))}%` }}
                                    className="bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full transition-all duration-500"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {campaign.amountCollected} ETH
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Raised</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-gray-900">
                                    {campaign.donators?.length || 0}
                                </p>
                                <p className="text-xs text-gray-500">Supporters</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8 flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">
                    {title}
                    <span className="text-gray-400 ml-2">({campaigns.length})</span>
                </h2>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns.length === 0 ? (
                        <div className="col-span-full text-center py-16">
                            <div className="text-gray-400 text-lg font-medium">
                                No campaigns found. Start by creating one!
                            </div>
                        </div>
                    ) : (
                        campaigns.map((campaign) => (
                            <CampaignCard 
                                key={campaign.pId}
                                campaign={campaign}
                            />
                        ))
                    )}
                </div>
            )}
        </section>
    )
}