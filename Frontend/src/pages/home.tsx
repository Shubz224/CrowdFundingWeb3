import { useContext, useEffect, useState } from "react"
import { StateContext } from "../contexts"
import { DisplayCampaigns } from "../components/displayCampaigns"

type ParsedCampaign = {
    owner: string
    title: string
    description: string
    target: string
    deadline: number
    amountCollected: string
    image: string
    status: string
    pId: string
    rejectionReason?: string
}

export function Home() {
    const [isLoading, setIsLoading] = useState(false)
    const [campaigns, setCampaigns] = useState([] as ParsedCampaign[])

    const { address, contract, getApprovedCampaigns, searchCampaign } = useContext(StateContext)

    async function fetchCampaigns() {
        setIsLoading(true)
        try {
            // Only get approved campaigns for the home page
            const data = await getApprovedCampaigns()
            console.log("Approved campaigns:", data)
            
            // Get current timestamp in seconds
            const currentTimestamp = Math.floor(Date.now() / 1000)
            
            // Filter campaigns by search term and exclude expired campaigns
            const filteredData = data.filter((campaign: ParsedCampaign) => {
                const matchesSearch = campaign.title.toLowerCase().includes(searchCampaign.toLowerCase())
                const isNotExpired = campaign.deadline > currentTimestamp
                
                return matchesSearch && isNotExpired
            })
            
            setCampaigns(filteredData)
        } catch (error) {
            console.error("Error fetching campaigns:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (contract) {
            fetchCampaigns()
        }
    }, [address, contract, searchCampaign])

    return (
        <DisplayCampaigns
            title="All Campaigns"
            isLoading={isLoading}
            campaigns={campaigns}
        />
    )
}